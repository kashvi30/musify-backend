import mongoose from "mongoose";

const PlaylistSchema =new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    songs: [{
        type:String,
    }],
    isPublic :{
        type:Boolean
    }
  },
  { timestamps: true }
);

export default mongoose.model("Playlist", PlaylistSchema);