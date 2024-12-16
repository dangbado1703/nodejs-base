import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Secret, sign } from 'jsonwebtoken';
import { ResponseBuilder } from '../patterns/response.builder';
import { UserBuilder, UserInterface } from '../patterns/user.builder';
import { IFormResponse } from '../type/index.type';
import { IFormLogin } from '../type/login.type';
import dayjs from 'dayjs';
import { v4 } from 'uuid';
import { FORMAT_DDMMYYYY } from '../config/contants';
import { hashSync, compareSync } from 'bcrypt';

export const loginController = async (
  req: Request<{}, {}, IFormLogin>,
  res: Response<IFormResponse>
) => {
  const { email, password } = req.body;
  const responseBuilder = new ResponseBuilder();
  responseBuilder.setResponse(res);
  const userBuilder = new UserBuilder();
  try {
    if (!email || !password) {
      return responseBuilder.setMessage('Thiếu thông tin').excuteResponseError;
    }
    const user = await userBuilder.setEmail(email).excuteGetUserInfoFromEmail();
    if (!user) {
      return responseBuilder.setMessage('Sai tên tài khoản hoặc mật khẩu')
        .excuteResponseError;
    }

    const comparePassword = compareSync(password, user.password);
    if (!comparePassword)
      return responseBuilder
        .setMessage('Mật khẩu không chính xác')
        .excuteResponseError();
    const token = sign(
      { email, id: user.id },
      process.env.TOKEN_KEY as Secret,
      { expiresIn: '30d' }
    );
    return responseBuilder
      .setMessage('Đăng nhập thành công')
      .setData({ email, id: user.id, token, name: user.name })
      .excuteResponseOk();
  } catch (error) {
    return responseBuilder
      .setResponse(res)
      .setMessage((error as any).message as string)
      .excuteResponseInternal();
  }
};

export const registerController = async (
  req: Request<{}, {}, IFormLogin>,
  res: Response<IFormResponse>
) => {
  const { email, name, password } = req.body;
  const userBuilder = new UserBuilder();
  const responseBuilder = new ResponseBuilder();
  const userInfo = new UserInterface();
  try {
    if (!email || !password || !name) {
      return responseBuilder
        .setMessage('Thiếu thông tin')
        .setResponse(res)
        .excuteResponseError();
    }
    const user = await userBuilder.setEmail(email).excuteGetUserInfoFromEmail();
    if (user) {
      return responseBuilder
        .setMessage('User đã tồn tại')
        .setResponse(res)
        .excuteResponseError();
    }

    const passwordHash = hashSync(
      password,
      Number(process.env.SALT_ROUNDS as string)
    );

    const data = await userBuilder
      .setEmail(email)
      .setPassword(passwordHash)
      .setName(name)
      .setCreateDate(dayjs().format(FORMAT_DDMMYYYY))
      .setUserId(v4())
      .excuteCreateUser();

    userInfo
      .setCreateDate(data.create_date)
      .setEmail(data.email)
      .setName(data.name)
      .setUserId(data.id)
      .getUserInfo();

    return responseBuilder
      .setMessage('Tạo tài khoản thành công')
      .setResponse(res)
      .setData(userInfo)
      .excuteResponseOk();
  } catch (error) {
    return responseBuilder
      .setResponse(res)
      .setMessage((error as any).message as string)
      .excuteResponseInternal();
  }
};

export const updateUserController = async (
  req: Request<
    {},
    {},
    Omit<IFormLogin, 'email'> & { oldPassword: string; id: string }
  >,
  res: Response
) => {
  const { name, password, oldPassword, id } = req.body;
  const userBuilder = new UserBuilder();
  const responseBuilder = new ResponseBuilder();
  responseBuilder.setResponse(res);
  try {
    if (!id)
      return responseBuilder
        .setMessage('Thiếu thông tin user')
        .excuteResponseError();
    const user = await userBuilder.setUserId(id).excuteGetUserInfoFromId();
    if (!user)
      return responseBuilder
        .setMessage('Không tồn tại user')
        .excuteResponseError();

    const comparePassword = compareSync(oldPassword, user.password);
    if (comparePassword)
      return responseBuilder
        .setMessage('Mật khẩu không chính xác')
        .excuteResponseError();
    const compareNewPassword = compareSync(password, user.password);
    if (compareNewPassword)
      return responseBuilder
        .setMessage('Mật khẩu mới không được trùng mật khẩu cũ')
        .excuteResponseError();
    const passwordHash = hashSync(
      password,
      Number(process.env.SALT_ROUNDS as string)
    );
    await userBuilder
      .setUpdateDate(dayjs().format('DD/MM/YYYY HH:mm:ss'))
      .setName(name)
      .setPassword(passwordHash)
      .excuteUpdateUser();
    return responseBuilder
      .setMessage('Đổi thông tin thành công')
      .excuteResponseOk();
  } catch (error) {
    return responseBuilder
      .setResponse(res)
      .setMessage((error as any).message as string)
      .excuteResponseInternal();
  }
};
