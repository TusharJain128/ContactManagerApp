const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const contactRoute = require("./routes/api/contact");
const userRoute = require("./routes/api/user")

const app = express();
app.use(express.json())
const cors = require('cors');
app.use(cors())
dotenv.config()

mongoose.set('strictQuery', true)
mongoose.connect(process.env.Cluster)
  .then(() => { console.log("mongodb is connected now") })
  .catch((err) => console.log(err))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api/contact", contactRoute);
app.use("/api/user", userRoute)

app.listen(process.env.PORT,
  () => console.log(`Server started on port ${process.env.PORT}`)
);
