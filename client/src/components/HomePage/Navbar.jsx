import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBell, FaSearch, FaCog, FaUserAlt } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AuthContext } from "../../App";
import CreateRoom from "../Rooms/CreateRoom";

const HomeNavbar = ({ handleLogout }) => {
  const { isLoggedIn, userData } = useContext(AuthContext);
  const isActive = (pathname, to) => {
    return pathname.startsWith(to);
  };
  const { pathname } = useLocation();
  const [modal, setModal] = useState();
  const [imageURL, setImageURL] = useState();
  const [profileActive, setProfileActive] = useState(false);
  const [searchbarActive, setSearchbarActive] = useState(false);
  const openRoomModal = () => {
    // 1. Create Room in Database - Return RoomID
    const roomID = "jnsdo8hf"
    setModal(<CreateRoom isContest={false} inviteLink={roomID}/>);
  };
  useEffect(() => {
    const closeModal = (event) => {
      if (!event.target.closest(".modal") && !event.target.classList.contains("open-modal") && !event.target.closest(".profile") && !event.target.closest(".searchbar")) {
        setModal("");
        setProfileActive(false);
        setSearchbarActive(false);
      }
    };
    document.addEventListener("click", closeModal);
    return () => {
      document.removeEventListener("click", closeModal);
    };
  }, []);

  useEffect(() => {
    const imgURL = userData?.avatar && `data:${userData?.avatar?.contentType};base64,${userData?.avatar?.image}`;
    setImageURL(imgURL);
  }, [userData]);

  return (
    <div className="flex flex-row justify-start border-b max-w-[2560px] border-b-accent2 w-full">
      <Link to="/">
        <img className="p-3 hover:cursor-pointer" src="../../../favicon.svg" alt="logo" />
      </Link>

      <ul className="flex flex-row justify-center">
        <li className="flex">
          <NavLink
            to="/app/contest"
            className={`box-border p-4 align-middle text-lg cursor-pointer hover:bg-accent2 transition duration-300 ${isActive(pathname, "/app/contest") ? "border-b-2 border-b-accent1" : ""}`}
          >
            Contest
          </NavLink>
        </li>
        <li className="flex">
          <NavLink
            to="/app/problem"
            className={`box-border p-4 align-middle text-lg cursor-pointer hover:bg-accent2 transition duration-300 ${isActive(pathname, "/app/problem") ? "border-b-2 border-b-accent1" : ""}`}
          >
            Problems
          </NavLink>
        </li>
        <li className="flex">
          <NavLink
            to="/app/discussion"
            className={`box-border p-4 align-middle text-lg cursor-pointer hover:bg-accent2 transition duration-300 ${isActive(pathname, "/app/discussion") ? "border-b-2 border-b-accent1" : ""}`}
          >
            Discussions
          </NavLink>
        </li>
      </ul>
      <div className="flex flex-row items-center gap-x-6 ml-auto mr-3">
        {isLoggedIn ? (
          <>
            <div className={"searchbar relative flex flex-row items-center right-5"}>
              <FaSearch
                className={`absolute ${searchbarActive ? "" : "text-2xl translate-x-64"} hover:cursor-pointer left-2 transition-all duration-300`}
                onClick={() => setSearchbarActive((prev) => !prev)}
              />
              <input
                className={`h-full ${
                  searchbarActive ? "scale-x-1 opacity-1" : "scale-x-0 opacity-0"
                } origin-right p-3 pl-8 focus:outline-none focus:bg-grey3 bg-secondary rounded-full transition-all duration-300`}
                type="text"
                placeholder="Search problems, contests, users..."
              />
            </div>
            <button
              className="open-modal p-3 hover:cursor-pointer hover:shadow-lg transition-shadow duration-300 hover:shadow-sky-900 bg-accent1 text-white text-base font-bold rounded-xl"
              onClick={openRoomModal}
            >
              Create/Join a Room
            </button>
            <FaBell className="text-2xl hover:cursor-pointer" />
            <div className="relative profile">
              <div className="w-11 h-11 overflow-clip flex flex-row items-center justify-center rounded-full bg-grey2" onClick={() => setProfileActive((prev) => !prev)}>
                {userData?.avatar ? <img src={imageURL} className="w-full h-full hover:cursor-pointer" alt="profile-pic" /> : <FaUserAlt className="text-2xl hover:cursor-pointer" />}
              </div>
              <div
                className={`${
                  profileActive ? "opacity-1 z-20 top-16 translate-y-0" : "opacity-0 -z-50 -translate-y-2 top-20"
                } absolute top-full right-0 mt-3 rounded-lg p-3 w-fit shadow shadow-dropDown bg-secondary transition duration-300`}
              >
                <ul className="flex flex-col gap-y-3">
                  <li onClick={() => setProfileActive((prev) => !prev)}>
                    <Link to={`/app/user/${userData?.username}`} className="flex flex-row items-center gap-x-3 px-3 py-1 hover:cursor-pointer hover:bg-accent3 rounded-lg">
                      <FaUserAlt />
                      Profile
                    </Link>
                  </li>
                  <li onClick={() => setProfileActive((prev) => !prev)}>
                    <Link to="/app/settings" className="flex flex-row items-center gap-x-3 px-3 py-1 hover:cursor-pointer hover:bg-accent3 rounded-lg">
                      <FaCog />
                      Settings
                    </Link>
                  </li>
                  <li className="hover:animate-spin flex flex-row items-center gap-x-3 px-3 py-1 hover:cursor-pointer hover:bg-accent3 rounded-lg" onClick={handleLogout}>
                    <RiLogoutCircleRLine />
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={"searchbar relative flex flex-row items-center right-5"}>
              <FaSearch
                className={`absolute ${searchbarActive ? "" : "text-2xl translate-x-64"} hover:cursor-pointer left-2 transition-all duration-300`}
                onClick={() => setSearchbarActive((prev) => !prev)}
              />
              <input
                className={`h-full ${
                  searchbarActive ? "scale-x-1 opacity-1" : "scale-x-0 opacity-0"
                } origin-right p-3 pl-8 focus:outline-none focus:bg-grey3 bg-secondary rounded-full transition-all duration-300`}
                type="text"
                placeholder="Search problems, contests, users..."
              />
            </div>
            <Link
              to="/app/auth/login"
              className="p-3 w-36 text-xl transition-all ease-in-out duration-300 active:scale-90 hover:cursor-pointer border border-white text-white text-center font-bold rounded-xl hover:shadow-signUp hover:shadow"
            >
              Login
            </Link>
            <Link
              to="/app/auth/signup"
              className="p-3 w-36 text-xl transition-all ease-in-out duration-300 active:scale-90 hover:cursor-pointer bg-accent1 text-white text-center font-bold rounded-xl hover:shadow-signUp hover:shadow"
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
