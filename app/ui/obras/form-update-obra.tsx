"use client";
import React, { useState } from "react";
import { WrapperInput } from "../input";
import { useFormState } from "react-dom";
import { createOrUpdateObra } from "@/app/libs/actions";
import { Submit } from "../button";

const status = [
  { key: "completed", value: "Completada" },
  { key: "started", value: "Comenzada" },
  { key: "uninitiated", value: "No comenzada" },
];

const FormUpdateObra = ({ obra }: { obra: any }) => {
  const [newData, setNewData] = useState(obra);

  const initialState = { message: "", errors: { name: [] } };
  const [state, formAction] = useFormState(
    (prev: any, form: FormData) =>
      createOrUpdateObra(prev, form, "update", obra?.id),
    initialState
  );

  const isEqual =
    newData.name === obra.name &&
    newData.direction === obra.direction &&
    newData.state === obra.state;

  return (
    <div className="bg-white rounded-md p-3 w-full m-2 max-w-[400px]">
      <h3 className=" font-semibold">Actualizar Obra</h3>
      <form action={formAction} className="flex flex-col gap-3 w-full">
        <div className="mb-4 relative">
          <WrapperInput
            type="text"
            name="name"
            placeholder="Nombre de la Obra"
            label="Nombre"
            defaultValue={obra?.name}
            onChange={(e) => setNewData({ ...newData, name: e.target.value })}
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
        <div className="mb-4 relative">
          <WrapperInput
            type="text"
            name="direction"
            placeholder="Direccion"
            label="Direccion"
            defaultValue={obra.direction}
            onChange={(e) =>
              setNewData({ ...newData, direction: e.target.value })
            }
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

        <WrapperInput type="date" name="start_date" label="Fecha de inicio" />
        <WrapperInput type="date" name="end_date" label="Fecha de fin" />

        <div className="flex flex-col items-start">
          <label
            htmlFor="status"
            className="text-xs font-semibold text-start text-neutral-800"
          >
            Estado
          </label>
          <select
            name="state"
            defaultValue={obra?.state}
            id=""
            onChange={(e) => setNewData({ ...newData, state: e.target.value })}
            className=" w-full bg-transparent border-[1px] outline-none focus:border-gray-400 rounded-lg text-sm mt-2 font-light py-2 px-2 "
          >
            {status.map((s) => (
              <option key={s.key} value={s.key}>
                {s.value}
              </option>
            ))}
          </select>
        </div>
        {state?.message && (
          <p className=" text-xs text-neutral-500 font-thin">{state.message}</p>
        )}

        <Submit isDisabled={isEqual} text="Actualizar" />
      </form>
    </div>
  );
};

export default FormUpdateObra;
