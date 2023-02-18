import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/svg/logo.svg";
import { Link } from "react-router-dom";
import FormErrors from "./FormErrors";

const SignUp = (props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [apiErrors, setAPIErrors] = useState();

  const onSubmit = async (formData) => {
    const response = await fetch(`/api/v1/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();

    result.status === "success"
      ? navigate("/", { replace: true })
      : setAPIErrors(<FormErrors message={result.message} />);
  };

  return (
    <div className="flex flex-row items-center grow w-full py-9 px-9">
      <form
        className="flex flex-col w-[400px] max-w-7xl mx-auto items-center justify-center px-5 py-10 gap-y-6 text-white bg-secondary rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <img className="mb-12" src={logo} alt="logo" />
        <div className="w-full relative group">
          <input
            type="text"
            className={`w-full rounded-xl h-18 px-6 py-6 text-base 
            ${errors.username ? "border border-hardRed" : ""} 
            outline-none focus:border focus:border-accent1 bg-grey3 relative`}
            name="username"
            placeholder="Username"
            {...register("username", {
              required: "Please provide a username.",
              pattern: {
                value:
                  /^(?=.{4,20}$)(?!.*\s)(?!.*[_]{2})[a-zA-Z0-9_]+(?<![_.])$/,
                message:
                  "Username should be 4 to 20 characters long, only digits, letters and underscores are allowed. Do not end with an underscore.",
              },
            })}
          ></input>
          {errors.username && (
            <span className="mt-2 text-red-600">{errors.username.message}</span>
          )}
        </div>
        <div className="w-full relative group">
          <input
            type="password"
            className={`w-full rounded-xl h-18 px-6 py-6 text-base 
            ${errors.password ? "border border-hardRed" : ""} 
            outline-none focus:border focus:border-accent1 bg-grey3`}
            name="password"
            placeholder="Password"
            {...register("password", {
              required: "Please provide a password.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          ></input>
          {errors.password && (
            <span className="mt-2 text-red-600">{errors.password.message}</span>
          )}
        </div>
        <div className="w-full relative group">
          <input
            type="password"
            className={`w-full rounded-xl h-18 px-6 py-6 text-base
            ${errors.passwordConfirm ? "border border-hardRed" : ""}
            outline-none focus:border focus:border-accent1 bg-grey3`}
            name="passwordConfirm"
            placeholder="Confirm password"
            {...register("passwordConfirm", {
              required: "Please confirm your password",
              validate: (val) => {
                if (watch("password") != val) {
                  return "Passwords do no match";
                }
              },
            })}
          ></input>
          {errors.passwordConfirm && (
            <span className="mt-2 text-red-600">
              {errors.passwordConfirm.message}
            </span>
          )}
        </div>
        <div className="w-full relative group">
          <input
            type="email"
            className="w-full rounded-xl h-18 px-6 py-6 text-base focus:outline focus:outline-accent1 bg-grey3"
            name="email"
            placeholder="Email Address"
            {...register("email", {
              required: "Please provide an Email address.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          ></input>
          {errors.email && (
            <span className="mt-2 text-red-600">{errors.email.message}</span>
          )}
        </div>
        {apiErrors}
        <button className="flex items-center justify-center mt-6 text-2xl w-full rounded-xl h-18 px-6 py-6 font-bold bg-accent1">
          Sign Up
        </button>
        <div className="flex flex-row items-center justify-center gap-x-3">
          <p className="text-white text-lg">Have an Account?</p>
          <Link className="text-grey1 text-base" to="/app/auth/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
