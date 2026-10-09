"use client";
import React, { useState } from "react";
import Modal from "../modal";

const ButtonModal = ({
  children,
  style,
  content,
}: {
  children: React.ReactNode;
  style?: string;
  content: any;
}) => {
  const [modal, setModal] = useState(false);

  const handleModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setModal(!modal);
  };
  return (
    <>
      <button onClick={handleModal} className={style}>
        {content}
      </button>

      {modal && (
        <Modal type="client" onClose={handleModal}>
          {children}
        </Modal>
      )}
    </>
  );
};

export default ButtonModal;
