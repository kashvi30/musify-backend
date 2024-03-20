import Music from "../models/Music.js";
import User from "../models/User.js";

//CREATE USER OR REGISTER
export const createMusic = async (req, res) => {
  try {
    const newMusic = new Music({
      ...req.body,
    });
    await newMusic.save();
    const userUpdated = updateUser(newMusic.musicId, newMusic.creatorId);
    if (userUpdated && newMusic) {
      res
        .status(200)
        .send({ message: "MUSIC_CREATED", data: newMusic, status: true });
    } else {
      res
        .status(200)
        .send({ message: "MUSIC_NOT_CREATED", data: null, status: false });
    }
  } catch (error) {
    res.status(400).send({ status: false, error: error });
  }
};

// Add Music to Creator
export const updateUser = async (musicId, creatorId) => {
  try {
    const otherUser = await User.findOne({ userID: creatorId });
    const updatedUser = await User.findOneAndUpdate(
      { userID: creatorId },
      { $set: { songsAdded: [...otherUser.songsAdded, musicId] } }
    );
    return true;
  } catch (error) {
    return false;
  }
};

// GET USER
export const getMusicData = async (req, res) => {
  try {
    const musicId = req.params.musicId;

    const music = await Music.findOne({ musicId: musicId });
    if (!music) {
      return res.status(200).json({ msg: "INVALID_REQ", status: false });
    } else {
      return res
        .status(200)
        .send({ msg: "MUSIC_FOUND", data: music, status: true });
    }
  } catch (error) {
    res.status(400).send({ status: false, error: error });
  }
};
