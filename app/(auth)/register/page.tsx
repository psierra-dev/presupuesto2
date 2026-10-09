import React from "react";
import FormAuth from "../ui/form-auth";
import { signup } from "../actions";

const Page = () => {
  return <FormAuth type="register" action={signup} />;
};

export default Page;
