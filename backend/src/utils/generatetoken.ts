import {  Response } from "express";
import jwt from "jsonwebtoken"
export async function genToken(id:string,res:Response)
{
    try {
        const token=jwt.sign({id:id},process.env.JWT_SEC)
        res.cookie("token",token,
            {
                maxAge:600000,
                sameSite:true
            })
    } catch (error) {
        res.status(500).json(error)
    }
}