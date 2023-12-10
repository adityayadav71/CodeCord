import logo from "/svg/logo.svg";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

const Navbar = (props) => {
  return (
    <nav className="flex flex-row items-center py-11 px-9 w-full" id="top">
      <img className="sm:w-80 w-60" src={logo} alt="codecord_logo" />
      <div className="flex flex-row items-center gap-x-6 ml-auto">
        <input
          className="px-4 py-3 lg:block lg:w-80 hidden bg-secondary text-white hover:shadow-lg transition-shadow duration-300 hover:shadow-sky-900 focus:outline focus:outline-2 focus:outline-accent1 rounded-full"
          type="text"
          name="search"
          id="search"
          placeholder="Search problems, contests, users..."
        />
        <IoMenu className="sm:hidden text-4xl" />
        <Link
          to="/app/auth/login"
          className="p-3 w-36 sm:block hidden text-xl transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-110 active:scale-100 border border-white text-white text-center font-bold rounded-xl hover:shadow-signUp hover:shadow"
        >
          Login
        </Link>
        <Link
          to="/app/auth/signup"
          className="p-3 w-36 sm:block hidden text-xl transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-110 active:scale-100 bg-accent1 text-white text-center font-bold rounded-xl hover:shadow-signUp hover:shadow"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
