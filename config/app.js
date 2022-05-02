const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Routes = require("../routes/leaveRoute");
const userRoute = require("../routes/userRoute");
const res = require("express/lib/response");
const req = require("express/lib/request");
require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () =>
    //connected to database
    {
      console.log("DataBase Connected Successfully");
    }
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", Routes, userRoute);
//console.log(req)
//mongoose.set('useCreateIndex', true);
app.listen(process.env.PORT, () =>
  //Listening Server
  {
    console.log("Server started at", process.env.PORT);
  }
);
