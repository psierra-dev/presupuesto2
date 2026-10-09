import React from "react";
import { MdLocationOn, MdOutlineCalendarMonth } from "react-icons/md";
import Statu from "../statu";

const CardObra = ({ data }: { data: any }) => {
  const date = new Date(data.created_at);
  const date_string = date.toDateString();
  return (
    <div className="relative rounded-md p-2 flex shadow-lg">
      <div className=" mr-1 flex-1 flex flex-col">
        <h3 className="font-semibold text-neutral-950 mb-1 text-sm">
          {data.name}
        </h3>
        <div className=" flex text-xs  font-normal text-neutral-700">
          <MdLocationOn />

          <p className="ml-2">{data?.direction}</p>
        </div>
        <div className=" flex text-xs font-normal text-neutral-700">
          <MdOutlineCalendarMonth />

          <p className="ml-2">{date_string}</p>
        </div>
      </div>

      <div className="">
        <Statu statu={data?.state} />
      </div>
    </div>
  );
};

export default CardObra;
