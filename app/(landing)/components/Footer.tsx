import Link from "next/link"
import{ Logo } from "@/app/ui/icons/Logo"

const Footer = () => {
    return (
        <footer className="w-full py-3 bg-neutral-950 text-white  flex flex-col gap-3 items-center px-1 sm:flex-row sm:gap-10 sm:px-4 md:px-5  lg:px-20 xl:24">
            <Logo variant="white"/>

            
            <ul className="text-center  flex flex-col items-center sm:flex-row sm:gap-5">
              <li className="py-3 text-base " ><Link className="hover:text-red-500" href={"/#services"}>Servicios</Link></li>
              <li className="py-3 text-base " ><Link className="hover:text-red-500" href={"/#contact"}>Contacto</Link></li>
             
            </ul>
        </footer>
    )
}

export default Footer