import { Outlet, useParams } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import Copyright from "../utilities/Copyright";
import { createContext, useState } from "react";

export const RoomContext = createContext(null);

const AppLayout = ({ handleLogout }) => {
  const params = useParams();

  const [socket, setSocket] = useState(null);

  return (
    <RoomContext.Provider value={{ socket, setSocket }}>
      <div className={`flex flex-col ${params?.name ? "h-screen" : "h-full"}`}>
        <Navbar handleLogout={handleLogout} />
        <Outlet />
        {!params?.name && <Copyright />}
      </div>
    </RoomContext.Provider>
  );
};

export default AppLayout;
