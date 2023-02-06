import { Outlet } from "react-router-dom";
import Navbar from "../components/LandingPage/Navbar";
import Copyright from "../utilities/Copyright";

const LandingLayout = (props) => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Copyright />
    </>
  );
};

export default LandingLayout;
