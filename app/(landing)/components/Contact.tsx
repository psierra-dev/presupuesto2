"use client"
import { CustomInput }from "@/app/ui/input"
import { Button } from "@/app/ui/button"

const Contact = () => {
    return (
        <section id="contact" className=" flex flex-col items-center gap-4 w-full px-3 bg-red-500 py-5 md:py-8 xl:py-12">
            <h2 className="text-xl font-bold text-white text-center md:text-2xl">Contactanos</h2>
            <form className="flex flex-col gap-3 w-full max-w-[400px]">
                <CustomInput type="email" name="email" placeholder="Pon tu email"/>
                <Button variant="secondary" className="w-full">Enviar</Button>
            </form>
        </section>
    )
}

export default Contact
