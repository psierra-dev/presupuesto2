"use client";
import clsx from "clsx";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";
import {BiBuilding, BiHomeAlt, BiUser} from "react-icons/bi";
import {Logo} from "../icons/Logo";

const links = [
  {name: "Home", href: "/dashboard", icon: <BiHomeAlt />},
  {
    name: "Obras",
    href: "/dashboard/obras",
    icon: <BiBuilding />,
  },
  {name: "Perfil", href: "/dashboard/perfil", icon: <BiUser />},
];

const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="md:py-6  w-full fixed bottom-0 md:fixed md:h-screen md:w-fit">
      <div className="p-2 hidden lg:flex items-center gap-1">
        <Logo variant="white" />
      </div>
      <nav className=" bg-neutral-900 w-full md:h-full  p-3 lg:w-[200px] md:rounded-xl ">
        <ul className=" flex justify-between md:flex-col gap-2   ">
          {links.map((l) => (
            <li key={l.name} className="p-2 rounded-lg hover:bg-neutral-800 ">
              <Link href={l.href} prefetch={false} className="flex items-center gap-1 ">
                <div
                  className={clsx(
                    "  p-2 rounded-lg text-white text-lg ",
                    pathname === l.href ? "bg-red-500" : "bg-neutral-800"
                  )}
                >
                  {l.icon}
                </div>
                <span
                  className={clsx(
                    " hidden lg:block text-sm",
                    pathname === l.href ? "text-red-500" : "text-neutral-300"
                  )}
                >
                  {l.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
