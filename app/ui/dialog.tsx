"use client";
import React, { useState } from "react";
import Modal from "./modal";
import { redirect, useRouter } from "next/navigation";

const Dialog = () => {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const handleModal = () => setModal(!modal);

  const handleAccept = () => {};
  return (
    <>
      <button type="button" onClick={handleModal}>
        Delete
      </button>
      {modal && (
        <Modal type="client" onClose={handleModal}>
          <div className=" p-2  rounded-md bg-white">
            <h4 className="text-lg text-start font-semibold">
              Estas seguro que quieres eliminar este Item?{" "}
            </h4>
            <p className=" text-sm text-start text-neutral-600 font-thin">
              El item se eliminara de tu lista
            </p>
            <div className=" gap-2 mt-2 w-full flex justify-end">
              <button
                className="text-md font-semibold text-blue-400"
                type="button"
                formAction={handleAccept}
              >
                Si
              </button>
              <button
                className="text-md font-semibold text-blue-400"
                type="button"
                onClick={handleModal}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Dialog;
