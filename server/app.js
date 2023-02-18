const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path")

const userRouter = require("./routes/userRouter");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const cookieParser = require("cookie-parser");

const app = express();

app.enable('trust proxy')

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1 - Global Middlewares
app.use(cors({
  origin: "http://127.0.0.1:5173",
  credentials: true
}));
app.options("*", cors());

if (process.env.NODE_ENV === "DEV") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", userRouter);

// 2 - Routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
