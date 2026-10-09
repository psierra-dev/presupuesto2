import React from "react";
import Statu from "./statu";
import Pagination from "@/app/ui/pagination";
import { ObraService } from "../services/obras";
import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";

import { Status } from "../libs/definitions";
import { redirect } from "next/navigation";
import Link from "next/link";
import CardObra from "./obras/card-obra";

const ListObra = async ({
  isSign,
  query,
  currentPage,
}: {
  isSign: boolean;
  query: string;
  currentPage: number;
}) => {
  const supabase = createClient(cookies());

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/");
  }
  const obraService = new ObraService(supabase);
  const { data: count_obras } = await supabase.rpc("count_obras");

  const { data: obras, total } = await obraService.getObras(
    data.user?.id!,
    query,
    currentPage
  );

  return (
    <section className=" p-2 flex-1 max-w-screen-[100vw] flex flex-col md:p-3 bg-white rounded-lg mt-3">
      {isSign && (
        <div className=" w-full flex justify-between p-1 md:p-3">
          <div className="">
            <h2 className=" font-semibold text-sm md:text-lg">Obras</h2>
            <p className=" text-xs md:text-sm font-thin text-neutral-600">
              Aqui veras tus obras
            </p>
          </div>
        </div>
      )}

      <section className=" sm:hidden overflow-auto min-h-[150px] flex flex-col gap-2">
        {obras?.map((p: any) => (
          <Link href={`/dashboard/obras/${p?.id}`} key={p.id}>
            <CardObra data={p} />
          </Link>
        ))}
      </section>
      {!obras || obras?.length > 0 ? (
        <div className=" overflow-auto hidden sm:block min-h-[150px]">
          <table className="w-full min-w-[600px]">
            <thead className=" ">
              <tr className=" border-b-2 border-b-neutral-200">
                <th className="w-[30%] p-2 md:p-3 text-start text-xs md:text-sm">
                  Nombre
                </th>
                <th className="w-[10%] p-2 md:p-3 text-start text-xs md:text-sm">
                  Estado
                </th>
                <th className="w-[30%] p-2 md:p-3 text-start text-xs md:text-sm">
                  Fecha
                </th>
                <th className="w-[30%] p-2 md:p-3 text-end text-xs md:text-sm">
                  Direccion
                </th>
              </tr>
            </thead>
            <tbody className=" min-h-[200px]  ">
              {obras?.map((d: any) => {
                const date = new Date(d.created_at);
                const date_string = date.toDateString();

                return (
                  <tr className="border-b-2  border-b-neutral-200" key={d?.id}>
                    <td className="w-[30%] h-fit  p-2 md:p-3 text-start text-xs md:text-sm">
                      <Link
                        className=" hover:text-red-400"
                        href={`/dashboard/obras/${d?.id}`}
                      >
                        {d?.name}
                      </Link>
                    </td>
                    <td className="w-[20%] h-fit  p-2  md:p-3 text-start">
                      <Statu statu={d?.state as Status} />
                    </td>
                    <td className="w-[20%] h-fit  p-2  md:p-3 text-start">
                      <span className=" text-xs text-neutral-500">
                        {date_string}
                      </span>
                    </td>
                    <td className="w-[30%] h-fit p-2  md:p-3 text-end text-xs md:text-sm font-light text-neutral-700">
                      {d?.direction}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className=" w-full min-h-[300px] flex flex-col items-center justify-center">
          <h4 className="text-base  font-light text-neutral-700">
            No agregaste niguna obra todavia
          </h4>
          {isSign && (
            <Link
              className=" py-1 px-2 rounded-md bg-red-500 text-sm text-white"
              href={"/dashboard/obras"}
            >
              Crear
            </Link>
          )}
        </div>
      )}

      {!isSign && obras?.length! > 0 && (
        <Pagination
          totalItems={total!}
          itemsForPage={7}
          currentItmesCount={obras?.length!}
          currentPage={currentPage}
        />
      )}
    </section>
  );
};

export default ListObra;
