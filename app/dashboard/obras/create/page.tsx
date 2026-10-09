import FormCreate from "@/app/ui/obras/form-create";
import React from "react";

const PageCreate = () => {
  return (
    <main className="bg-neutral-100 min-h-screen md:min-h-full md:rounded-xl p-2 md:p-3">
      <h3 className="text-lg mb-4 font-semibold">Crear Obra</h3>
      <FormCreate />
    </main>
  );
};

export default PageCreate;
