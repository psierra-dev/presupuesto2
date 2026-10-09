"use client";
import React, { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { WrapperInput } from "../input";
import { upadteCharged } from "@/app/libs/actions";
import { Submit } from "../button";

const FormUpdatePaid = ({
  id_obra,
  id_budget,
  initial_charged,
}: {
  id_obra: number | string;
  id_budget: number;
  initial_charged: number;
}) => {
  const [chargedNow, setChargedNow] = useState<number>(0);
  const refForm = useRef<HTMLFormElement | null>(null);

  const [state, formAction] = useFormState(
    (prevState: any, formData: FormData) =>
      upadteCharged(prevState, formData, id_budget, id_obra),
    {
      message: "",
    }
  );

  useEffect(() => {
    if (state.message) {
      refForm.current?.reset();
      setChargedNow(0);
    }
  }, [state]);

  return (
    <div className="bg-white rounded-md p-3 w-full m-2 max-w-[400px]">
      <h3 className=" font-semibold">Actualizar Cobro</h3>
      <form
        ref={refForm}
        action={formAction}
        className="flex flex-col gap-3 w-full"
      >
        <WrapperInput
          label="Cobrado"
          name="initial"
          type="number"
          defaultValue={initial_charged}
          value={initial_charged}
          readonly
        />
        <WrapperInput
          label="Cobrado Ahora"
          name="charged_now"
          type="number"
          defaultValue={0}
          value={chargedNow}
          onChange={(e) => setChargedNow(Number(e.target.value))}
        />
        <WrapperInput
          label="Cobrado Ahora"
          name="charged"
          type="hidden"
          value={initial_charged + chargedNow}
        />
        <div className=" flex w-full justify-between">
          <p>Total:</p>
          <span>${initial_charged + Number(chargedNow)}</span>
        </div>
        <Submit isDisabled={Number(chargedNow) <= 0} text="Actualizar" />

        {state?.message && (
          <p className=" text-sm text-green-800">{state?.message}</p>
        )}
      </form>
    </div>
  );
};

export default FormUpdatePaid;
