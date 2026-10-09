"use client";

import {useRouter} from "next/navigation";
import React from "react";
import {useFormStatus} from "react-dom";
import {FiLoader} from "react-icons/fi";
import {MdArrowBack, MdDelete} from "react-icons/md";
import {deleteJob} from "../libs/actions";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  className?: string;
  type?: "submit" | "button";
  disabled?: boolean;
}

const StyleButtonVariant = {
  primary:
    "bg-red-500 border border-red-500  text-white hover:bg-white hover:text-red-500  disabled:bg-red-400",
  secondary: "bg-neutral-950 border border-neutral-950 text-white",
  tertiary: "bg-white border border-white text-neutral-950 shadow-md",
  outline: "bg-white border border-red-500 text-red-600",
};

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: Props) => {
  const classes = StyleButtonVariant[variant];

  return (
    <button
      {...props}
      className={`text-sm font-medium h-[40px] ${classes} ${className}  px-3 grid place-content-center md:px-3 lg:font-semibold rounded-md disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};

export const ButtonBack = () => {
  const router = useRouter();

  return (
    <button
      className=" text-lg w-fit h-fit p-1"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        router.back();
      }}
    >
      <MdArrowBack />
    </button>
  );
};

export const ButtonCreate = () => {
  return (
    <Link
      className=" px-2 py-1 bg-red-500 rounded-md text-white text-sm font-semibold"
      href={`/dashboard/obras/create`}
    >
      Crear
    </Link>
  );
};

export const Submit = ({
  text,
  isDisabled,
}: {
  text: string;
  isDisabled?: boolean;
}) => {
  const {pending} = useFormStatus();

  return (
    <Button disabled={pending || isDisabled} type="submit">
      {pending ? (
        <span className="text-center text-sm font-semibold animate-spin">
          <FiLoader />
        </span>
      ) : (
        text
      )}
    </Button>
  );
};

export const DeleteJob = ({
  id_job,
  id_obra,
}: {
  id_job: number;
  id_obra: string;
}) => {
  const actionDelete = deleteJob.bind(null, id_job, id_obra);
  return (
    <form action={actionDelete} className="flex">
      <button
        className="text-lg text-red-500 rounded-full hover:bg-neutral-300"
        type="submit"
      >
        <MdDelete />
      </button>
    </form>
  );
};
