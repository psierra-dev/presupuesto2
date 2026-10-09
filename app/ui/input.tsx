"use client";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface InputProp {
  name?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  readonly?: boolean;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  style_input?: string;
  style_label?: string;
}

export const CustomInput = (props: any) => {
  const [show, setShow] = useState(false);
  const { style, type, ...rest } = props;

  return (
    <div className="w-full flex relative ">
      <input
        {...rest}
        type={show ? "text" : type}
        className={
          "w-full border-[1px] outline-none rounded-lg text-sm mt-2 font-light py-2 px-2 " +
          style
        }
      />

      {type === "password" ? (
        <button
          className=" absolute right-2 top-5 text-sm"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setShow(!show);
          }}
        >
          {show ? <FaRegEye /> : <FaRegEyeSlash />}
        </button>
      ) : null}
    </div>
  );
};
export const WrapperInput = (props: InputProp) => {
  const { label, style_input, style_label, ...rest } = props;
  //const more_data = value ? { value: value } : {};
  return (
    <div className="flex flex-col items-start">
      {props.type !== "hidden" && (
        <label
          htmlFor={props.name}
          className={"text-xs font-light text-start" + style_label}
        >
          {label}
        </label>
      )}
      <CustomInput {...rest} style={style_input} />
    </div>
  );
};
