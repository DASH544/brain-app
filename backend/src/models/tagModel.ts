import mongoose from "mongoose";
export const tagSchema=new mongoose.Schema(
    {
        title:
        {
            type:String,
            required:true
        },
    })
export const tagModel=mongoose.model("Tag",tagSchema)