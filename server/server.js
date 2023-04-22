const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { instrument } = require("@socket.io/admin-ui");

process.env.NODE_ENV = process.argv[2].split("=")[1];

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB =
  process.env.NODE_ENV === "DEV"
    ? process.env.DATABASE_DEV.replace(
        "<password>",
        process.env.DATABASE_DEV_PASSWORD
      )
    : process.env.DATABASE_PROD.replace(
        "<password>",
        process.env.DATABASE_PROD_PASSWORD
      );

mongoose.set("strictQuery", false);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    if (process.env.NODE_ENV === "DEV")
      console.log("DB connection successful! 🖥️");
  });

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  if (process.env.NODE_ENV === "DEV")
    console.log(`App running on port ${port} ✅`);
});

function serverTime() {
  const time =
    new Date(Date.now()).getHours().toString().padStart(2, "0") +
    ":" +
    new Date(Date.now()).getMinutes().toString().padStart(2, "0");
  return time;
}

const io = require("socket.io")(server, {
  path: "/api/v1/socket.io",
  cors: {
    origin: ["https://admin.socket.io", "http://localhost:5173", "https://codecord.vercel.app"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(" %s sockets connected", io.engine.clientsCount);

  socket.on("disconnect", () => {
    console.log("A client disconnected!!!");
  });

  socket.on("send-message", (data, roomId) => {
    socket.to(roomId).emit("receive-message", data);
  });

  // Handle Create-room event
  socket.on("create-room", (roomId) => {
    try {
      socket.join(roomId, () => {
        console.log("Created a new room successfully.");
      });
      socket.emit("room-created", roomId);
    } catch (err) {
      socket.emit("error", err);
    }
  });

  // Handle Join-room event
  socket.on("join-room", (userData, room, roomId, reloaded) => {
    try {
      socket.join(roomId, () => {
        console.log(
          `The user: ${userData?.userId} has joined the room successfully.`
        );
      });
      socket.emit("room-joined", roomId);
      socket.to(roomId).emit("updated-room-data", room);

      // If user has joined back don't broadcast message
      if (!reloaded) {
        const data = {
          type: "roomMessage",
          message: `${userData?.username} joined the room.`,
          timeStamp: serverTime(),
        };
        socket.to(roomId).emit("receive-message", data);
      }
    } catch (err) {
      socket.emit("error", err);
    }
  });

  // Handle Start-room event
  socket.on("start-room", (room) => {
    socket.to(room.roomId).emit("room-started", room);
  });

  //Handle Leave-room event
  socket.on("leave-room", (username, room, roomId) => {
    io.in(roomId).socketsLeave(roomId);
    socket.to(roomId).emit("updated-room-data", room);

    const data = {
      type: "roomMessage",
      message: `${username} left the room.`,
      timeStamp: serverTime(),
    };
    socket.to(roomId).emit("receive-message", data);
  });
});

instrument(io, {
  auth: false,
  mode: "development",
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
