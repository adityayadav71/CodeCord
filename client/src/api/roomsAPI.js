import axios from "axios";
import { BASE_URL } from "./apiConfig";

export const getRoomSettings = async (roomId) => {
  const response = await axios.get("/api/v1/rooms/", {
    roomId,
  });
  return response.data.settings;
};

export const updateRoomSettings = async (roomId, settings) => {
  const response = await axios.patch("/api/v1/rooms/", {
    roomId,
    settings,
  });
  return response;
};

export const getRoomData = async (roomId) => {
  const response = await axios.get(`/api/v1/rooms/${roomId}`);
  return response.data.room;
};

export const startRoom = async (roomId, socket) => {
  try {
    const response = await axios.post(`/api/v1/rooms/start/`, {
      roomId,
    });
    if (response.status === 200) socket.emit("start-room", response.data.room);
    return response.data.room;
  } catch (err) {
    return err;
  }
};

export const joinRoom = async (userData, socket, roomId) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/rooms/join`, {
      roomId,
    });
    if (response.status === 200) {
      // emit the create-room event
      socket.emit(
        "join-room",
        userData,
        response.data.room,
        roomId,
        false
      );

      return new Promise((resolve, reject) => {
        // listen for the room-created event
        socket.on("room-joined", (id) => {
          resolve({ roomData: response.data.room });
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

export const createRoom = async (socket, roomId) => {
  try {
    // Create room in database
    const response = await axios.post(`${BASE_URL}/api/v1/rooms`, {
      roomId,
    });

    // emit the create-room event
    socket.emit("create-room", roomId);

    return new Promise((resolve, reject) => {
      // listen for the room-created event
      socket.on("room-created", (id) => {
        resolve({ id });
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

export const leaveRoom = async (username, roomId, socket) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/v1/rooms/leave`, {
      roomId,
    });
    socket.emit("leave-room", username, response.data.newRoom, roomId);
  } catch (error) {
    console.log(error);
  }
};
