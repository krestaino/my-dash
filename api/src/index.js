require("dotenv").config();

const axios = require("axios");
const express = require("express");
const cors = require("cors");
const authenticate = require("./auth.js");

const port = process.env.API_PORT;

const app = express();

app.use(
  cors({
    origin: process.env.UI_ORIGIN,
    optionsSuccessStatus: 200
  })
);

require("./routes.js")(app, authenticate, axios);

app.listen(port, () => console.log("info: listening on port " + port));
