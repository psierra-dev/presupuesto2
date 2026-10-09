import React from "react";
import ButtonModal from "./btn-modal";
import {BiEdit} from "react-icons/bi";
import FormUpdateJob from "./form-updte-budgetjob";
import {DeleteJob} from "../button";

const TableJob = ({
  budget_job,
  id_obra,
  is_edit,
}: {
  budget_job: any;
  id_obra: string;
  is_edit: boolean;
}) => {
  return (
    <table className="w-full hidden sm:table">
      <thead>
        <tr className="text-xs md:text-sm font-thin ">
          <th className="w-[50%] p-2 text-start">Nombre</th>
          <th className="w-[20%] p-2 text-start">Metro*Precio</th>
          <th className="w-[20%] p-2 text-end">Total</th>
          {is_edit && <th className=" w-[10] p-2 text-end">Edit</th>}
        </tr>
      </thead>

      <tbody>
        {budget_job?.map((l: any) => (
          <tr key={l.id} className="  rounded-md shadow-md text-sm font-thin">
            <td className="p-2 text-start">{l.name}</td>
            <td className="p-2 text-start">
              {l.meter}
              {l.measurement} * ${l.price_labour}
            </td>
            <td className="p-2 text-end">${l?.meter! * l?.price_labour!}</td>
            {is_edit && (
              <td className="p-2 flex justify-end">
                <ButtonModal
                  style="border-none p-1 w-fit h-fit text-lg rounded-full hover:bg-neutral-300"
                  content={<BiEdit />}
                >
                  <FormUpdateJob budget_job={l} id_obra={id_obra} />
                </ButtonModal>

                <DeleteJob id_job={l.id} id_obra={id_obra} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableJob;
