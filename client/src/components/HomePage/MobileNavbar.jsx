import { Link } from "react-router-dom";
import logo from "/svg/logo.svg";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { MobileContext } from "../../layouts/AppLayout";
import { AuthContext } from "../../App";

const MobileNavbar = ({ handleLogout }) => {
  const { isMobileNavbarOpen, handleClick } = useContext(MobileContext);
  const { isLoggedIn, isLoading, userData } = useContext(AuthContext);
  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    const imgURL = userData?.profile?.avatar && `data:${userData?.profile?.avatar?.contentType};base64,${userData?.profile?.avatar?.image}`;
    setImageURL(imgURL);
  }, [userData]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  let navbarClasses = `fixed sm:hidden flex flex-col gap-12 left-0 top-0 py-11 px-9 w-4/5 border-r border-grey3 rounded-r-xl bg-primary z-10 h-screen`;

  if (isFirstRender.current) {
    navbarClasses += " hidden";
  } else {
    navbarClasses += isMobileNavbarOpen ? " shadow-sidebar animate-openMobileHomeNavbar" : " animate-closeMobileHomeNavbar";
  }

  return (
    <nav className={navbarClasses}>
      <div className="flex items-center w-full">
        <img className="sm:hidden w-60 ml-0" src={logo} alt="codecord_logo" />
        <IoClose className="ml-auto text-4xl" onClick={handleClick} />
      </div>
      <ul className="text-2xl leading-10" onClick={handleClick}>
        <li className="mb-6">
          <Link to="/app/contest" className="hover:text-accent1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <p>Contests</p>
              <FaChevronRight />
            </div>
          </Link>
        </li>
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
      </ul>
      <div className="relative flex flex-row items-center gap-x-6 ml-auto w-full">
        <FaSearch className={`absolute hover:cursor-pointer left-4`} />
        <input
          className="pl-12 pr-4 py-4 w-full bg-secondary text-white hover:shadow-lg transition-shadow duration-300 hover:shadow-sky-900 focus:outline focus:outline-2 focus:outline-accent1 rounded-xl"
          type="text"
          name="search"
          id="search"
          placeholder="Search problems, contests, rooms..."
        />
      </div>

      {!isLoggedIn && (
        <div className="flex items-center justify-center gap-3">
          <Link
            onClick={handleClick}
            to="/app/auth/login"
            className="p-4 w-full sm:block text-2xl transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-110 active:scale-100 border border-white text-white text-center font-bold rounded-xl hover:shadow-signUp hover:shadow"
          >
            Login
          </Link>
          <Link
            onClick={handleClick}
            to="/app/auth/signup"
            className="p-4 w-full sm:block text-2xl transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-110 active:scale-100 bg-accent1 text-white text-center font-bold rounded-xl hover:shadow-signUp hover:shadow"
          >
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
