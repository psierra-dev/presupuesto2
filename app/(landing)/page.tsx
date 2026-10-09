import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div className=" w-full h-full bg-white flex flex-col">
      <div className="min-h-screen flex flex-col md:grid md:grid-cols-12 md:gap-5 ">
        <Header />
        <main className="flex flex-col flex-1  justify-center gap-10 sm:gap-12 md:gap-14 md:col-span-full lg:gap-20 xl:gap-24  ">
          <Hero />
          <Services />

          <Contact />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
