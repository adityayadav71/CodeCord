import axios from "axios";
import { BASE_URL } from "./apiConfig";
import { io } from "socket.io-client";

export const updateRoomSettings = async (roomId, settings) => {
  const response = await axios.patch("/api/v1/rooms/", {
    roomId,
    settings,
  });
  return response;
};

export const joinRoom = async (username, userId, roomId) => {
  try {
    let socket = {};
    const response = await axios.post(`${BASE_URL}/api/v1/rooms/join`, {
      userId,
      roomId,
    });
    if (response.status === 200) {
      // Establish socket connection with the server
      socket = io("http://localhost:5000", {
        path: "/api/v1/socket.io",
      });

      // emit the create-room event
      socket.emit("join-room", username, userId, roomId);

      return new Promise((resolve, reject) => {
        // listen for the room-created event
        socket.on("room-joined", (id) => {
          resolve({ socket, id });
        });

        // listen for any errors
        socket.on("error", (error) => {
          reject(error);
        });
      });
    }
  } catch (err) {
    return err;
  }
};

export const createRoom = async (userId, roomId) => {
  try {
    let socket = {};
    // Create room in database
    await axios.post(`${BASE_URL}/api/v1/rooms`, {
      userId,
      roomId,
    });

    // Establish socket connection with the server
    socket = io("http://localhost:5000", {
      path: "/api/v1/socket.io",
    });

    // emit the create-room event
    socket.emit("create-room", roomId);

    return new Promise((resolve, reject) => {
      // listen for the room-created event
      socket.on("room-created", (id) => {
        resolve({ socket, id });
      });

      // listen for any errors
      socket.on("error", (error) => {
        reject(error);
      });
    });
  } catch (err) {
    return err;
  }
};
