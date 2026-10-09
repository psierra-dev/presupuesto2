import React from "react";

import { FiEdit } from "react-icons/fi";

import ButtonModal from "./btn-modal";
import FormUpdateJob from "./form-updte-budgetjob";
import { DeleteJob } from "../button";

const CardJob = ({
  job,
  id_obra,
  isEdit,
}: {
  job: any;
  id_obra: string;
  isEdit: boolean;
}) => {
  const total = job.price_labour * job?.meter;

  return (
    <div className=" rounded-md p-2 flex shadow-md">
      <div className="flex flex-col flex-1">
        <h3 className=" font-semibold text-sm">{job?.name}</h3>
        <div className="flex font-medium text-sm gap-2">
          <p className="">Precio: ${job.price_labour}</p>
          <p>Metro: {job?.meter}m2</p>
        </div>
        <h3 className="text-red-500 font-semibold text-base">${total}</h3>
      </div>

      {isEdit && (
        <div className="flex flex-col justify-center items-center gap-2 text-lg">
          <ButtonModal
            style="border-none active:text-red-400 p-1 w-fit h-fit text-lg"
            content={<FiEdit />}
          >
            <FormUpdateJob budget_job={job} id_obra={id_obra} />
          </ButtonModal>

          <DeleteJob id_job={job.id} id_obra={id_obra} />
        </div>
      )}
    </div>
  );
};

export default CardJob;
