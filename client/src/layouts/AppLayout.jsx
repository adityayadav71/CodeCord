import { createContext, React, useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import Copyright from "../utilities/Copyright";

export const UserContext = createContext();

const AppLayout = (props) => {
  return (
    <UserContext.Provider value={false}>
      <div className="flex flex-col h-full grow">
        <Navbar />
        <Outlet />
        <Copyright />
      </div>
    </UserContext.Provider>
  );
};

export default AppLayout;
