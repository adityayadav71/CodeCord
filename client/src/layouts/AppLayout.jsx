import { Outlet, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import MobileNavbar from "../components/HomePage/MobileNavbar";
import Copyright from "../utilities/Copyright";
import { createContext, useContext, useEffect, useState } from "react";
import { getRoomData } from "../api/roomsAPI";
import { AuthContext } from "../App";
import { toast } from "react-hot-toast";
import RoomNavbar from "../components/HomePage/RoomNavbar";

export const RoomContext = createContext(null);
export const MobileContext = createContext(null);

const AppLayout = ({ handleLogout, location = undefined }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { userData, socket } = useContext(AuthContext);
  const [roomData, setRoomData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  const isMobileScreen = window.innerWidth <= 640; 
  const handleClick = () => {
    setIsMobileNavbarOpen((prev) => !prev);
  };
  const handleSettingsClick = () => {
    setIsMobileSettingsOpen((prev) => !prev);
  };

  const isRoom = location?.pathname?.startsWith("/app/room") | false;

  useEffect(() => {
    let room = userData?.activeRoom;
    const loadData = async () => {
      setIsLoading(true);
      if (room?.roomId) {
        room = await getRoomData(room.roomId);
        socket.emit("join-room", userData, room, true);
        // If roomData is not undefined
        room && setRoomData(room);
      }
      setIsLoading(false);
    };
    room && loadData();

    socket?.on("updated-room-data", async (data) => {
      setRoomData(data);
    });

    socket?.on("room-ended", () => {
      toast(
        (t) => (
          <div className='flex items-center text-lg'>
            <span className='mr-3 font-semibold'>
              🛑 The <b>room was ended</b> by the host.
            </span>
            <button
              className='px-3 py-1 text-md rounded-lg bg-gray-300 border'
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
    <RoomContext.Provider value={{ roomData, setRoomData, isLoading }}>
      <MobileContext.Provider
        value={{
          isMobileNavbarOpen,
          handleClick,
          isMobileSettingsOpen,
          handleSettingsClick,
          mobileChatOpen
        }}
      >
        <div
          className={`flex flex-col ${
            !isMobileScreen ? "h-full" : ""
          }`}
        >
          {isRoom ? (
            <RoomNavbar isMobileScreen={isMobileScreen} />
          ) : (
            isMobileScreen ? 
              <MobileNavbar handleLogout={handleLogout} />
            : <Navbar handleLogout={handleLogout} />
          )}
          <Outlet />
          {!params?.name && <Copyright />}
        </div>
      </MobileContext.Provider>
    </RoomContext.Provider>
  );
};

export default AppLayout;
