import React from "react";

const FormErrors = ({ name, message }) => {
  return (
    <div className="flex flex-col w-full gap-y-2 bg-lightPrimary border border-hardRed p-3 rounded-lg">
      {name && <h1 className="text-hardRed text-xl font-bold">{name}</h1>}
      <p className="text-md text-red-600 font-bold">{message}</p>
    </div>
  );
};

export default FormErrors;
