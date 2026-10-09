"use client";

import { useEffect } from "react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.name);
    console.log(error);
  }, [error]);
  return <div>Error</div>;
};

export default Error;
