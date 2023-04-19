import { Outlet, useParams } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import Copyright from "../utilities/Copyright";
import { createContext, useEffect, useState } from "react";
import { getRoomData } from "../api/roomsAPI";

export const RoomContext = createContext(null);

const AppLayout = ({ handleLogout }) => {
  const params = useParams();

  const [socket, setSocket] = useState(null);
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    if(localStorage.getItem("room")) {
      const roomId = JSON.parse(localStorage.getItem("room")).roomId;
      const loadData = async () => {
        if (roomId) {
          const room = await getRoomData(roomId);
          setRoomData(room);
        }
      };
      loadData();
    }
    }, [socket]);

  return (
    <RoomContext.Provider value={{ socket, setSocket, roomData, setRoomData }}>
      <div className={`flex flex-col ${params?.name ? "h-screen" : "h-full"}`}>
        <Navbar handleLogout={handleLogout} />
        <Outlet />
        {!params?.name && <Copyright />}
      </div>
    </RoomContext.Provider>
  );
};

export default AppLayout;
