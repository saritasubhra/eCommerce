const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

dotenv.config();
const port = process.env.PORT || 3000;
const DB = process.env.DB_URL;
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log("ERROR", err));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use(cors(corsOptions));
app.use(helmet());
app.use("/api", limiter);
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`This route ${req.originalUrl} doesn't exist.`, 404));
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
