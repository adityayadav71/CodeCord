import { Outlet, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import Copyright from "../utilities/Copyright";
import { createContext, useContext, useEffect, useState } from "react";
import { getRoomData } from "../api/roomsAPI";
import { AuthContext } from "../App";

export const RoomContext = createContext(null);

const AppLayout = ({ handleLogout }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { userData, socket } = useContext(AuthContext);
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    let room = userData?.activeRoom;
    const loadData = async () => {
      if (room?.roomId) {
        room = await getRoomData(room?.roomId);
        socket.emit("join-room", userData, room, true);
        // If roomData is not undefined
        room && setRoomData(room);
      }
    };
    room && loadData();
  }, [userData, socket]);

  socket?.on("updated-room-data", async (data) => {
    // 1. Check if user is the host and assign iAmHost field value
    let iAmHost = false;
    const userId = userData?._id;
    if (userId === data?.owner) iAmHost = true;

    setRoomData({ ...data, iAmHost });
  });

  socket?.on("room-ended", () => {
    navigate("/", { replace: true });
  });

  return (
    <RoomContext.Provider value={{ roomData, setRoomData }}>
      <div className={`flex flex-col ${params?.name ? "h-screen" : "h-full"}`}>
        <Navbar handleLogout={handleLogout} />
        <Outlet />
        {!params?.name && <Copyright />}
      </div>
    </RoomContext.Provider>
  );
};

export default AppLayout;
