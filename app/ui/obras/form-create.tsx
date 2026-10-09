"use client";
import React from "react";
import { WrapperInput } from "../input";
import { useFormState } from "react-dom";
import { createOrUpdateObra } from "@/app/libs/actions";
import { Submit } from "../button";

const FormCreate = () => {
  const initialState = { message: "", errors: { name: [] } };
  const [state, formAction] = useFormState(
    (prev: any, form: FormData) => createOrUpdateObra(prev, form, "create", ""),
    initialState
  );

  console.log(state, "error");

  return (
    <form action={formAction} className="flex flex-col gap-3 w-full">
      <div className="mb-4 relative">
        <WrapperInput
          type="text"
          name="name"
          placeholder="Nombre de la Obra"
          label="Nombre"
        />

        <div
          id="customer-error"
          className="absolute"
          aria-live="polite"
          aria-atomic="true"
        >
          {state?.errors?.name! &&
            state?.errors.name.map((error: string) => (
              <p className="mt-1 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <input type="hidden" value="uninitiated" name="state" />

      <div className="mb-4 relative">
        <WrapperInput
          type="text"
          name="direction"
          placeholder="Direccion"
          label="Direccion"
        />
        <div aria-live="polite" className=" absolute" aria-atomic="true">
          {state?.errors?.direction! &&
            state?.errors.direction.map((error: string) => (
              <p className="mt-1 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {/* <ImageLoad /> */}

      <WrapperInput type="date" name="start_date" label="Fecha de inicio" />
      <WrapperInput type="date" name="end_date" label="Fecha de fin" />
      {state?.message && (
        <p className=" text-xs text-neutral-500 font-thin">{state.message}</p>
      )}

      <div className="flex w-full justify-end">
        <Submit text="Crear" />
      </div>
    </form>
  );
};

export default FormCreate;
