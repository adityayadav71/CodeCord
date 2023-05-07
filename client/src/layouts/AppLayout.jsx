import { Outlet, useParams } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import Copyright from "../utilities/Copyright";
import { createContext, useContext, useEffect, useState } from "react";
import { getRoomData } from "../api/roomsAPI";
import { getUserData } from "../api/profileDataAPI";
import { AuthContext } from "../App";

export const RoomContext = createContext(null);

export const populateParticipants = async (room, userData) => {
  let ownerUsername = "";
  // 1. Populate Participants array
  const participants = await Promise?.all(
    room?.participants?.map(async (id) => {
      const user = await getUserData(id);
      if (id === room?.owner) {
        ownerUsername = user?.userData?.username;
      }
      return {
        userId: user?.userData?.user,
        username: user?.userData?.username,
        avatar: `data:${user.userData?.avatar?.contentType};base64,${user.userData?.avatar?.image}`,
      };
    })
  );

  // 2. Check if user is the host and assign iAmHost field value
  let iAmHost = false;
  const userId = userData?.user?._id;
  if (userId === room.owner) {
    iAmHost = true;
  }

  return {
    ...room,
    participants,
    ownerUsername,
    iAmHost,
  };
};

const AppLayout = ({ handleLogout }) => {
  const params = useParams();
  const { userData, socket } = useContext(AuthContext);
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    let room = userData?.user?.activeRoom;
    if (room) {
      const loadData = async () => {
        if (room?.roomId) {
          room = await getRoomData(room?.roomId);

          // If roomData is not undefined
          room && setRoomData(room);
        }
      };
      loadData();
    }
  }, [userData, socket]);

  socket?.on("updated-room-data", async (data) => {
    // 1. Check if user is the host and assign iAmHost field value
    let iAmHost = false;
    const userId = userData?.user?._id;
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
