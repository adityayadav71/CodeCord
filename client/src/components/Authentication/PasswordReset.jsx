import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "/svg/logo.svg";
import FormErrors from "./FormErrors";
import FormSuccess from "./FormSuccess";
import { resetPassword } from "../../api/authDataAPI";

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
  const [successMessage, setSuccessMessage] = useState();
  const [status, setStatus] = useState();

  const onSubmit = async (formData) => {
    setStatus("waiting");
    try {
      await resetPassword(formData, params.token);
      setSuccessMessage(<FormSuccess message={"Password reset successfully! Redirecting to Login page."} />);
      setTimeout(() => {
        navigate("/app/auth/login", { replace: true });
        setStatus("");
      }, 2000);
    } catch (err) {
      setStatus("");
      setAPIErrors(<FormErrors message={err.response.data.message} />);
    }
  };

  return (
    <div className="flex flex-row items-center grow w-full py-9 px-9">
      <form className="flex flex-col w-[400px] max-w-7xl mx-auto items-center justify-center px-5 py-10 gap-y-6 text-white bg-secondary rounded-xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="h-10 mb-12 mx-auto">
          <img src={logo} alt="logo" />
        </div>
        <div className="w-full">
          <input
            type="password"
            className={`w-full rounded-xl h-18 px-6 py-6 text-base 
            ${errors.password ? "ring-1 ring-hardRed" : ""} 
            outline-none focus:ring-1 focus:ring-accent1 bg-grey3`}
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
          {errors.password && <span className="mt-2 text-red-600">{errors.password.message}</span>}
        </div>
        <div className="w-full">
          <input
            type="password"
            className={`w-full rounded-xl h-18 px-6 py-6 text-base
            ${errors.passwordConfirm ? "ring-1 ring-hardRed" : ""}
            outline-none focus:ring-1 focus:ring-accent1 bg-grey3`}
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
          {errors.passwordConfirm && <span className="mt-2 text-red-600">{errors.passwordConfirm.message}</span>}
        </div>
        {apiErrors}
        {successMessage}
        <button disabled={status === "waiting"} className="flex gap-x-3 items-center justify-center mt-6 text-2xl w-full rounded-xl h-18 px-6 py-6 font-bold bg-accent1 hover:bg-lightAccent1">
          {status === "waiting" && <div className="spinner-border"></div>}
          Reset My Password
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
