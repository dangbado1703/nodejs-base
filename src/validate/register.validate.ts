import { NextFunction, Request, Response } from "express";
import { IFormResponse } from "../type";
import { IFormLogin } from "../type/login.type";

export const registerValidate = (
  req: Request<{}, {}, IFormLogin>,
  res: Response<IFormResponse>,
  next: NextFunction
) => {
  const { username, password } = req.body;
  if (!username)
    return res
      .status(400)
      .json({ message: "Tên tài khoản là trường bắt buộc" });
  if (!password)
    return res.status(400).json({ message: "Mật khẩu là trường bắt buộc" });
  if (username.length < 4 || username.length > 12)
    return res.status(400).json({
      message: "Tên tài khoản tối đa 12 ký tự và tối thiểu 4 ký tự",
    });
  if (password.length < 4)
    return res.status(400).json({ message: "Mật khẩu tối thiểu 4 ký tự" });
  if (password.length > 12)
    return res.status(400).json({ message: "Mật khẩu tối đa 12 ký tự" });
    return next()
};
