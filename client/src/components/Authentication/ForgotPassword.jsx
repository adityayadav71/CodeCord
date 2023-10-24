import { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "/svg/logo.svg";
import { Link } from "react-router-dom";
import FormErrors from "./FormErrors";
import FormSuccess from "./FormSuccess";
import { forgotPassword } from "../../api/authDataAPI";

const ForgotPassword = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [successMessage, setSuccessMessage] = useState();
  const [apiErrors, setAPIErrors] = useState();
  const [status, setStatus] = useState();

  const onSubmit = async (formData) => {
    setStatus("waiting");
    try {
      await forgotPassword(formData);
      setSuccessMessage(<FormSuccess message={"Password reset link sent successfully to registered email address."} />);
    } catch (err) {
      setAPIErrors(<FormErrors message={err.response.data.message} />);
    }
    setStatus("");
  };

  return (
    <div className="flex flex-row items-center grow w-full py-9 px-9">
      <form className="flex flex-col w-[400px] max-w-7xl mx-auto items-center justify-center px-5 py-10 gap-y-6 text-white bg-secondary rounded-xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="h-10 mb-12 mx-auto">
          <img src={logo} alt="logo" />
        </div>
        {successMessage || (
          <>
            <div className="w-full">
              <input
                type="email"
                className={`w-full rounded-xl h-18 px-6 py-6 text-base 
                ${errors.email ? "ring-1 ring-hardRed" : ""} 
                outline-none focus:ring-1 focus:ring-accent1 bg-grey3`}
                name="email"
                placeholder="Registered Email address"
                {...register("email", {
                  required: "Please provide an email address.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              ></input>
              {errors.email && <span className="mt-2 text-red-600">{errors.email.message}</span>}
            </div>
            {apiErrors}
            <button disabled={status === "waiting"} className="flex gap-x-3 items-center justify-center mt-6 text-2xl w-full rounded-xl h-18 px-6 py-6 font-bold bg-accent1 hover:bg-lightAccent1">
              {status === "waiting" && <div className="spinner-border"></div>}
              Reset My Password
            </button>
            <div className="flex flex-row w-full items-center justify-between">
              <p className="text-grey1 text-sm">We will send a password reset link to this email address</p>
              <Link className="text-grey1 text-base" to="/app/auth/login">
                Login
              </Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
