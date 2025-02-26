import { Request,Response,NextFunction } from "express";
import {z} from "zod"
import { contentModel } from "../models/contentModel";
import { userModel } from "../models/userModel";
const requiredBody=z.object(
    {
        title:z.string().min(3),
        type:z.enum(["image","Video","article","audio"]),
        link:z.string().url()
    })
export async function addContent(req:Request<z.infer<typeof requiredBody>>,res:Response)
{
    try {
        const parsedBody=requiredBody.safeParse(req.body)
        if(!parsedBody.success)
            {
                res.status(400).json(parsedBody.error)
                return
            }
        const {title,type,tags,link}=req.body
        await contentModel.create(
            {
                title,
                type,
                tags,
                link,
                authorId:req.userId
            })
        res.status(201).json({message:"Content Added"})
    } catch (error:any) {
        res.status(500).json(error.message)
    }
} 
export async function getAllContent(req:Request,res:Response)
{
    try {
        const userId=req.userId
        const user=await userModel.findById(userId)
        if(!user)
            {
                res.status(404).json({message:"User Not Found"})
                return
            }
        const content=await contentModel.find({authorId:userId})
        if(!content)
            {
                res.status(404).json({message:"No Content Found"})
                return
            }
        res.status(200).json(content)
        
    } catch (error:any) {
        res.status(500).json(error.message)
    }
}
export async function deleteContent(req:Request,res:Response)
{
    try {
        const contentId=req.params.id
        const userId=req.userId
        const content=await contentModel.findOneAndDelete({_id:contentId,authorId:userId})
        if(!content) {res.status(403).json({message:"You dont own the content"})}
        res.status(200).json({message:"Content Deleted"})
    } catch (error:any) {
        res.status(500).json(error.message)
    }
}