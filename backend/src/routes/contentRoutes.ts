import express from "express"
import { isAuth } from "../middlewares/isAuth"
import { addContent, deleteContent, getAllContent } from "../controllers/contentControllers"
const router=express.Router()
router.post("/add",isAuth,addContent)
router.get("/all",isAuth,getAllContent)
router.delete("/delete/:id",isAuth,deleteContent)
export default router