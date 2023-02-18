import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/svg/logo.svg";
import { Link } from "react-router-dom";
import FormErrors from "./FormErrors";

const Login = (props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [apiErrors, setAPIErrors] = useState();

  const onSubmit = async (formData) => {
    const response = await fetch(`/api/v1/users/login`, {
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
        <div className="w-full">
          <input
            type="text"
            className={`w-full rounded-xl h-18 p-6 text-base 
            ${errors.username ? "border border-hardRed" : ""} 
            outline-none focus:border focus:border-accent1 bg-grey3 relative`}
            name="emailOrUsername"
            placeholder="Username or Email"
            {...register("emailOrUsername", {
              required: "Please provide a username or email.",
            })}
          ></input>
          {errors.emailOrUsername && (
            <span className="mt-2 text-red-600">
              {errors.emailOrUsername.message}
            </span>
          )}
        </div>
        <div className="w-full">
          <input
            type="password"
            className={`w-full rounded-xl h-18 p-6 text-base 
            ${errors.password ? "border border-hardRed" : ""} 
            outline-none focus:border focus:border-accent1 bg-grey3`}
            name="password"
            placeholder="Password"
            {...register("password", {
              required: "Please provide a password.",
            })}
          ></input>
          {errors.password && (
            <span className="mt-2 text-red-600">{errors.password.message}</span>
          )}
        </div>
        {apiErrors}
        <button className="flex items-center justify-center mt-6 text-2xl w-full rounded-xl h-18 px-6 py-6 font-bold bg-accent1">
          Login
        </button>
        <div className="flex flex-row w-full items-center justify-between">
          <Link className="text-grey1 text-lg" to="/app/auth/reset/request">
            Forgot Password?
          </Link>
          <Link className="text-grey1 text-base" to="/app/auth/signup">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
