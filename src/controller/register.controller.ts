import { User } from "./../model/user.model";
import { Response } from "express";
import { Request } from "express";
import { IFormResponse } from "../type";
import { IFormLogin } from "../type/login.type";
import { handleError500 } from "../config/contants";
export const registerController = async (
  req: Request<{}, {}, IFormLogin>,
  res: Response<IFormResponse>
) => {
  const { username, password } = req.body;
  try {
    const data = await User.findOne({ where: { username } });
    if (data) return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    await User.create({ username, password });
    return res.status(200).json({ message: "Đăng ký tài khoản thành công" });
  } catch (error) {
    console.log("errorRegister:::", error);
    return handleError500(res);
  }
};
