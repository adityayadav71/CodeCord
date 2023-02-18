import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBell, FaSearch, FaUserAlt } from "react-icons/fa";
import { AuthContext } from "../../App";
import CreateRoom from "../Rooms/CreateRoom";

const HomeNavbar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const isActive = (pathname, to) => {
    return pathname.startsWith(to);
  };
  const { pathname } = useLocation();
  const [modal, setModal] = useState();
  const openRoomModal = () => {
    setModal(<CreateRoom isContest={false} />);
  };
  useEffect(() => {
    const closeModal = (event) => {
      if (
        !event.target.closest(".modal") &&
        !event.target.classList.contains("open-modal")
      ) {
        setModal("");
      }
    };
    document.addEventListener("click", closeModal);
    return () => {
      document.removeEventListener("click", closeModal);
    };
  }, []);
  return (
    <div className="flex flex-row justify-start border-b max-w-[2560px] border-b-accent2 w-full">
      <Link to="/">
        <img
          className="p-3 hover:cursor-pointer"
          src="../../../favicon.svg"
          alt="logo"
        />
      </Link>

      <ul className="flex flex-row justify-center">
        <li className="flex">
          <NavLink
            to="/app/contest"
            className={`box-border p-4 align-middle text-lg cursor-pointer hover:bg-accent2 transition duration-300 ${
              isActive(pathname, "/app/contest")
                ? "border-b-2 border-b-accent1"
                : ""
            }`}
          >
            Contest
          </NavLink>
        </li>
        <li className="flex">
          <NavLink
            to="/app/problem"
            className={`box-border p-4 align-middle text-lg cursor-pointer hover:bg-accent2 transition duration-300 ${
              isActive(pathname, "/app/problem")
                ? "border-b-2 border-b-accent1"
                : ""
            }`}
          >
            Problems
          </NavLink>
        </li>
        <li className="flex">
          <NavLink
            to="/app/discussion"
            className={`box-border p-4 align-middle text-lg cursor-pointer hover:bg-accent2 transition duration-300 ${
              isActive(pathname, "/app/discussion")
                ? "border-b-2 border-b-accent1"
                : ""
            }`}
          >
            Discussions
          </NavLink>
        </li>
      </ul>
      <div className="flex flex-row items-center gap-x-6 ml-auto">
        {isLoggedIn ? (
          <>
            <FaSearch className="text-2xl hover:cursor-pointer" />
            <button
              className="open-modal p-3 hover:cursor-pointer hover:shadow-lg transition-shadow duration-300 hover:shadow-sky-900 bg-accent1 text-white text-base font-bold rounded-xl"
              onClick={openRoomModal}
            >
              Create/Join a Room
            </button>
            <FaBell className="text-2xl hover:cursor-pointer" />
            <div className="w-11 h-11 flex flex-row items-center justify-center rounded-full bg-grey2">
              <FaUserAlt className="text-2xl hover:cursor-pointer" />
            </div>
          </>
        ) : (
          <>
            <FaSearch className="text-2xl hover:cursor-pointer" />
            <Link
              to="/app/auth/login"
              className="p-3 w-36 text-xl transition-all ease-in-out duration-300 hover:cursor-pointer border border-white text-white text-center font-bold rounded-xl hover:shadow-signUp hover:shadow"
            >
              Login
            </Link>
            <Link
              to="/app/auth/signup"
              className="p-3 w-36 text-xl transition-all ease-in-out duration-300 hover:cursor-pointer bg-accent1 text-white text-center font-bold rounded-xl hover:shadow-signUp hover:shadow"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
      {modal}
    </div>
  );
};

export default HomeNavbar;
