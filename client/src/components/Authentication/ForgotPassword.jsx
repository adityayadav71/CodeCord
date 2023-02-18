import { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/svg/logo.svg";
import { Link } from "react-router-dom";
import FormErrors from "./FormErrors";
import FormSuccess from "./FormSuccess";

const ForgotPassword = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [successMessage, setSuccessMessage] = useState();
  const [apiErrors, setAPIErrors] = useState();

  const onSubmit = async (formData) => {
    const response = await fetch(`/api/v1/users/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();

    result.status === "success"
      ? setSuccessMessage(
          <FormSuccess
            message={
              "Password reset link sent successfully to registered email address."
            }
          />
        )
      : setAPIErrors(<FormErrors message={result.message} />);
  };

  return (
    <div className="flex flex-row items-center grow w-full py-9 px-9">
      <form
        className="flex flex-col w-[400px] max-w-7xl mx-auto items-center justify-center px-5 py-10 gap-y-6 text-white bg-secondary rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <img className="mb-12" src={logo} alt="logo" />
        {successMessage || (
          <>
            <div className="w-full">
              <input
                type="email"
                className="w-full rounded-xl h-18 px-6 py-6 text-base focus:outline focus:outline-accent1 bg-grey3"
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
              {errors.email && (
                <span className="mt-2 text-red-600">
                  {errors.email.message}
                </span>
              )}
            </div>
            {apiErrors}
            <button className="flex items-center justify-center mt-6 text-2xl w-full rounded-xl h-18 px-6 py-6 font-bold bg-accent1">
              Reset My Password
            </button>
            <div className="flex flex-row w-full items-center justify-between">
              <p className="text-grey1 text-sm">
                We will send a password reset link to this email address
              </p>
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
