import { BiBarChartSquare, BiSpreadsheet } from "react-icons/bi"
import { TbShovel } from "react-icons/tb"
import CardService from "../ui/CardService"
const SERVICES = [
    {   
        id: 1,
        title: "Gestiona tus Proyectos de Construcción",
        description: "Crea y administra tus proyectos de construcción con facilidad. Define todos los detalles importantes de la obra y mantén toda la información centralizada y accesible.",
        icon: <TbShovel />
    },
    {
        id: 2,
        title: "Controla tus Ingresos y Gastos",
        description: "Registra y monitorea todos los movimientos financieros de tu obra. Conoce cuánto dinero se ha cobrado, cuánto queda por cobrar, y mantén un seguimiento detallado de tus ingresos y gastos.",
        icon:  <BiBarChartSquare />
    },
    {
        id: 3,
        title: "Presupuestos Precisos y Actualizados",
        description: "Genera presupuestos detallados con información actualizada. Nuestra app te permite crear y ajustar presupuestos según los datos más recientes, asegurando precisión y eficiencia en cada proyecto.",
        icon: <BiSpreadsheet />
    }
]

const Services = () => {
    return (
        <section id="services" className="flex flex-col translate-y-[-120px] sm:translate-y-0 gap-6 px-3 sm:px-5 sm:grid sm:grid-cols-8 sm:px-4 md:gap-8 md:px-10 md:grid-cols-12  lg:px-20 xl:px-24">
            <h2 className="text-neutral-950 text-center font-bold text-xl sm:col-span-full md:text-2xl ">
            Nuestros servicios
            </h2>

            <div className="flex flex-col items-center sm:grid sm:col-span-full sm:gap-3  sm:grid-cols-3 xl:col-start-2 xl:col-end-12">
                {
                    SERVICES.map(service => <CardService key={service.id} title={service.title} description={service.description} icon={service.icon}/>)
                }
            </div>
      </section>
    )
}

export default Services