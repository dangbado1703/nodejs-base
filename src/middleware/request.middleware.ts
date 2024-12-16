import { NextFunction, Request, Response } from 'express';
import { Secret, TokenExpiredError, verify } from 'jsonwebtoken';
import { ResponseBuilder } from '../patterns/response.builder';
import { IFormLogin } from '../type/login.type';

export const requestMiddleware = async (
  req: Request<{}, {}, IFormLogin>,
  res: Response,
  next: NextFunction
) => {
  let token = req.header('Token');
  token = token?.replace('Bearer ', '');
  const responseBuilder = new ResponseBuilder();
  responseBuilder.setResponse(res);
  if (!token)
    return responseBuilder.setMessage('Invalid Token').excuteResponseUnauthor();
  try {
    const data = verify(token, process.env.TOKEN_KEY as Secret);
    if (typeof data !== 'string') {
      req.email = data.email;
      req.user_id = data.id;
    }
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return responseBuilder
        .setMessage('Token hết hạn')
        .excuteResponseUnauthor();
    }
    return responseBuilder
      .setMessage((error as any).message)
      .excuteResponseInternal();
  }
};
