import React from "react";
import { Status } from "@/app/libs/definitions";
import { MdCancel, MdIncompleteCircle, MdPending } from "react-icons/md";
import clsx from "clsx";

const MapStatus = {
  completed: {
    icon: MdIncompleteCircle,
    text: "Completada",
  },
  started: {
    icon: MdPending,
    text: "Comenzada",
  },
  uninitiated: {
    icon: MdCancel,
    text: "No comenzada",
  },
};

const Statu = ({ statu }: { statu: Status }) => {
  const statusChose = MapStatus[statu];

  return (
    <div
      className={clsx(
        "py-1 flex  px-1 font-medium text-[10px]  w-fit items-center rounded-lg",
        statu === "completed" &&
          "text-green-500 bg-green-100 border-[1px] border-green-500",
        statu === "uninitiated" &&
          "text-red-500 bg-red-100 border-[1px] border-red-500",
        statu === "started" &&
          "text-yellow-500 bg-yellow-100 border-[1px] border-yellow-500"
      )}
    >
      {statusChose && <statusChose.icon />}
      {statusChose?.text}
    </div>
  );
};

export default Statu;
