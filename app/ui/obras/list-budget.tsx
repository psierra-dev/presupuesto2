import React from "react";
import TableJob from "./table-job";
import CardJob from "./card-job";
import {cookies} from "next/headers";
import {createClient} from "@/app/utils/supabase/server";

const BudgetList = async ({
  id_obra,
  is_edit = false,
}: {
  id_obra: string;
  is_edit?: boolean;
}) => {
  const supabase = createClient(cookies());
  const {data: budget} = await (supabase
    .from("budget") as any)
    .select("*, budget_job(*)")
    .eq("id_obra", id_obra)
    .order("meter", {referencedTable: "budget_job", ascending: false})
    .single();

  return (
    <>
      <section className=" sm:hidden flex flex-col gap-2">
        {budget?.budget_job?.map((p: any) => (
          <CardJob key={p.id} job={p} id_obra={id_obra} isEdit={is_edit} />
        ))}
      </section>

      <TableJob
        budget_job={budget?.budget_job}
        id_obra={id_obra}
        is_edit={is_edit}
      />
    </>
  );
};

export default BudgetList;
