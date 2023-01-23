import React from "react";
import TextInput from "./TextInput";
import logo from "../../assets/svg/logo.svg";

const Form = ({ fields, buttonName }) => {
  const inputFields = fields.map((field) => {
    return <TextInput placeholder={`${field}`}></TextInput>;
  });
  return (
    <form className="flex flex-col w-1/3 items-center justify-center px-5 py-12 gap-y-6 text-white bg-secondary rounded-xl">
      <img className="mb-12" src={logo} alt="logo" />
      {inputFields}
      <button className="flex items-center justify-center mt-12 text-2xl w-full rounded-xl h-18 px-6 py-6 font-bold bg-accent1">{buttonName}</button>
    </form>
  );
};

export default Form;
