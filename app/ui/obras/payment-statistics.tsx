import React from "react";
import {
  FaCircleDollarToSlot,
  FaDollarSign,
  FaFileInvoiceDollar,
} from "react-icons/fa6";
import {GiProgression} from "react-icons/gi";
import ButtonModal from "./btn-modal";
import {FiEdit} from "react-icons/fi";
import FormUpdatePaid from "./form-update-paid";
import {createClient} from "@/app/utils/supabase/server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const PaymentStatistics = async ({id_obra}: {id_obra: number | string}) => {
  const supabase = createClient(cookies());
  const {data: budget, error} = await (supabase
    .from("budget") as any)
    .select("*, budget_job(*)")
    .eq("id_obra", id_obra)
    .gt("budget_job.meter", 0)
    .order("meter", {referencedTable: "budget_job", ascending: false})
    .single();

  if (error || !budget) {
    redirect("");
  }
  const progress =
    budget?.total === 0 || budget?.charged === 0
      ? 0
      : ((100 * budget?.charged) / budget?.total).toFixed(2);
  const to_collect = budget?.total - budget?.charged;

  return (
    <div className="flex relative flex-wrap w-full h-full p-3 bg-white rounded-md">
      <Card title="Total" value={`$${budget?.total}`} Icon={FaDollarSign} />
      <Card
        title="Cobrado"
        value={`$${budget?.charged}`}
        Icon={FaFileInvoiceDollar}
      />
      <Card
        title="Por Cobrar"
        value={`$${to_collect}`}
        Icon={FaCircleDollarToSlot}
      />
      <Card title="Progreso" value={`%${progress}`} Icon={GiProgression} />

      <ButtonModal
        style="absolute right-0 border-none active:text-red-400 p-1 w-fit h-fit text-base md:text-lg rounded-full hover:bg-neutral-300"
        content={<FiEdit />}
      >
        <FormUpdatePaid
          id_obra={id_obra}
          id_budget={budget?.id}
          initial_charged={budget?.charged}
        />
      </ButtonModal>
    </div>
  );
};

const Card = ({
  value,
  title,
  Icon,
}: {
  value: string | number;
  title: string;
  Icon: any;
}) => {
  return (
    <div className="flex flex-col w-1/2 h-1/2">
      <div className="flex p-2 md:p-4 items-center">
        <Icon className="h5 w-5 text-red-600" />
        <h3 className="ml-2 text-xs font-medium">{title}</h3>
      </div>

      <h4 className="text-center text-lg md:text-2xl font-semibold shadow-sm p-2">
        {value}
      </h4>
    </div>
  );
};
export default PaymentStatistics;
