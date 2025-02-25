import express from "express";
import { signUpuser } from "../controllers/userControllers";

const router = express.Router();
router.post("/signup",signUpuser);
export default router;
