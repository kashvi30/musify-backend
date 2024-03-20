import Playlist from "../models/Playlist.js";
import User from "../models/User.js";

//CREATE PLAYLIST
export const createPlaylist = async (req, res) => {
  try {
    const newPlaylist = new Playlist({
      ...req.body,
    });
    await newPlaylist.save();
    const userUpdated = updateUser(
      newPlaylist.playlistId,
      newPlaylist.creatorId
    );
    if (userUpdated && newPlaylist) {
      res
        .status(200)
        .send({ message: "PLAYLIST_CREATED", data: newPlaylist, status: true });
    } else {
      res
        .status(200)
        .send({ message: "PLAYLIST_NOT_CREATED", data: null, status: false });
    }
  } catch (error) {
    res.status(400).send({ status: false, error: error });
  }
};

const updateUser = async (playlistId, creatorId) => {
  try {
    const otherUser = await User.findOne({ userID: creatorId });
    const updatedUser = await User.findOneAndUpdate(
      { userID: creatorId },
      { $set: { playlistsAdded: [...otherUser.playlistsAdded, playlistId] } }
    );
    return true;
  } catch (error) {
    return false;
  }
};

// GET PLAYLIST
export const getPlaylistData = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;

    const playlist = await Playlist.findOne({ playlistId: playlistId });
    if (!playlist) {
      return res.status(200).json({ msg: "INVALID_ID", status: false });
    } else {
      return res
        .status(200)
        .send({ msg: "PLAYLIST_FOUND", data: playlist, status: true });
    }
  } catch (error) {
    res.status(400).send({ status: false, error: error });
  }
};

//ADD MUSIC TO PLAYLIST
export const addMusicToPlaylist = async (req, res) => {
  try {
    const otherPlaylist = await Playlist.findOne({
      PlaylistId: req.params.playlistId,
    });
    const updatedPlaylist = await Playlist.findOneAndUpdate(
      { playlistId: req.params.PlaylistId },
      {
        $set: {
          songs: [...otherPlaylist.songs, req.body.musicId],
        },
      }
    );
    res
      .status(200)
      .send({ msg: "PLAYLIST_UPDATED", data: updatedPlaylist, status: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//REMOVE SONG FROM PLAYLIST
export const removeMusicFromPlaylist = async (req, res) => {
  try {
    const otherPlaylist = await Playlist.findOne({
      playlistId: req.params.playlistId,
    });
    const newSongs = new Promise(
      otherPlaylist.songs.filter((song) => song !== req.body.musicId)
    );

    const updatedPlaylist = await Playlist.findOneAndUpdate(
      { playlistId: req.params.playlistId },
      {
        $set: {
          songs: newSongs,
        },
      }
    );
    res
      .status(200)
      .send({ msg: "PLAYLIST_UPDATED", data: updatedPlaylist, status: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
