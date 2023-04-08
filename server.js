require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const { appConfig } = require("./config/config");

const connectDatabase = require("./config/database");

const contactRoute = require("./routes/api/contact");
const userRoute = require("./routes/api/user")

const app = express();

// Connect to the database
connectDatabase();

// Init Middleware
app.use(express.json({ extended: false }));

const cors = require('cors')
app.use(cors())


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

app.use("/api/contact", contactRoute);
app.use("/api/user", userRoute)

const PORT = appConfig.port;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
