import express, { NextFunction, Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel";
const userBody = z.object({
  username: z.string().min(3).max(32),
  password: z.string(),
});
export const signUpuser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const parsedData = userBody.safeParse(req.body);
    if (!parsedData.success) res.status(400).json(parsedData.error);
    const user = await userModel.findOne({ username });
    if (user) res.status(400).json({ message: "Username Already Exists" });
    const hashedPass = await bcrypt.hash(password, 10);
    await userModel.create({
      username,
      password: hashedPass,
    });
    res.status(201).json({ message: "User Signed Up" });
  } catch (error) { res.status(500).json(error);
  }
};
