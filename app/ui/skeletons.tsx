export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="w-[30%] h-fit  p-2 md:p-3 ">
        <div className="flex items-center gap-3">
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      <td className="w-[30%] h-fit  p-2 md:p-3 ">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>

      <td className="w-[30%] h-fit  p-2 md:p-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>

      <td className="w-[30%] h-fit p-2  md:p-3 text-end">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
    </tr>
  );
}

export function ObrasTableSkeleton() {
  return (
    <>
      <section className="flex-1 flex flex-col gap-3 bg-white   sm:hidden">
        <div className="h-[80px] rounded-md bg-gray-100 animate-pulse"></div>
        <div className="h-[80px] rounded-md bg-gray-100 animate-pulse"></div>
        <div className="h-[80px] rounded-md bg-gray-100 animate-pulse"></div>
        <div className="h-[80px] rounded-md bg-gray-100 animate-pulse"></div>
      </section>
      <div className=" hidden p-2 flex-1 max-w-screen-[100vw] sm:flex flex-col md:p-3 bg-white rounded-lg mt-3">
        <div className="overflow-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-[30%] p-2 md:p-3 text-start text-xs md:text-sm"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  className="w-[30%] p-2 md:p-3 text-start text-xs md:text-sm"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  className="w-[30%] p-2 md:p-3 text-start text-xs md:text-sm"
                >
                  Fecha
                </th>
                <th
                  scope="col"
                  className="w-[30%] p-2 md:p-3 text-end text-xs md:text-sm"
                >
                  Direccion
                </th>
              </tr>
            </thead>
            <tbody className=" min-h-[200px]  ">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export function StatisticsSKeleton() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div className=" col-span-1 h-[100px] lg:h-[130px] bg-gray-200 rounded-lg animate-pulse"></div>
      <div className=" col-span-1 h-[100px] lg:h-[130px] bg-gray-200 rounded-lg animate-pulse"></div>
      <div className=" col-span-1 h-[100px] lg:h-[130px] bg-gray-200 rounded-lg animate-pulse"></div>
      <div className=" col-span-1 h-[100px] lg:h-[130px] bg-gray-200 rounded-lg animate-pulse"></div>
    </section>
  );
}

export function BudgetJobSkeleton({is_edit = false}: {is_edit?: boolean}) {
  return (
    <>
      <section className="flex-1 flex flex-col gap-3 bg-white   sm:hidden">
        <div className="h-[80px] rounded-md bg-gray-100 animate-pulse"></div>
        <div className="h-[80px] rounded-md bg-gray-100 animate-pulse"></div>
        <div className="h-[80px] rounded-md bg-gray-100 animate-pulse"></div>
        <div className="h-[80px] rounded-md bg-gray-100 animate-pulse"></div>
      </section>
      <table className="w-full hidden sm:table">
        <thead>
          <tr className="text-xs md:text-sm font-thin ">
            <th className="w-[50%] p-2 text-start">Nombre</th>
            <th className="w-[20%] p-2 text-start">Metro*Precio</th>
            <th className="w-[20%] p-2 text-end">Total</th>
            {is_edit && <th className=" w-[10] p-2 text-end">Edit</th>}
          </tr>
        </thead>

        <tbody>
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </tbody>
      </table>
    </>
  );
}
