import User from "../models/User.js";

//CREATE USER OR REGISTER
export const createUser = async (req, res) => {
  try {
    const newUser = new User({
      ...req.body,
    });
    await newUser.save();
    res
      .status(200)
      .send({ message: "USER_CREATED", data: newUser, status: true });
  } catch (error) {
    res.status(400).send({ status: false, error: error });
  }
};

// GET USER
export const getUserData = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findOne({ userID: userId });
    if (!user) {
      return res.status(200).json({ msg: "INVALID_EMAIL", status: false });
    } else {
      return res
        .status(200)
        .send({ msg: "USER_FOUND", data: user, status: true });
    }
  } catch (error) {
    res.status(400).send({ status: false, error: error });
  }
};

// //EDIT USER - IF TIME
// export const updateUser = async (req,res)=>{
//     try{

//         const updatedUser = await User.findOneAndUpdate(
//             { userID:req.params.id},
//             {$set: req.body})
//         res.status(200).send("USER UPDATED")
//     }catch(error){
//         res.status(400).send(error.message)
//     }
// }
