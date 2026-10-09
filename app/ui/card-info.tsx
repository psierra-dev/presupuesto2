import React from "react";

const CardInfo = ({
  icon,
  title,
  info,
}: {
  icon: any;
  title: string;
  info: string | null;
}) => {
  return (
    <div className="flex gap-2 w-full items-center">
      <span className=" text-red-500">{icon}</span>
      <div className=" flex flex-col">
        <p className=" text-sm md:text-md font-medium md:font-semibold ">
          {title}
        </p>
        <span className="text-xs md:text-sm font-thin text-neutral-600">
          {info ? info : "--"}
        </span>
      </div>
    </div>
  );
};

export default CardInfo;
