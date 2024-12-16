import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export abstract class ResponseModel {
  protected status: StatusCodes = StatusCodes.OK;
  protected mesasage: string = "";
  protected response?: Response;
  protected data?: any;
}
