import React from "react";
import FormTest from "../ui/form-test";
//import MyDocument from "../ui/mydocument";
import dynamic from "next/dynamic";
import CardObra from "../ui/obras/card-obra";

const MyDocument = dynamic(() => import("../ui/mydocument"), {
  loading: () => <p>Loading</p>,
  ssr: false,
});
const budget_job = [
  {
    id: 31,
    name: "EXCAV. CIMIENTOS y carga de tierra",
    meter: 3,
    id_budget: 3,
    created_at: "2024-03-03T00:10:19.963371+00:00",
    measurement: "m3",
    price_labour: 10038,
  },
  {
    id: 32,
    name: "EXCAVACION DE POZOS HASTA 0",
    meter: 0,
    id_budget: 3,
    created_at: "2024-03-03T00:11:22.913122+00:00",
    measurement: "8M",
    price_labour: 15735,
  },
  {
    id: 33,
    name: "LIMPIEZA Y NIVELACION",
    meter: 0,
    id_budget: 3,
    created_at: "2024-03-03T00:11:22.913122+00:00",
    measurement: "m3",
    price_labour: 8139,
  },
  {
    id: 35,
    name: "RELLENO Y COMPACTACION",
    meter: 0,
    id_budget: 3,
    created_at: "2024-03-03T00:16:24.415026+00:00",
    measurement: "m3",
    price_labour: 8546,
  },
  {
    id: 36,
    name: "EXCAVACION DE SOTANOS",
    meter: 0,
    id_budget: 3,
    created_at: "2024-03-03T00:17:16.321507+00:00",
    measurement: "m3",
    price_labour: 9767,
  },
  {
    id: 37,
    name: "Excavación y relleno cimientos con Piedra Bola y Ripio",
    meter: 0,
    id_budget: 3,
    created_at: "2024-03-03T00:22:45.950197+00:00",
    measurement: "m3",
    price_labour: 32308,
  },
];
const Page = () => {
  return (
    <main className=" h-screen w-screen">
      <h2>Test</h2>
      <CardObra data={""} />
    </main>
  );
};

export default Page;
