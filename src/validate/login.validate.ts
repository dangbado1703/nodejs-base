import { NextFunction, Request, Response } from "express";
import { IFormResponse } from "../type";
import { IFormLogin } from "../type/login.type";

export const loginValidate = (
  req: Request<{}, {}, IFormLogin>,
  res: Response<IFormResponse>,
  next: NextFunction
) => {
  const { password, username } = req.body;
  if (!username) return res.status(400).json({ message: "Thiếu tài khoản" });
  if (!password) return res.status(400).json({ message: "Thiếu mật khẩu" });
  return next();
};
