import React from "react";
import Form from "./Form";

const SignUp = (props) => {
  return <Form fields={["Username", "Password", "Confirm Password", "E-mail Address"]} buttonName="Sign Up" />;
};

export default SignUp;
