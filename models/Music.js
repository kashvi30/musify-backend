import mongoose from "mongoose";

const MusicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    musicId:{
        type:String,
    },
    albumId : {
        type:String
    },
    creatorId : {
        type:String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Music", MusicSchema);