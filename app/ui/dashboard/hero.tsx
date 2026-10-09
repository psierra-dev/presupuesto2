const Hero = ({full_name}: {full_name: string}) => {
  return (
    <section className="flex flex-col py-4  w-full  ">
      <h2 className={`  text-xl md:text-4xl   font-medium mb-1`}>
        Hola {full_name}, Bienvenido.
      </h2>
      <p className="text-neutral-700 text-sm md:text-md ">
        Aqui podras crear tus presupuestos
      </p>
    </section>
  );
};

export default Hero;
