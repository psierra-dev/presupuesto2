
interface Props  {
    title: string,
    description: string,
    icon: any
}

const CardService = ({icon, title, description}: Props) => {
    return (
        <div className=" w-full max-w-[300px] flex flex-col items-center gap-2 gap-4 p-1">
            <div className=" bg-red-500 w-fit h-fi p-2 rounded-md text-xl text-white">
                <span>
                {icon}
                </span>
            </div>
            <div className=" flex flex-col gap-1 md:gap-3">
                <h3 className=" font-semibold text-center text-base md:text-lg  text-neutral-950">
                {title}
                </h3>
                <p className="text-neutral-600 text-sm text-center md:text-base">
                {description}
                </p>
            </div>
        </div>
    )
}

export default CardService;