"use client";
import { ObraService } from "@/app/services/obras";
import { createClient } from "@/app/utils/supabase/client";
import React from "react";

const BtnCreate = () => {
  const supabase = createClient();

  const obraService = new ObraService(supabase);
  return (
    <button
      onClick={async () => {
        await obraService.createBulkObras();
        console.log("creado");
      }}
    >
      BtnCreate
    </button>
  );
};

export default BtnCreate;
