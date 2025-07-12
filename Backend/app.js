require("dotenv").config();
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
// const flash = require("connect-flash");
// const session = require("express-session");
const connectDB = require("./config/mongoosConnect");
const { PORT, SECRET_KEY } = require("./config/constentValues");
const { vendorRouter } = require("./routes/vendorRouter");
const { adminRouter } = require("./routes/adminRouter");
const { userRouter } = require("./routes/userRouter");

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(flash());
// app.use(
//   session({
//     secret: SECRET_KEY,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/vendor", vendorRouter);

app.listen(PORT, () => console.log(`Server is started on port : ${PORT}!`));
