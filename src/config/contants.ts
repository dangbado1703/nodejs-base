import { Response } from "express";
import { IFormResponse } from "../type";

export const handleError500 = (res: Response<IFormResponse>) => {
  return res.status(500).json({ message: "Interal server" });
};
