import React, {Suspense} from "react";
import {cookies} from "next/headers";

import {createClient} from "../utils/supabase/server";
import {redirect} from "next/navigation";

import Hero from "@/app/ui/dashboard/hero";
import CardWrapper from "../ui/dashboard/card";
import Tabla from "@/app/ui/list-obras";
import {ObrasTableSkeleton, StatisticsSKeleton} from "../ui/skeletons";

export const revalidate = 0;

const Page = async () => {
  const supabase = createClient(cookies());

  const {
    data: {user},
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <main className="flex flex-col bg-neutral-100 h-full overflow-x-hidden md:min-h-full md:rounded-xl p-1 md:p-3">
      <div className="flex flex-col flex-1">
        <Suspense fallback={<p>loading</p>}>
          <Hero full_name={user?.user_metadata?.full_name || user?.email || "Usuario"} />
        </Suspense>

        <Suspense fallback={<StatisticsSKeleton />}>
          <CardWrapper user_id={user?.id!} />
        </Suspense>

        <Suspense fallback={<ObrasTableSkeleton />}>
          <Tabla isSign={true} query="" currentPage={1} />
        </Suspense>
      </div>
    </main>
  );
};

export default Page;
