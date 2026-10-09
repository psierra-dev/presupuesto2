import React from "react";
import FormAuth from "../ui/form-auth";
import { login } from "../actions";

const Page = () => {
  return <FormAuth type="login" action={login} />;
};

export default Page;
