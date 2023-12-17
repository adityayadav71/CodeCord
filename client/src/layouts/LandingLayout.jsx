import { Outlet } from "react-router-dom";
import Navbar from "../components/LandingPage/Navbar";
import MobileNavbar from "../components/LandingPage/MobileNavbar";
import Copyright from "../utilities/Copyright";
import { useState, createContext } from "react";

export const MobileContext = createContext(null);

const LandingLayout = (props) => {
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const handleClick = () => {
    setIsMobileNavbarOpen((prev) => !prev);
  };

  return (
    <MobileContext.Provider value={{ isMobileNavbarOpen, handleClick }}>
      <Navbar />
      <MobileNavbar />
      <Outlet />
      <Copyright />
    </MobileContext.Provider>
  );
};

export default LandingLayout;
