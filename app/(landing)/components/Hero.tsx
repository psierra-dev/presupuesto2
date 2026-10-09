import Image from "next/image"
import Link from "next/link"
import { Button } from "@/app/ui/button"

/* <img src="/bg-hero.svg" alt="background hero" className="w-full z-0 absolute md:hidden translate-y-[-75px]" />
            <img src="/bg-hero.svg" alt="background hero" className="w-full z-0 absolute md:hidden transform   rotate-180 translate-y-[75px]" />
             */
const Hero = () => {
    return (
        <section className=" flex flex-col-reverse items-center flex-1 sm:grid sm:grid-cols-8 sm:gap-3 sm:px-5 sm:py-5 md:grid md:grid-cols-12 md:place-content-center md:gap-5 md:px-10 lg:px-20 xl:px-24">
          <div className="flex flex-col translate-y-[-120px] sm:translate-y-0 sm:col-span-5  md:col-span-6">
              <img src="/svg-pattern.svg" alt="background hero" className="w-full sm:hidden" />
              <div className="bg-neutral-950 flex flex-col px-3 py-10 xs:px-6  sm:p-0  gap-3 lg:gap-4 xl:gap-5 justify-center items-center  sm:bg-white   sm:items-start">
                    <h1 className="text-2xl text-center z-10 text-white md:text-3xl sm:text-left sm:text-neutral-950 lg:text-4xl xl:text-5xl font-semibold">
                      Gestiona tus Proyectos de Construcción de Forma Eficiente
                    </h1>
                    <p className="text-base font-normal text-center text-neutral-300 z-10 sm:text-left sm:text-neutral-500 md:text-lg">
                      Facilita la gestión de tus proyectos de construcción con
                      precisión y eficiencia
                    </p>
                  

                  <div className="flex items-center md:items-start gap-3 z-10">
                    <Link
                      href={"/login"}
                      className=""
                    >
                      <Button>Probar demo</Button>
                    </Link>
                    <Link
                      href={"/register"}
                      className=""
                    >
                      <Button variant="tertiary">Crear cuenta</Button>
                    </Link>
                  </div>
              </div>
                  <img src="/svg-pattern.svg" alt="background hero" className="w-full rotate-180 sm:hidden" />
          </div>
        <div className=" px-3 xs:px-6 sm:px-4 sm:col-span-3 md:col-span-6">
            <Image
              src={"/mackoup-phone.png"}
              alt="Hero desk"
              width={700}
              height={700}
              className="w-full h-auto  sm:hidden"
            />
            <Image
              src={"/mack-pad.png"}
              alt="Hero desk"
              width={700}
              height={700}
              className="w-full h-auto hidden sm:block  md:hidden"
            />
            <Image
              src={"/mack-lapto.png"}
              alt="Hero desk"
              width={700}
              height={700}
              className="w-full h-auto hidden md:block"
            />
          </div>
          

          
        </section>
    )
}

export default Hero;