const mongoose = require("mongoose");
const dotenv = require("dotenv");

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

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", (inviteCode, username, cb) => {
    socket.join(inviteCode);

    cb();
    const roomMessage = {
      type: "roomMessage",
      message: `${username} joined the room`,
    }
    socket.to(inviteCode).emit("receive-message", roomMessage);
  });
  socket.on("create-room", (cb) => {
    socket.join(socket.id);
    cb(socket.id);
  })
  socket.on("send-message", (data) => {
    socket.broadcast.emit("receive-message", data);
  });
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
