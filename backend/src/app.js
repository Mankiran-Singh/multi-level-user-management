const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authRoutes = require("./modules/auth/auth.routes");
const adminRoutes = require("./modules/admin/admin.routes");
const userRoutes = require("./modules/users/user.routes");
const walletRoutes = require("./modules/wallet/wallet.routes");


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 5 * 60 * 1000 }
  })
);

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.originalUrl);
  next();
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);
app.use("/wallet", walletRoutes);

module.exports = app;
