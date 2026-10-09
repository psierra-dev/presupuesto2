"use client";
import React, { useCallback, useEffect, useState } from "react";
import list from "@/app/libs/costo/Febrero24.json";
import { createClient } from "../utils/supabase/client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";

const categories = Array.from(new Set(list.map((l) => l.category)));

const ListCostos = ({ id_budget }: { id_budget: number }) => {
  const [filter, setFilter] = useState("MOVIMIENTOS DE SUELOS:");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any[]>([]);
  const [budgetJob, setBudgetJob] = useState<any[]>([]);
  const [status, setStatus] = useState("typing");
  const router = useRouter();

  const supabase = createClient();

  const listFiltered = useCallback(
    () =>
      budgetJob
        .filter((l) => l.category === filter)
        .filter((l) => {
          return search.length > 0
            ? l.name.toLowerCase().startsWith(search.toLocaleLowerCase())
            : true;
        }),
    [filter, search, budgetJob]
  );

  useEffect(() => {
    async function getJob() {
      const { data } = await (supabase
        .from("budget_job") as any)
        .select("name")
        .eq("id_budget", id_budget);

      const listname = (data as any[])?.map((d: any) => d.name);
      const listFiltered = list.filter(
        (l) => !listname?.some((d: any) => l?.name === d)
      );
      setBudgetJob(listFiltered);
    }

    getJob();
  }, [id_budget, supabase]);

  const addToBudget = async () => {
    setStatus("loading");
    const new_data = selected.map((d) => {
      const { price_labour, measurement, name } = d;
      return {
        price_labour,
        measurement,
        id_budget,
        name,
      };
    });
    const { error } = await (supabase.from("budget_job") as any).insert(new_data);
    console.log(error);
    if (!error) {
      router.refresh();
      setBudgetJob((prev) =>
        prev.filter((d) => selected.some((x) => d.name !== x.name))
      );
      setSelected([]);
      setStatus("success");

      setTimeout(() => {
        setStatus("typing");
      }, 3000);
      return;
    }

    setStatus("error");
  };

  return (
    <div className=" flex flex-col h-full max-h-[500px] w-full max-w-[600px] p-2 lg:p-3 rounded-xl bg-white m-1 ">
      <header className=" mb-2 bg-neutral-100 py-1 rounded-md text-neutral-950">
        <h5 className=" text-md font-semibold">Costo: Mano de obra</h5>
        <p className=" text-sm font-extralight text-red-400">Febrero 2024</p>
      </header>

      <div className=" w-full  flex flex-wrap gap-2 justify-between">
        <div className="py-2 px-4 w-full flex items-center bg-white border-[1px] border-neutral-300 focus:border-gray-400 rounded-lg">
          <span className=" text-base">
            <BiSearch />
          </span>
          <input
            className="w-full max-w-[400px] ml-1 outline-none  text-sm font-light  placeholder:text-neutral-800"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar Mano de obra"
          />
        </div>

        <select
          onChange={(e) => setFilter(e.target.value)}
          name=""
          id=""
          className=" w-full text-neutral-900 bg-transparent border-[1px] outline-none focus:border-gray-400 rounded-lg text-xs mt-2 font-light py-2 px-4"
        >
          {categories.map((c, index) => (
            <option className=" text-neutral-900" key={index}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-h-[300px] overflow-auto mt-2 w-full">
        {listFiltered().length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className=" text-xs font-medium">
                <th className=" text-start p-2">Nombre</th>
                <th className=" text-start p-2">Categoria</th>
                <th className=" text-end p-2">Precio/m2|m3</th>
              </tr>
            </thead>

            <tbody>
              {listFiltered().map((l) => (
                <tr
                  key={l.name}
                  className={clsx(
                    " rounded-md shadow-md text-xs font-light cursor-pointer",
                    selected.some((d) => l.name === d.name) &&
                      "border-[1px] border-red-500"
                  )}
                  onClick={() => {
                    if (selected.some((d) => l.name === d.name)) {
                      setSelected((prev) =>
                        prev.filter((d) => d.name !== l.name)
                      );
                      return;
                    }
                    setSelected([...selected, l]);
                  }}
                >
                  <td className="p-2 text-start">{l.name}</td>
                  <td className="p-2 text-start">{l.category}</td>
                  <td className="p-2 text-end">
                    {l.price_labour}/{l.measurement}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-neutral-700">
            Se agregaron todos los items de esta categoria
          </p>
        )}
      </div>
      <div className="w-full p-2 flex items-center justify-between rounded-md bg-neutral-700">
        <ul className="flex overflow-auto gap-1 flex-1 text-white">
          {selected?.map((d) => (
            <li key={d.name}>
              <div className="text-[11px] w-max p-1 border-[1px] border-neutral-500">
                {d?.name}
              </div>
            </li>
          ))}
        </ul>

        {status === "success" && (
          <p className=" text-xs   text-green-400">
            Se añadieron correctamente
          </p>
        )}
        {status === "error" && (
          <p className=" text-xs   text-red-400">
            Error al añadir este elemento.
          </p>
        )}

        <button
          disabled={status === "loading" || selected.length === 0}
          type="submit"
          className=" px-2 h-fit flex justify-center min-w-10 py-1 rounded-md text-sm bg-red-500 disabled:bg-red-300 ml-2  text-white"
          onClick={addToBudget}
        >
          {status === "loading" ? (
            <span className="text-center animate-spin">
              <FiLoader />
            </span>
          ) : (
            "Añadir"
          )}
        </button>
      </div>
    </div>
  );
};

export default ListCostos;
