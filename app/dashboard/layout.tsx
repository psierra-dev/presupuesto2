import React, {Suspense} from "react";
import SideBar from "@/app/ui/dashboard/sidebar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=" min-h-screen w-full bg-neutral-900 relative md:flex md:gap-4">
      <>
        <SideBar />

        <div className=" h-mobilemain md:h-screen w-full md:ml-[55px] lg:ml-[210px] mb-[48px] md:mb-0 bg-neutral-900 md:p-6">
          {/*<Suspense fallback={<h3>Loading.....</h3>}>{children}</Suspense>*/}
          {children}
        </div>
      </>
    </div>
  );
};

export default layout;
