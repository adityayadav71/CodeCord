import axios from "axios";
import { BASE_URL } from "./apiConfig";

export const getRoomSettings = async (roomId) => {
  const response = await axios.get(`${BASE_URL}/rooms/`, {
    roomId,
  });
  return response.data.settings;
};

export const updateRoomSettings = async (roomId, settings, socket) => {
  try {
    const response = await axios.patch(`${BASE_URL}/rooms/`, {
      roomId,
      settings,
    });
    if (settings.visibility === "public") socket.emit("updated-public-room");

    return response.data.room;
  } catch (err) {
    return err;
  }
};

export const getRoomData = async (roomId) => {
  const response = await axios.get(`${BASE_URL}/rooms/${roomId}`);
  return response.data.room;
};

export const startRoom = async (roomId, socket) => {
  try {
    const response = await axios.post(`${BASE_URL}/rooms/start/`, {
      roomId,
    });
    if (response.status === 200) {
      socket.emit("start-room", response.data.room);
      if (response.data.room.settings.visibility === "public")
        socket.emit("updated-public-room");
    }
    return response.data.room;
  } catch (err) {
    return err;
  }
};

export const joinRoom = async (userData, socket, roomId) => {
  try {
    const response = await axios.post(`${BASE_URL}/rooms/join`, {
      roomId,
    });
    if (response.status === 200) {
      // emit the create-room event
      socket.emit(
        "join-room",
        userData,
        response.data.room,
        !!(response.data.room.settings.visibility === "public"),
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

export const createRoom = async (socket, roomId, settings) => {
  try {
    // Create room in database
    const response = await axios.post(`${BASE_URL}/rooms`, {
      roomId,
      settings,
    });

    // emit the create-room event
    socket.emit("create-room", roomId);

    if (settings.visibility === "public") socket.emit("created-public-room");

    await new Promise((resolve, reject) => {
      // listen for the room-created event
      socket.on("room-created", (id) => {
        resolve({ id });
      });

      // listen for any errors
      socket.on("error", (error) => {
        reject(error);
      });
    });
    return response?.data?.room;
  } catch (err) {
    return err;
  }
};

export const leaveRoom = async (username, roomId, socket) => {
  try {
    const response = await axios.patch(`${BASE_URL}/rooms/leave`, {
      roomId,
    });
    socket.emit(
      "leave-room",
      username,
      response.data.newRoom,
      !!(response.data.newRoom.settings.visibility === "public"),
      roomId
    );
  } catch (error) {
    console.log(error);
  }
};

export const endRoom = async (roomId, socket) => {
  try {
    const response = await axios.post(`${BASE_URL}/rooms/end`, {
      roomId,
    });
    socket.emit(
      "end-room",
      !!(response.data.room.settings.visibility === "public"),
      roomId
    );
  } catch (error) {
    console.log(error);
  }
};

export const removeParticipant = async (username, userId, roomId, socket) => {
  try {
    const response = await axios.post(`${BASE_URL}/rooms/remove`, {
      userId,
      roomId,
    });

    if (response.status === 200) {
      socket.emit(
        "remove-participant",
        username,
        userId,
        roomId,
        response.data.room
      );
      return response.data.room;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPublicRooms = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/rooms/live`);
    return response.status === 404 ? "No one is live" : response.data.rooms;
  } catch (error) {
    console.log(error);
  }
};
