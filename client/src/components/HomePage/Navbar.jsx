import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaBars,
  FaMagnifyingGlass,
  FaGear,
  FaUserLarge,
  FaPlus,
} from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AuthContext } from "../../App";
import CreateRoom from "../Rooms/CreateRoom";
import { nanoid } from "nanoid";
import { toast } from "react-hot-toast";
import Skeleton from "../skeletons/NavbarProfileSkeleton";
import favicon from "/svg/favicon.svg";
import { MobileContext } from "../../layouts/AppLayout";
import MobileSettings from "./MobileSettings";

const HomeNavbar = ({ handleLogout }) => {
  const { isLoggedIn, isLoading, userData } = useContext(AuthContext);
  const { handleClick, handleSettingsClick } = useContext(MobileContext);

  const isActive = (pathname, to) => pathname.startsWith(to);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState();
  const [profileActive, setProfileActive] = useState(false);
  const [searchbarActive, setSearchbarActive] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const openRoomModal = async () => {
    setModalOpen(false);
    const roomID = nanoid();
    try {
      setRoomId(roomID);
      setModalOpen(true);
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  const goToActiveRoom = () => {
    if (userData?.activeRoom) {
      navigate(`/app/room/${userData?.activeRoom?.roomId}`, {
        replace: false,
      });
    } else {
      toast.error(
        "User has not joined any room! Please try reloading the page."
      );
    }
  };

  const closeRoomModal = (event) => {
    if (
      event.target.classList.contains("modal-close-btn") ||
      (!event.target.closest(".modal") &&
        !event.target.classList.contains("open-modal") &&
        !event.target.closest(".profile") &&
        !event.target.closest(".searchbar"))
    ) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setModalOpen(false);
      }, 300);
      setProfileActive(false);
      setSearchbarActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeRoomModal);
    return () => {
      document.removeEventListener("click", closeRoomModal);
    };
  }, []);

  useEffect(() => {
    const imgURL =
      userData?.profile?.avatar &&
      `data:${userData?.profile?.avatar?.contentType};base64,${userData?.profile?.avatar?.image}`;
    setImageURL(imgURL);
  }, [userData]);

  return (
    <div className="flex flex-row sm:justify-start justify-between sm:p-0 py-3 px-6 border-b max-w-[2560px] border-b-accent2 w-full">
      <div className="flex sm:items-stretch items-center gap-3">
        <FaBars
          className="sm:hidden text-5xl p-3 rounded-lg border border-grey3"
          onClick={handleClick}
        />
        <Link to="/">
          <img
            className="p-3 w-18 hover:cursor-pointer"
            src={favicon}
            alt="logo"
          />
        </Link>
      </div>

      <ul className="sm:flex flex-row hidden">
        <li className="flex">
          <NavLink
            to="/app/contest"
            className={`box-border p-4 text-lg cursor-pointer hover:bg-accent2 transition duration-300 ${
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
            className={`box-border p-4 text-lg cursor-pointer hover:bg-accent2 transition duration-300 ${
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
            to="/app/rooms"
            className={`box-border p-4 text-lg cursor-pointer hover:bg-accent2 transition duration-300 ${
              isActive(pathname, "/app/rooms")
                ? "border-b-2 border-b-accent1"
                : ""
            }`}
          >
            Rooms
          </NavLink>
        </li>
      </ul>
      <div className="sm:flex flex-row items-center gap-x-6 ml-auto mr-3 hidden">
        <div
          className={
            "searchbar hidden relative lg:flex flex-row items-center right-3"
          }
        >
          <FaMagnifyingGlass
            className={`absolute ${
              searchbarActive ? "left-4" : "text-2xl translate-x-64"
            } hover:cursor-pointer transition-all duration-300`}
            onClick={() => setSearchbarActive((prev) => !prev)}
          />
          <input
            className={`h-full ${
              searchbarActive ? "scale-x-1 opacity-1" : "scale-x-0 opacity-0"
            } origin-right pl-12 pr-4 py-3 focus:outline  focus:outline-accent1  bg-secondary rounded-xl transition-all duration-300`}
            type="text"
            placeholder="Search problems, contests, users..."
          />
        </div>
        {isLoggedIn ? (
          <>
            {userData?.activeRoom ? (
              <button
                className="open-modal p-3 hover:cursor-pointer hover:shadow-lg transition duration-300 hover:shadow-sky-900 bg-accent1 hover:bg-lightAccent1 text-white text-base font-bold rounded-lg"
                onClick={goToActiveRoom}
              >
                Go to active Room
              </button>
            ) : (
              <button
                className="open-modal p-3 hover:cursor-pointer hover:shadow-lg transition duration-300 hover:shadow-sky-900 bg-accent1 hover:bg-lightAccent1 text-white text-base font-bold rounded-lg"
                onClick={openRoomModal}
              >
                Create/Join a Room
              </button>
            )}
            <FaBell className="text-2xl hover:cursor-pointer hover:text-accent1" />
            <div
              className="relative profile sm:block hidden"
              onClick={() => setProfileActive((prev) => !prev)}
            >
              <div className="w-11 h-11 overflow-clip flex flex-row items-center justify-center rounded-full bg-grey2">
                {isLoading ? (
                  <Skeleton />
                ) : userData?.profile?.avatar ? (
                  <img
                    src={imageURL}
                    className="w-full h-full object-cover hover:cursor-pointer"
                    alt="profile-pic"
                  />
                ) : (
                  <FaUserLarge className="text-2xl hover:cursor-pointer" />
                )}
              </div>
              <div
                className={`
                ${
                  profileActive
                    ? "opacity-1 z-20 top-14 translate-y-0"
                    : "opacity-0 z-0 -translate-y-2 top-20"
                }
                absolute right-0 mt-3 rounded-lg p-3 w-fit shadow shadow-dropDown bg-secondary transition duration-300`}
              >
                <ul className="flex flex-col gap-y-3">
                  <li onClick={() => setProfileActive((prev) => !prev)}>
                    <Link
                      to={`/app/user/${userData?.username}`}
                      className="flex flex-row items-center gap-x-3 px-3 py-1 hover:cursor-pointer hover:bg-accent3 rounded-lg"
                    >
                      <FaUserLarge />
                      Profile
                    </Link>
                  </li>
                  <li onClick={() => setProfileActive((prev) => !prev)}>
                    <Link
                      to="/app/settings"
                      className="flex flex-row items-center gap-x-3 px-3 py-1 hover:cursor-pointer hover:bg-accent3 rounded-lg"
                    >
                      <FaGear />
                      Settings
                    </Link>
                  </li>
                  <li
                    onClick={handleLogout}
                    className="hover:animate-spin flex flex-row items-center gap-x-3 px-3 py-1 hover:cursor-pointer hover:bg-accent3 rounded-lg"
                  >
                    <RiLogoutCircleRLine />
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
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
      {/* Changes for Mobile */}
      <div className="flex items-center gap-6">
        <FaMagnifyingGlass
          className="sm:hidden hover:cursor-pointer left-4 text-5xl p-3 rounded-lg border border-grey3"
          onClick={handleClick}
        />
        {isLoggedIn && (
          <>
            <FaPlus
              className="modal sm:hidden hover:cursor-pointer left-4 text-5xl p-3 rounded-lg border border-grey3"
              onClick={openRoomModal}
            />
            <div
              className="sm:hidden w-11 h-11 overflow-clip flex flex-row items-center justify-center rounded-full bg-grey2"
              onClick={handleSettingsClick}
            >
              {isLoading ? (
                <Skeleton />
              ) : userData?.profile?.avatar ? (
                <img
                  src={imageURL}
                  className="w-full h-full object-cover hover:cursor-pointer"
                  alt="profile-pic"
                />
              ) : (
                <FaUserLarge className="text-2xl hover:cursor-pointer" />
              )}
            </div>
            <MobileSettings
              imageURL={imageURL}
              openRoomModal={openRoomModal}
              goToActiveRoom={goToActiveRoom}
              handleLogout={handleLogout}
            />
          </>
        )}
      </div>
      {modalOpen && (
        <CreateRoom
          isContest={false}
          roomId={roomId}
          isClosing={isClosing}
          closeRoomModal={closeRoomModal}
          setModalOpen={setModalOpen}
          isLoading={false}
        />
      )}
    </div>
  );
};

export default HomeNavbar;
