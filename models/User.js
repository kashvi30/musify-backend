import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userID:{
        type:String
    },
    name: {
      type: String,
      required: true,
    },
    playlist:[{
        type:String,
    }],
    songsAdded: [{
        type:String,
    }]
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);