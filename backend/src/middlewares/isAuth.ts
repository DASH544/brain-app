import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
interface JwtPayload
{
  id:string
}
export async function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(403).json({ message: "Please Login First" });
      return;
    }
    const decodedData = jwt.verify(token, process.env.JWT_SEC) as JwtPayload;
    if (!decodedData) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }
    req.userId = decodedData.id;
    next()
  } catch (error) {
    res.status(500).json(error);
  }
}
