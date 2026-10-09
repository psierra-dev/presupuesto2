"use client";
import Link from "next/link";
import React from "react";
import { generatePagination } from "@/app/libs/utils";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
const Pagination = ({
  totalItems,
  itemsForPage,
  currentPage,
  currentItmesCount,
}: {
  totalItems: number;
  itemsForPage: number;
  currentItmesCount: number;
  currentPage: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const showFrom = (currentPage - 1) * itemsForPage;
  const showTo =
    currentItmesCount < itemsForPage
      ? showFrom + currentItmesCount
      : showFrom + itemsForPage;
  const totalPage = Math.ceil(totalItems / itemsForPage);

  const allPages = generatePagination(currentPage, totalPage);

  //  console.log(pagination, page);

  const createPageURL = (page: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 items-center justify-center  sm:hidden">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          disabled={currentPage <= 1}
        />
        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">{showFrom + 1}</span>-
            <span className="font-medium">{showTo}</span>
            de
            <span className="font-medium">{totalItems}</span>
          </p>
        </div>
        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          disabled={currentPage >= totalPage}
        />
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">{showFrom + 1}</span>-
            <span className="font-medium">{showTo}</span>
            de
            <span className="font-medium">{totalItems}</span>
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <PaginationArrow
              direction="left"
              href={createPageURL(currentPage - 1)}
              disabled={currentPage <= 1}
            />

            {allPages.map((page, index) => {
              let position: "first" | "last" | "single" | "middle" | undefined;

              if (index === 0) position = "first";
              if (index === allPages.length - 1) position = "last";
              if (allPages.length === 1) position = "single";
              if (page === "...") position = "middle";

              return (
                <PaginationNumber
                  key={page}
                  href={createPageURL(page)}
                  page={page}
                  position={position}
                  isActive={currentPage === page}
                />
              );
            })}
            <PaginationArrow
              direction="right"
              href={createPageURL(currentPage + 1)}
              disabled={currentPage >= totalPage}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

function PaginationArrow({
  href,
  disabled,
  direction,
}: {
  href: string;
  disabled: boolean;
  direction: string;
}) {
  const Icon =
    direction === "right" ? (
      <svg
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
          clipRule="evenodd"
        />
      </svg>
    );
  return (
    <Link
      href={href}
      className={clsx(
        "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50",

        {
          "pointer-events-none text-gray-300": disabled,
          "hover:bg-gray-100": !disabled,
          "mr-2 md:mr-4": direction === "left",
          "ml-2 md:ml-4": direction === "right",
        }
      )}
    >
      {Icon}
    </Link>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-red-600 border-red-600 text-white": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}
export default Pagination;
