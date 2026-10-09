"use client";
import Modal from "@/app/ui/modal";
import FormCreate from "@/app/ui/obras/form-create";
import React from "react";

const PageModal = () => {
  return (
    <Modal type="server">
      <div className=" bg-white rounded-md p-3 w-full m-2 max-w-[400px]">
        <h3 className=" mb-1 font-semibold">Crear Obra</h3>
        <FormCreate />
      </div>
    </Modal>
  );
};

export default PageModal;
