import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema(
  {
    PlaylistId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    songs: [
      {
        type: String,
      },
    ],
    isPublic: {
      type: Boolean,
    },
    creatorId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Playlist", PlaylistSchema);
