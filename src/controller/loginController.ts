import { User } from "./../model/user.model";
import { Request, Response } from "express";
import { IFormLogin } from "../type/login.type";
import { IFormResponse } from "../type";
import { sign, Secret } from "jsonwebtoken";
import { handleError500 } from "../config/contants";

export const loginController = async (
  req: Request<{}, {}, IFormLogin>,
  res: Response<IFormResponse>
) => {
  const { username } = req.body;
  try {
    const data = await User.findOne({ where: { username } });
    if (!data)
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    const token = sign(
      { username, user_id: data.user_id },
      process.env.TOKEN_KEY as Secret,
      { expiresIn: "30d" }
    );
    return res.status(200).json({
      data: { ...data.dataValues, token },
      message: "Đăng nhập thành công",
      status: 200,
    });
  } catch (error) {
    console.log("errorLogin:::", error);
    return handleError500(res);
  }
};
