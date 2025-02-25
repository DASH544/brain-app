import express, { NextFunction, Request, response, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel";
import { genToken } from "../utils/generatetoken";
const userBody = z.object({
  username: z.string().min(3).max(32),
  password: z.string(),
});
export const signUpuser = async (
  req: Request<{}, {}, z.infer<typeof userBody>>,
  res: Response
) => {
  try {
    const parsedData = userBody.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json(parsedData.error);
      return;
    }
    const { username, password } = parsedData.data;
    const user = await userModel.findOne({ username });
    if (user) {
      res.status(400).json({ message: "Username Already Exists" });
      return;
    }
    const hashedPass = await bcrypt.hash(password, 10);
    await userModel.create({
      username,
      password: hashedPass,
    });
    res.status(201).json({ message: "User Signed Up" });
  } catch (error) {
    res.status(500).json(error);
  }
};
export async function siginInuser(req:Request<{}, {}, z.infer<typeof userBody>>, res: Response) {
  try {
    const parsedBody = userBody.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(400).json(parsedBody.error);
      return;
    }
    const { username, password } = parsedBody.data;
    const user = await userModel.findOne({ username });
    if (!user) {
      res.status(400).json({ message: "Incorrect Credentials" });
      return;
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      res.status(400).json({ messsage: "Incorrect Credentials" });
      return;
    }
    genToken((user._id.toString()),res)
    res.status(201).json({ message: "User Signed In" });
  } catch (error) {
    res.status(500).json(error);
  }
}
