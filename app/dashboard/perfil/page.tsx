import {signOut} from "@/app/libs/actions";
import {Button} from "@/app/ui/button";
import {createClient} from "@/app/utils/supabase/server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import Image from "next/image";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const PagePerfil = async () => {
  const supabase = createClient(cookies());

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const displayName = user?.user_metadata?.full_name || user?.email || "Usuario";

  return (
    <main className="bg-neutral-100 min-h-screen md:min-h-full md:rounded-xl p-2 md:p-3">
      <section className="flex flex-col px-2 mx-auto md:w-[70%]  lg:w-[50%] flex-1 w-full">
        <div className="flex flex-col items-center mb-2 bg-neutral-800 p-3 rounded-lg">
          <Image
            className=" w-28 h-28 rounded-full"
            src="/construccion.png"
            alt="Imagen de perfil"
            width={100}
            height={100}
          />
          <h5 className=" font-semibold text-white mt-2">
            {displayName}
          </h5>
          {user?.email && (
            <p className="text-xs text-neutral-400 mt-1">{user.email}</p>
          )}
        </div>

        <div className="flex justify-center">
          <form action={signOut}>
            <Button type="submit" variant="outline">
              Cerrar Sesion
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default PagePerfil;
