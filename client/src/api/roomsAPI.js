import axios from "axios";
import { BASE_URL } from "./apiConfig";
import { io } from "socket.io-client";

export const createRoom = async (userId) => {
  // Establish socket connection with the server
  const socket = io("http://localhost:5000", {
    path: "/api/v1/socket.io",
  });
  // emit the create-room event
  socket.emit("create-room", userId);

  // Create room in database
  await axios.post(`${BASE_URL}/api/v1/rooms`, JSON.stringify(userId));

  return new Promise((resolve, reject) => {
    // listen for the room-created event
    socket.on("room-created", (id) => {
      console.log("Room created with id:", id);
      socket.disconnect(); // disconnect from the server after the room is created
      resolve(id);
    });

    // listen for any errors
    socket.on("error", (error) => {
      console.error(error);
      reject(error);
    });
  });
};
