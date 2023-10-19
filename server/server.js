const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const dotenv = require('dotenv').config();
const contactRoute = require("./routes/api/contact");
const userRoute = require("./routes/api/user")
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors())

mongoose.set('strictQuery', true)
mongoose.connect(process.env.Cluster)
  .then(() => { console.log("mongodb is connected now") })
  .catch((err) => console.log(err))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(session({
  secret: process.env.SessionSecretKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
      secure: false, // Set to true if you use HTTPS
      maxAge: 1000 * 60 * 60 * 24, // Session expiration time (e.g., 24 hours)
  }
}))

app.use("/api/contact", contactRoute);
app.use("/api/user", userRoute);

app.listen(process.env.PORT,
  () => console.log(`Server started on port ${process.env.PORT}`)
);
