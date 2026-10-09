"use client";
import React from "react";
import Link from "next/link";
import { WrapperInput } from "@/app/ui/input";
import { Submit } from "@/app/ui/button";
import { useFormState } from "react-dom";

const FormAuth = ({
  type,
  action,
}: {
  type: "login" | "register";
  action: any;
}) => {
  const initialState = { message: "", errors: "" };
  const [state, formAction] = useFormState(action, initialState);

  return (
    <div className="p-2 mx-3  md:p-4 bg-white shadow-lg  w-full max-w-[450px] rounded-md">
      <div className=" flex flex-col mb-10">
        <h1 className=" text-2xl text-neutral-950 font-semibold">
          {type === "login" ? "Bienvenido de nuevo" : "Comienza"}
        </h1>
        <p className="text-sm font-medium text-neutral-600">
          {type === "login"
            ? "Inicia sesion en tu cuenta"
            : "Crea una nueva cuenta"}
        </p>
      </div>
      <form action={formAction} className=" flex flex-col gap-5">
        <WrapperInput
          type="email"
          name="email"
          label="Email"
          required
          placeholder="tuemail@ejemplo.com"
          style_input="text-neutral-900 bg-neutral-white focus:border-gray-200"
          style_label=" text-neutral-800"
        />
        {type === "register" && (
          <WrapperInput
            type="text"
            name="fullname"
            label="Nombre completo"
            required
            placeholder="Angel Sierra"
            style_input="text-neutral-900 bg-neutral-white focus:border-gray-200"
            style_label=" text-neutral-800"
          />
        )}

        <WrapperInput
          type="password"
          name="password"
          label="Contraseña"
          required
          placeholder="••••••••"
          style_input="text-neutral-900 bg-neutral-white focus:border-gray-200"
          style_label=" text-neutral-800"
        />

        <Submit text={type === "login" ? "Iniciar sesion" : "Registrar"} />

        {type === "login" ? (
          <p className=" text-sm text-neutral-600 text-center">
            No tienes cuenta?{" "}
            <Link href="/register" className="text-neutral-400">
              Registrar
            </Link>
          </p>
        ) : (
          <p className=" text-sm text-neutral-600 text-center">
            Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-neutral-400">
              Iniciar sesion
            </Link>
          </p>
        )}
      </form>

      {state?.message && (
        <p className=" mt-2 text-sm text-center font-light text-neutral-500">
          {state?.message}
        </p>
      )}
    </div>
  );
};

export default FormAuth;
