import React from "react";
import Form from "./Form";

const SignIn = (props) => {
  return <Form fields={["Username", "Password"]} buttonName="Sign In" />;
};

export default SignIn;
