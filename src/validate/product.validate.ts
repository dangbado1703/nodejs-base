import { NextFunction, Request, Response } from 'express';
import { TProductListValidate } from '../type/product.type';
import { ResponseBuilder } from '../patterns/response.builder';
import { StatusCodes } from 'http-status-codes';

export class ProductValidate {
  private listValidate: TProductListValidate[] = [];
  private res: Response;
  private req: Request;
  private next: NextFunction;
  private response: ResponseBuilder;
  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.response = new ResponseBuilder();
    this.response.setResponse(res);
  }
  public setListValidate(list: TProductListValidate[]) {
    this.listValidate = list;
    return this;
  }
  public excuteValidate() {
    let message = '';
    this.listValidate.forEach((item) => {
      if (item.required && !item.value) {
        message = `${item.name} không được bỏ trống`;
        return;
      }
    });
    if (message) return this.response.setMessage(message).excuteResponseError();
    return this.next();
  }
}
