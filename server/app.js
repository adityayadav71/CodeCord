const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const path = require("path");

require("./models/submissionModel");

const userRouter = require("./routes/userRouter");
const problemRouter = require("./routes/problemRouter");
const roomRouter = require("./routes/roomRouter");
const submissionRouter = require("./routes/submissionRouter");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
const io = require("./server");

const app = express();

app.enable("trust proxy");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 1 - Global Middlewares
// Set security HTTP headers
app.use(helmet());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS.split(","),
    credentials: true,
  })
);
app.options("*", cors());

if (process.env.NODE_ENV === "DEV") {
  app.use(morgan("dev"));
}

// Limit the number of requests to the API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. Please try again in an hour.",
});
if (process.env.NODE_ENV === "production") {
  app.use("/api", limiter);
}

// Body parser, for reading data from req.body
app.use(express.json({ limit: "10kb" }));

// Data Sanitization, against NoSQL query injection
app.use(mongoSanitize());

// Data Sanitization, against XSS
app.use(xss());

// Preventing parameter pollution
app.use(hpp());

// Cookie parser, for parsing cookies as objects
app.use(cookieParser());

// Serving Static files
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  req.io = io;
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/problems", problemRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/submissions", submissionRouter);

// 2 - Routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
