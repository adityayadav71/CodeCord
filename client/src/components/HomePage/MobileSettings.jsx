import { Link } from "react-router-dom";
import { FaCog, FaUserAlt } from "react-icons/fa";
import { FaDoorClosed, FaPlus, FaRightFromBracket } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import Skeleton from "../skeletons/NavbarProfileSkeleton";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useRef } from "react";
import { MobileContext } from "../../layouts/AppLayout";
import { AuthContext } from "../../App";

const MobileSettings = ({ imageURL, openRoomModal, goToActiveRoom, handleLogout }) => {
  const { isLoading, userData } = useContext(AuthContext);
  const { isMobileSettingsOpen, handleSettingsClick } = useContext(MobileContext);

  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  let navbarClasses = `fixed sm:hidden flex flex-col gap-12 right-0 top-0 py-3 px-6 w-4/5 rounded-l-2xl border-l border-grey3 bg-primary z-10 h-screen`;

  if (isFirstRender.current) {
    navbarClasses += " hidden";
  } else {
    navbarClasses += isMobileSettingsOpen ? " shadow-sidebar animate-openMobileNavbar" : " animate-closeMobileNavbar";
  }

  return (
    <nav className={navbarClasses}>
      <div className="flex items-center py-3 gap-3 w-full">
        <div className="sm:hidden w-12 h-12 overflow-clip flex flex-row items-center justify-center rounded-full bg-grey2" onClick={handleSettingsClick}>
          {isLoading ? (
            <Skeleton />
          ) : userData?.profile?.avatar ? (
            <img src={imageURL} className="w-full h-full object-cover hover:cursor-pointer" alt="profile-pic" />
          ) : (
            <FaUserLarge className="text-2xl hover:cursor-pointer" />
          )}
        </div>
        <div>
          <p className="font-bold text-2xl tracking-wide">{userData?.profile?.username}</p>
        </div>
        <IoClose className="ml-auto text-4xl" onClick={handleSettingsClick} />
      </div>
      <ul className="text-2xl leading-10">
        <li className="mb-6 rounded-lg px-3 hover:bg-accent3" onClick={handleSettingsClick}>
          <Link to="/app/user/profile" className="sm:hover:text-accent1 transition-all duration-300">
            <div className="flex items-center gap-3">
              <FaUserAlt />
              <p>Your Profile</p>
            </div>
          </Link>
        </li>
        <li className="mb-6 rounded-lg px-3 hover:bg-accent3" onClick={handleSettingsClick}>
          <Link to="/app/problem" className="sm:hover:text-accent1 transition-all duration-300">
            <div className="flex items-center gap-3">
              <FaCog />
              <p>Settings</p>
            </div>
          </Link>
        </li>
        <li className="mb-6 rounded-lg px-3 hover:bg-accent3" onClick={handleSettingsClick}>
          <Link to="/app/rooms" className="sm:hover:text-accent1 transition-all duration-300">
            <div className="flex items-center gap-3">
              <FaDoorClosed />
              <p>Rooms</p>
            </div>
          </Link>
        </li>
        <li onClick={handleLogout} className="mb-6 px-3 hover:animate-spin w-fit rounded-lg">
          <div className="flex items-center gap-3">
            <FaRightFromBracket />
            <p>Logout</p>
          </div>
        </li>
      </ul>

      {userData?.activeRoom ? (
        <button
          className="open-modal text-xl p-4 hover:cursor-pointer hover:shadow-lg transition duration-300 hover:shadow-sky-900 bg-accent1 hover:bg-lightAccent1 font-bold rounded-lg"
          onClick={() => {
            goToActiveRoom();
            handleSettingsClick();
          }}
        >
          Go to active Room
        </button>
      ) : (
        <button
          className="flex items-center justify-center gap-3 open-modal text-xl p-4 hover:cursor-pointer hover:shadow-lg transition duration-300 hover:shadow-sky-900 bg-accent1 hover:bg-lightAccent1 font-bold rounded-lg"
          onClick={openRoomModal}
        >
          <FaPlus className="text-xl" />
          Create/Join a Room
        </button>
      )}
    </nav>
  );
};

export default MobileSettings;
