import React from "react"
import Form from "./Form"
const PasswordResetForm = (props) => {
  return <Form fields={["New Password", "Confirm New Password"]} buttonName="Reset My Password" />
};

export default PasswordResetForm;
