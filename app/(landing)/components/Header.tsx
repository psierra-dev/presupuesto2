"use client";

import Link from "next/link";
import {BiMenu} from "react-icons/bi";
import {useState} from "react";
import {MdClose} from "react-icons/md";
import {Logo} from "@/app/ui/icons/Logo";
import {Button} from "@/app/ui/button";

const Header = () => {
  const [menu, setMenu] = useState(false);

  return (
    <header className="w-full  py-3 pt-5 text-white  flex justify-between items-center px-3 md:col-span-full md:px-10 lg:px-20 xl:px-24">
      <Logo />
      <nav className="hidden md:flex">
        <ul className="text-center flex gap-4 items-center">
          <li
            className="text-neutral-700 hover:text-red-500"
            onClick={() => setMenu(false)}
          >
            <Link href={"/#services"}>Servicios</Link>
          </li>
          <li
            className="text-neutral-700 hover:text-red-500"
            onClick={() => setMenu(false)}
          >
            <Link href={"/#contact"}>Contacto</Link>
          </li>
          <li className="">
            <Link href={"/login"}>
              <Button>LOGIN</Button>
            </Link>
          </li>
        </ul>
      </nav>
      {menu && (
        <div
          className={`flex flex-col items-center animate-slideIn fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 z-20`}
        >
          <header className="w-full py-3 text-white  flex justify-between px-3">
            <Logo variant="white" />

            <button className="text-3xl text-white md:hidden">
              <MdClose onClick={() => setMenu(false)} />
            </button>
          </header>
          <nav className="w-full">
            <ul className="text-center w-full flex flex-col items-center">
              <li className="py-3 border-b w-full border-t border-neutral-500">
                <Link onClick={() => setMenu(false)} href={"/#services"}>
                  Servicios
                </Link>
              </li>
              <li className="py-3 border-b w-full border-neutral-500">
                <Link onClick={() => setMenu(false)} href={"/#contact"}>
                  Contacto
                </Link>
              </li>
              <li className="py-3 ">
                <Link href={"/login"}>
                  <Button>LOGIN</Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
      <button
        className="text-3xl text-neutral-950 md:hidden"
        onClick={() => setMenu(true)}
      >
        <BiMenu />
      </button>
    </header>
  );
};

export default Header;
