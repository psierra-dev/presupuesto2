"use client";
import React, {useState} from "react";
import {WrapperInput} from "../input";
import {useFormState} from "react-dom";
import {upadteJob} from "@/app/libs/actions";
import {Submit} from "../button";

type Jobs = {
  created_at: string;
  id: number;
  id_budget: number | null;
  measurement: string | null;
  price_labour: number | null;
  name: string | null;
  meter: number | null;
};

const FormUpdateJob = ({
  budget_job,
  id_obra,
}: {
  budget_job: Jobs;
  id_obra: number | string;
}) => {
  const [meter, setMeter] = useState<number | string | null>(budget_job.meter);
  const [state, formAction] = useFormState(
    (prevState: any, formData: FormData) =>
      upadteJob(prevState, formData, budget_job.id, id_obra),
    {
      message: "",
    }
  );

  return (
    <div className="bg-white rounded-md p-4 w-full m-2 max-w-[400px]">
      <span className="text-lg font-semibold">Actualizar</span>
      <form action={formAction} className="flex flex-col gap-3 w-full">
        <WrapperInput
          label="Nombre"
          name="name"
          type="text"
          defaultValue={budget_job?.name!}
          readonly
        />
        <WrapperInput
          label="Precio"
          name="price"
          type="text"
          defaultValue={budget_job?.price_labour!}
          readonly
        />

        <WrapperInput
          type="number"
          name="meter"
          label={budget_job.measurement!}
          defaultValue={budget_job?.meter!}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMeter(e.target.value)
          }
        />
        <Submit isDisabled={meter == budget_job.meter} text="Actualizar" />

        {state?.message && (
          <p className=" text-sm text-green-800">{state?.message}</p>
        )}
      </form>
    </div>
  );
};

export default FormUpdateJob;
