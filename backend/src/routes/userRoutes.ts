import express from "express";
import { siginInuser, signUpuser } from "../controllers/userControllers";

const router = express.Router();
router.post("/signup",signUpuser);
router.post("/signin",siginInuser);
export default router;
