import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/svg/logo.svg";
import FormErrors from "./FormErrors";

const PasswordReset = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [apiErrors, setAPIErrors] = useState();

  const onSubmit = async (formData) => {
    const response = await fetch(
      `/api/v1/users/resetPassword/${params.token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
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
          type="password"
            className={`w-full rounded-xl h-18 px-6 py-6 text-base 
            ${errors.password ? "border border-hardRed" : ""} 
            outline-none focus:border focus:border-accent1 bg-grey3`}
            name="password"
            placeholder="New Password"
            {...register("password", {
              required: "Please provide a new password.",
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
        <div className="w-full">
          <input
          type="password"
            className={`w-full rounded-xl h-18 px-6 py-6 text-base
            ${errors.passwordConfirm ? "border border-hardRed" : ""}
            outline-none focus:border focus:border-accent1 bg-grey3`}
            name="passwordConfirm"
            placeholder="Confirm New Password"
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
        {apiErrors}
        <button className="flex items-center justify-center mt-6 text-2xl w-full rounded-xl h-18 px-6 py-6 font-bold bg-accent1">
          Reset My Password
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
