import { createContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import Copyright from "../utilities/Copyright";
import { io } from "socket.io-client";

export const RoomContext = createContext(null);

const AppLayout = ({ handleLogout }) => {
  const params = useParams();
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    setConnection(socket);
  }, []);
  return (
    <RoomContext.Provider value={{ connection, setConnection }}>
      <div className={`flex flex-col ${params?.name ? "h-screen" : "h-full"}`}>
        <Navbar handleLogout={handleLogout} />
        <Outlet />
        {!params?.name && <Copyright />}
      </div>
    </RoomContext.Provider>
  );
};

export default AppLayout;
