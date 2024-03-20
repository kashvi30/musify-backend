import express from "express";
import { createMusic, getMusicData } from "../controllers/Music.js";

const router = express.Router();

// CREATE
router.post("/create", createMusic);
//GET
router.get("/get/:id", getMusicData);

export default router;
