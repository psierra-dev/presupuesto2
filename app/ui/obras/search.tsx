"use client";
import React from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import {BiSearch} from "react-icons/bi";
const Search = () => {
  const searchParams = useSearchParams();
  const {replace} = useRouter();
  const pathname = usePathname();

  const handleChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="w-full max-w-[400px] py-2 px-4 flex items-center bg-white border-[1px] border-neutral-300 focus:border-gray-400 rounded-lg">
      <span className=" text-base">
        <BiSearch />
      </span>
      <input
        className="w-full max-w-[400px] ml-1 outline-none  text-sm font-light  placeholder:text-neutral-800"
        type="text"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        placeholder="Buscar Obra"
      />
    </div>
  );
};

export default Search;
