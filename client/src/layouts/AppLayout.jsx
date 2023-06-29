import { Outlet, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import Copyright from "../utilities/Copyright";
import { createContext, useContext, useEffect, useState } from "react";
import { getRoomData } from "../api/roomsAPI";
import { AuthContext } from "../App";
import { toast } from "react-hot-toast";

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
        room = await getRoomData(room.roomId);
        socket.emit("join-room", userData, room, true);
        // If roomData is not undefined
        room && setRoomData(room);
      }
    };
    room && loadData();
    socket?.on("updated-room-data", async (data) => {
      setRoomData(data);
    });

    socket?.on("room-ended", () => {
      toast(
        (t) => (
          <div className="flex items-center text-lg">
            <span className="mr-3 font-semibold">
              🛑 The <b>room was ended</b> by the host.
            </span>
            <button
              className="px-3 py-1 text-md rounded-lg bg-gray-300 border"
              onClick={() => toast.dismiss(t.id)}
            >
              Dismiss
            </button>
          </div>
        ),
        { duration: Infinity }
      );
      setRoomData(null);
      navigate("/", { replace: true });
    });
  }, [userData, socket]);

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
