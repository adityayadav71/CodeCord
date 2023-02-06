import TextInput from "./TextInput";
import logo from "../../assets/svg/logo.svg";
import { Link } from "react-router-dom";

const Form = ({ type, fields, buttonName }) => {
  const inputFields = fields.map((field) => {
    return <TextInput placeholder={`${field}`}></TextInput>;
  });
  function renderSwitch(type) {
    switch (type) {
      case "Sign Up": {
        return (
          <div className="flex flex-row items-center justify-center gap-x-3">
            <p className="text-white text-lg">Have an Account?</p>
            <Link className="text-grey1 text-base" to="/app/auth/login">
              Login
            </Link>
          </div>
        );
      }
      case "Sign In": {
        return (
          <div className="flex flex-row w-full items-center justify-between">
            <Link className="text-grey1 text-lg" to="/app/auth/reset/request">
              Forgot Password?
            </Link>
            <Link className="text-grey1 text-base" to="/app/auth/signup">
              Sign up
            </Link>
          </div>
        );
      }
      case "Password Reset Request": {
        return (
          <div className="flex flex-row w-full items-center justify-between">
            <p className="text-grey1 text-sm">We will send a password reset link to this email address</p>
            <Link className="text-grey1 text-base" to="/app/auth/login">
              Login
            </Link>
          </div>
        );
      }
    }
  }
  return (
    <div className="flex flex-row items-center grow w-full py-9 px-9">
      <form className="flex flex-col w-[400px] max-w-7xl mx-auto items-center justify-center px-5 py-12 gap-y-6 text-white bg-secondary rounded-xl">
        <img className="mb-12" src={logo} alt="logo" />
        {inputFields}
        <button className="flex items-center justify-center mt-12 text-2xl w-full rounded-xl h-18 px-6 py-6 font-bold bg-accent1">{buttonName}</button>
        {renderSwitch(type)}
      </form>
    </div>
  );
};

export default Form;
