"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef } from "react";

const Modal = ({
  children,
  type,
  onClose,
}: {
  children: React.ReactNode;
  type: "server" | "client";
  onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (type === "client" && onClose) {
        onClose(e);
        return;
      }
      router.back();
    },
    [router, onClose, type]
  );

  useEffect(() => {
    overlay.current || wrapper.current
      ? document.body.classList.add("modal-active")
      : document.body.classList.remove("modal-active");

    return () => document.body.classList.remove("modal-active");
  }, [overlay.current || wrapper.current]);

  return (
    <div
      className="absolute z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      ref={overlay}
    >
      <div className="fixed  inset-0 bg-zinc-900/75 bg-opacity-75 transition-opacity"></div>

      <div
        ref={wrapper}
        className="fixed inset-0 z-50 w-screen overflow-y-auto"
      >
        <button
          onClick={onDismiss}
          className=" absolute z-50 top-5 right-5 font-semibold text-white"
        >
          X
        </button>
        <div className="flex relative min-h-full justify-center  text-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
