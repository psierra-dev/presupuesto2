import Image from "next/image";
import React from "react";
import {BiCalendar, BiCircleThreeQuarter} from "react-icons/bi";
import {FaLocationPin} from "react-icons/fa6";
import CardInfo from "../card-info";
import {createClient} from "@/app/utils/supabase/server";
import {cookies} from "next/headers";
import ButtonModal from "./btn-modal";
import {FiEdit} from "react-icons/fi";
import FormUpdateObra from "./form-update-obra";

const HeroObra = async ({obra_id}: {obra_id: number | string}) => {
  const supabase = createClient(cookies());

  const {data: obra} = await (supabase
    .from("obras") as any)
    .select()
    .eq("id", obra_id)
    .single();

  return (
    <div className=" p-2 lg:p-4 relative rounded-xl bg-white ">
      <header className=" flex w-full justify-between">
        <h4 className=" font-bold">{obra?.name}</h4>

        <ButtonModal
          style="absolute right-0 border-none active:text-red-400 p-1 w-fit h-fit text-base md:text-lg rounded-full hover:bg-neutral-300"
          content={<FiEdit />}
        >
          <FormUpdateObra obra={obra} />
        </ButtonModal>
      </header>

      <div className="flex">
        <div className="w-1/2 flex justify-center ">
          <Image
            src={"/construccion.png"}
            alt="image"
            width={200}
            height={200}
            className="w-auto h-full rounded-full md:rounded-md"
          />
        </div>

        <div className=" w-1/2">
          <CardInfo
            title="Direccion"
            info={obra?.direction!}
            icon={<FaLocationPin />}
          />
          <CardInfo
            title="Fecha de inicio"
            info={obra?.start_date!}
            icon={<BiCalendar />}
          />
          <CardInfo
            title="Fecha de fin"
            info={obra?.end_date!}
            icon={<BiCalendar />}
          />
          <CardInfo
            title="Estado"
            info={obra?.state!}
            icon={<BiCircleThreeQuarter />}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroObra;
