import React from "react";
import { Obra } from "@/app/libs/definitions";
import Image from "next/image";
import { MdOutlineLocationOn } from "react-icons/md";

const CardObra = ({ name, direction, image, status }: Obra) => {
  return (
    <div className=" rounded-lg relative shadow-lg p-3 ">
      <div className="flex items-center gap-2">
        <Image
          className="w-[100px] h-auto"
          src="/construccion.png"
          alt={name}
          width={300}
          height={200}
        />

        <div className="flex flex-col">
          <h4 className=" text-md">{name}</h4>
          <p className=" text-xs flex items-center text-neutral-600">
            <MdOutlineLocationOn />
            {direction}
          </p>
        </div>
      </div>
      <div className="w-[50%] mt-2 bg-green-600 relative h-[3px] rounded-lg">
        <p className=" text-[10px] text-neutral-600 absolute right-0 bottom-0">
          100%
        </p>
      </div>
    </div>
  );
};

export default CardObra;
