import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "/svg/logo.svg";
import { Link } from "react-router-dom";
import FormErrors from "./FormErrors";
import { AuthContext } from "../../App";
import { login, checkLogInStatus } from "../../api/authDataAPI";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { SOCKET_URL } from "../../api/apiConfig";

const Login = (props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [apiErrors, setAPIErrors] = useState();
  const [status, setStatus] = useState();
  const { setIsLoggedIn, setUserData, setSocket } = useContext(AuthContext);

  const onSubmit = async (formData) => {
    setStatus("waiting");
    try {
      await login(formData);
      const status = await checkLogInStatus();
      setIsLoggedIn(status.isLoggedIn);
      setUserData(status.userData);
      const socket = io(SOCKET_URL, {
        path: "/api/v1/socket.io",
      });
      setSocket(socket);
      navigate("/", { replace: true });
      toast.success("Logged in successfully!", {
        duration: 2000,
      });
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
        <div className="w-full">
          <input
            type="text"
            className={`w-full rounded-xl h-18 p-6 text-base 
            ${errors.username ? "ring-1 ring-hardRed" : ""} 
            outline-none focus:ring-1 focus:ring-accent1 bg-grey3 relative`}
            name="emailOrUsername"
            placeholder="Username or Email"
            {...register("emailOrUsername", {
              required: "Please provide a username or email.",
            })}
          ></input>
          {errors.emailOrUsername && <span className="mt-2 text-red-600">{errors.emailOrUsername.message}</span>}
        </div>
        <div className="w-full">
          <input
            type="password"
            className={`w-full rounded-xl h-18 p-6 text-base 
            ${errors.password ? "ring-1 ring-hardRed" : ""} 
            outline-none focus:ring-1 focus:ring-accent1 bg-grey3`}
            name="password"
            placeholder="Password"
            {...register("password", {
              required: "Please provide a password.",
            })}
          ></input>
          {errors.password && <span className="mt-2 text-red-600">{errors.password.message}</span>}
        </div>
        {apiErrors}
        <button disabled={status === "waiting"} className="flex gap-x-3 items-center justify-center mt-6 text-2xl w-full rounded-xl h-18 px-6 py-6 font-bold bg-accent1 hover:bg-lightAccent1">
          {status === "waiting" && <div className="spinner-border"></div>}
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
