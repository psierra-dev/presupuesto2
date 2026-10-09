import Search from "@/app/ui/obras/search";
import Tabla from "@/app/ui/list-obras";
import {createClient} from "@/app/utils/supabase/server";
import {cookies} from "next/headers";
import Link from "next/link";
import {redirect} from "next/navigation";
import React, {Suspense} from "react";
import {Button} from "@/app/ui/button";
import {ObrasTableSkeleton} from "@/app/ui/skeletons";

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const supabase = createClient(cookies());
  const {data, error} = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <main className="flex flex-col bg-neutral-100 h-full overflow-x-hidden md:min-h-full md:rounded-xl p-1 md:p-3">
      <div className="flex  flex-col flex-1">
        <div className="flex  justify-between p-2">
          <h1 className=" text-lg font-semibold">Obras</h1>
          <Link className="" href={`/dashboard/obras/create`}>
            <Button className="h-[35px]">Crear</Button>
          </Link>
        </div>
        <div>
          <Search />
        </div>
        <Suspense fallback={<ObrasTableSkeleton />}>
          <Tabla isSign={false} query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </main>
  );
};

export default Page;
