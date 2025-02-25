import mongoose from "mongoose";

export const  contentSchema=new mongoose.Schema(
    {
        title:
        {
            type:String,
            required:true
        },
        type:
        {
            type:String,
            required:true,
            enum:["image","Video","article","audio"]
        },
        tags:
        {
            type:[{type:mongoose.Schema.Types.ObjectId,ref:"Tags"}]
        },
        link:
        {
            type:String,
            required:true
        }

    })
export const contentModel=mongoose.model("content",contentSchema)