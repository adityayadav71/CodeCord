const AppError = require("./../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  let key, value;
  if (err && err.keyValue) {
    key = Object.keys(err.keyValue)[0];
    value = err.keyValue[key];
  } else {
    key = errorMessage.split("index:")[1].split("dup key")[0].split("_")[0].trim();
    const valueMatch = errorMessage.match(/\{(.+?)\}/);
    if (valueMatch && valueMatch[1]) {
      const valuePart = valueMatch[1].split(":")[1].trim();
      try {
        value = JSON.parse(valuePart);
      } catch (e) {
        value = valuePart;
      }
    }
  }

  const message = `This ${key} already exists: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (err, req, res) => {
  console.error("ERROR 💥", err);
  
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  console.error("ERROR 💥", err);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "DEV") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "PROD") {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
