import React, {Suspense} from "react";
import {cookies} from "next/headers";
import Link from "next/link";

import {createClient} from "@/app/utils/supabase/server";

import HeroObra from "@/app/ui/obras/hero";
import BudgetList from "@/app/ui/obras/list-budget";
import PaymentStatistics from "@/app/ui/obras/payment-statistics";
import {redirect} from "next/navigation";

import PdfCointainer from "@/app/ui/mydocument";
import {Button} from "@/app/ui/button";
import {BudgetJobSkeleton} from "@/app/ui/skeletons";

const Page = async ({params}: {params: {id: string}}) => {
  const supabase = createClient(cookies());

  const {
    data: {user},
    error: errorAuth,
  } = await supabase.auth.getUser();

  if (errorAuth || !user) {
    redirect("/");
  }

  const {data: budget, error} = await (supabase
    .from("budget") as any)
    .select("*, budget_job(*)")
    .eq("id_obra", params.id)
    .gt("budget_job.meter", 0)
    .order("meter", {referencedTable: "budget_job", ascending: false})
    .single();

  if (error) {
    redirect("/dashboard/obras");
  }
  return (
    <main className="flex bg-neutral-100 h-full overflow-auto md:min-h-full md:rounded-xl p-1 md:p-3">
      <div className="flex gap-5 flex-col flex-1">
        <section className="w-full flex flex-col   md:min-h-[200px] gap-5 md:flex-row">
          <div className=" w-full md:w-1/2 min-h-[100px] ">
            <Suspense
              fallback={
                <section className="w-full h-full bg-gray-200 rounded-lg animate-pulse"></section>
              }
            >
              <HeroObra obra_id={params.id} />
            </Suspense>
          </div>
          <div className=" w-full md:w-1/2 min-h-[100px] ">
            <Suspense
              fallback={
                <section className="w-full h-full bg-gray-200 rounded-lg animate-pulse"></section>
              }
            >
              <PaymentStatistics id_obra={params.id} />
            </Suspense>
          </div>
        </section>

        <section className="w-full flex-1 flex flex-col">
          <div className=" flex  flex-1 flex-col min-h-[200px] rounded-xl p-2 md:p-4 bg-white">
            <header className=" flex w-full justify-between mb-2">
              <h3 className=" font-semibold">Presupuesto</h3>

              <div className="flex gap-2 items-center">
                <Link href={`/dashboard/obras/${params.id}/presupuesto`}>
                  <Button className="h-[35px]">Editar</Button>
                </Link>

                <PdfCointainer
                  data={{
                    total: budget?.total ?? 0,
                    budget_job: (budget?.budget_job || []).map((d: any) => {
                      return {
                        name: d.name ?? "",
                        total_labour: (d.meter ?? 0) * (d.price_labour ?? 0),
                      };
                    }),
                  }}
                />
              </div>
            </header>
            <Suspense fallback={<BudgetJobSkeleton />}>
              <BudgetList id_obra={params.id} />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
