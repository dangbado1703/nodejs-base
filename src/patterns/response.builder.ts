import { StatusCodes } from 'http-status-codes';
import { ResponseModel } from '../model/response.model';
import { Response } from 'express';

export class ResponseBuilder extends ResponseModel {
  protected mesasage: string = '';
  protected status: StatusCodes = StatusCodes.OK;
  protected response?: Response;
  protected data?: any;

  public setMessage(message: string) {
    this.mesasage = message;
    return this;
  }
  public setResponse(response: Response) {
    this.response = response;
    return this;
  }
  public setData<T>(data: T) {
    this.data = data;
    return this;
  }
  public excuteResponseOk() {
    if (!this.response) {
      throw new Error('You didnt set response');
    } else {
      return this.response!.status(StatusCodes.OK).send({
        message: this.mesasage,
        data: this.data,
      });
    }
  }
  public excuteResponseError() {
    if (!this.response) {
      throw new Error('You didnt set response');
    } else {
      return this.response
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: this.mesasage });
    }
  }

  public excuteResponseInternal() {
    if (!this.response) {
      throw new Error('You didnt set response');
    } else {
      return this.response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal server' });
    }
  }
  public excuteResponseUnauthor() {
    if (!this.response) {
      throw new Error('You didnt set response');
    } else {
      return this.response
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: this.mesasage });
    }
  }
}
