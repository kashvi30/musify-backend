import express from "express";
import {
  addMusicToPlaylist,
  createPlaylist,
  getPlaylistData,
  removeMusicFromPlaylist,
} from "../controllers/Playlist.js";

const router = express.Router();

// CREATE PLAYLIST
router.post("/create", createPlaylist);
// ADD MUSIC
router.put("/addMusic/:playlistId", addMusicToPlaylist);
//REMOVE MUSIC
router.put("/removeMusic/:playlistId", removeMusicFromPlaylist);
//GET PLAYLIST
router.get("/get/:playlistId", getPlaylistData);

export default router;
