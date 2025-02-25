import mongoose from "mongoose";
export const linkSchema=new mongoose.Schema(
    {
        hash:
        {
            type:String,
            required:true
        },
        userId:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    })
export const linkModel=mongoose.model("Link",linkSchema)