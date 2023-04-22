import { Outlet, useParams } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import Copyright from "../utilities/Copyright";
import { createContext, useContext, useEffect, useState } from "react";
import { getRoomData } from "../api/roomsAPI";
import { getUserData } from "../api/profileDataAPI";
import { AuthContext } from "../App";

export const RoomContext = createContext(null);

const AppLayout = ({ handleLogout }) => {
  const params = useParams();
  const { userData } = useContext(AuthContext);

  const [socket, setSocket] = useState(null);
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("room")) {
      const roomId = JSON.parse(localStorage.getItem("room")).roomId;
      const loadData = async () => {
        if (roomId) {
          const room = await getRoomData(roomId);
          setRoomData(room);
        }
      };
      loadData();
    }

    const fetchData = async () => {
      let ownerUsername = "";

      // If roomData is not undefined
      if (roomData) {
        // 1. Populate Participants array
        const data = await Promise?.all(
          roomData?.participants?.map(async (id) => {
            const user = await getUserData(id);
            if (id === roomData?.owner) {
              ownerUsername = user?.userData?.username;
            }
            return {
              country: user?.userData?.country,
              username: user?.userData?.username,
              avatar: `data:${user.userData?.avatar?.contentType};base64,${user.userData?.avatar?.image}`,
            };
          })
        );

        // 2. Check if user is the host and assign iAmHost field value
        let iAmHost = false;
        const userId = userData.user._id;
        if (userId === roomData?.owner) {
          iAmHost = true;
        }

        // 3. Update roomData state value with participants, ownerUsername and iAmHost fields
        setRoomData((prevData) => {
          return {
            ...prevData,
            participants: data,
            iAmHost,
            ownerUsername,
          };
        });
      }
    };
    fetchData();
    socket?.on("updated-room-data", (data) => {
      setRoomData(data);
    });
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
