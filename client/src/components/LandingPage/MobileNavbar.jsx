import { Link } from "react-router-dom";
import logo from "/svg/logo.svg";
import { FaChevronRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef } from "react";

const MobileNavbar = ({ isMobileNavbarOpen, handleClick }) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  let navbarClasses = `fixed flex flex-col gap-12 left-0 top-0 py-11 px-9 w-full bg-primary z-10 h-full`;

  if (isFirstRender.current) {
    navbarClasses += " hidden";
  } else {
    navbarClasses += isMobileNavbarOpen ? " shadow-heavyDropDown animate-openMobileNavbar" : " animate-closeMobileNavbar";
  }

  return (
    <nav className={navbarClasses}>
      <div className="flex items-center w-full">
        <img className="sm:hidden w-60 ml-0" src={logo} alt="codecord_logo" />
        <IoClose className="ml-auto text-4xl" onClick={handleClick} />
      </div>
      <ul className="text-2xl leading-10">
        <li className="mb-6">
          <Link to="/app/problem" className="hover:text-accent1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <p>Problems</p>
              <FaChevronRight />
            </div>
          </Link>
        </li>
        <li className="mb-6">
          <Link to="/app/rooms" className="hover:text-accent1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <p>Rooms</p>
              <FaChevronRight />
            </div>
          </Link>
        </li>
        <li className="mb-6">
          <Link to="/app/contest" className="hover:text-accent1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <p>Contests</p>
              <FaChevronRight />
            </div>
          </Link>
        </li>
        <li className="mb-6">
          <input
            className="p-4 text-lg w-full bg-secondary text-white hover:shadow-lg transition-shadow duration-300 hover:shadow-sky-900 focus:outline focus:outline-2 focus:outline-accent1 rounded-full"
            type="text"
            name="search"
            id="search"
            placeholder="Search problems, contests, users..."
          />
        </li>
      </ul>
      <div className="flex items-center justify-center gap-3">
        <Link
          to="/app/auth/login"
          className="p-4 w-full sm:block text-2xl transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-110 active:scale-100 border border-white text-white text-center font-bold rounded-xl hover:shadow-signUp hover:shadow"
        >
          Login
        </Link>
        <Link
          to="/app/auth/signup"
          className="p-4 w-full sm:block text-2xl transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-110 active:scale-100 bg-accent1 text-white text-center font-bold rounded-xl hover:shadow-signUp hover:shadow"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavbar;
