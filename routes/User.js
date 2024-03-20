import express from "express";
import { createUser, getUserData } from "../controllers/User.js";

const router = express.Router();

// CREATE OR REGISTER
router.post("/create", createUser);
//GET
router.get("/get/:id", getUserData);

export default router;
