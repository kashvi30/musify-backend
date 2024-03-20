import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
// import dotenv from "dotenv";

import user from "./routes/User.js";
import music from "./routes/Music.js";
import playlist from "./routes/Playlist.js";

const app = express();
const PORT = process.env.PORT || 8000;

//FOR .ENV
//Used as we can't send direct json data to the server. so we need this middleware.
app.use(express.json());
dotenv.config();
//CORS
app.use(cors());

//MongoDB CONNECTION
const connect = async () => {
  try {
    await mongoose.connect(process.env.mongoDB);
    console.log("CONNECTED --- MongoDB");
  } catch (error) {
    console.log(error);
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("DISCONNECTED --- MongoDB");
  connect();
});

//
app.use("/api/user", user);
app.use("/api/music", music);
app.use("/api/playlist", playlist);

//BACKEND START
app.listen(PORT, () => {
  connect();
  console.log("CONNECTED --- BACKEND");
});
app.get("/", (req, res) => {
  res.send("CONNECTED TO BACKEND");
});
