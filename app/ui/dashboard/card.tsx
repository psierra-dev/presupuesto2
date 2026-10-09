import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";
import { GiProgression } from "react-icons/gi";
import {
  MdIncompleteCircle,
  MdMonetizationOn,
  MdPending,
} from "react-icons/md";

const iconList = {
  completed: MdIncompleteCircle,
  pending: MdPending,
  total: MdMonetizationOn,
  progress: GiProgression,
};

export default async function CardWrapper({ user_id }: { user_id: string }) {
  const supabase = createClient(cookies());

  const { data: obras } = await (supabase
    .from("obras") as any)
    .select()
    .eq("id_user", user_id);

  const total = obras?.length;
  const started = obras?.filter((o: any) => o.state === "started").length;
  const completed = obras?.filter((o: any) => o.state === "completed").length;
  const progress =
    started === 0 || completed === 0
      ? 0
      : ((100 * completed!) / started!).toFixed(2);
  return (
    <div className="grid gap-2 lg:py-4 md:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
      <Card
        title="Completado"
        value={completed ? completed : 0}
        type="completed"
      />
      <Card title="En proceso" value={started ? started : 0} type="pending" />
      <Card title="Total de Obra" value={total ? total : 0} type="total" />
      <Card title="Progreso" value={`%${progress}`} type="progress" />
    </div>
  );
}

export const Card = ({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "completed" | "pending" | "total" | "progress";
}) => {
  const Icon = iconList[type];
  return (
    <div className="rounded-xl bg-white shadow-sm p-2 ">
      <div className="flex p-2 md:p-4 items-center">
        {Icon ? <Icon className="h-5 w-5 text-red-600" /> : null}
        <h3 className="ml-2 text-xs font-medium">{title}</h3>
      </div>
      <p
        className={`
          truncate  px-2 py-2 md:py-4 text-center text-lg md:text-2xl`}
      >
        {value}
      </p>
    </div>
  );
};
