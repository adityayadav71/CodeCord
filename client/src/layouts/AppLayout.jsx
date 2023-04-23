import { Outlet, useParams, useLocation } from "react-router-dom";
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
        country: user?.userData?.country,
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
  const location = useLocation();
  const { userData, socket } = useContext(AuthContext);

  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("room")) {
      const roomId = JSON.parse(localStorage.getItem("room"))?.roomId;
      const loadData = async () => {
        if (roomId) {
          const room = await getRoomData(roomId);

          // If roomData is not undefined
          if (room) {
            const populatedRoom = await populateParticipants(room, userData);

            // 3. Update roomData state value with participants, ownerUsername and iAmHost fields
            setRoomData(populatedRoom);
          }
        }
      };
      loadData();
    }

    socket?.on("updated-room-data", async (data) => {
      data = await populateParticipants(data, userData);
      // 2. Check if user is the host and assign iAmHost field value
      let iAmHost = false;
      const userId = userData?.user?._id;
      if (userId === data?.owner) iAmHost = true;

      setRoomData({ ...data, iAmHost });
      localStorage.setItem("room", JSON.stringify({ ...data, iAmHost }));
    });
  }, [location, socket]);

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
