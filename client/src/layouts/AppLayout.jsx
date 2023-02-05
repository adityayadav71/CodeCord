import { createContext, React, useContext } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import Copyright from "../utilities/Copyright";

export const UserContext = createContext();

const AppLayout = (props) => {
  const params = useParams();
  return (
    <UserContext.Provider value={true}>
      <div className={`flex flex-col ${params?.name ? "h-screen" : "h-full"}`}>
        <Navbar />
        <Outlet />
        {!params?.name && <Copyright />}
      </div>
    </UserContext.Provider>
  );
};

export default AppLayout;
