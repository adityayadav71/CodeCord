import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/LandingPage/Navbar";
import Copyright from "../utilities/Copyright";

const LandingLayout = (props) => {
  return (
    <div className="relative h-screen w-full overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Copyright />
    </div>
  );
};

export default LandingLayout;
