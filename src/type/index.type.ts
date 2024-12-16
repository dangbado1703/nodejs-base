import { Request } from 'express';

export interface IFormResponse {
  data?: any;
  message?: string;
  status?: number;
  totalElements?: number;
}

export enum EOPERATION {
  BETWEEN = 'between',
  IN = 'IN',
  IS_NULL = 'is_null',
  EQUALLY = '=',
  ABOUT = '%',
  NOT_NULL = 'is_not_null',
  NOT_EQUALLY = '<>',
}

export interface IFiltered {
  id: string;
  operation: EOPERATION;
  value: any;
}

export enum ESORTEDVALUE {
  DESC = 'DESC',
  ASC = 'ASC',
}

export interface ISorted {
  id: string;
  value: ESORTEDVALUE;
}

export interface IVariables {
  filtered: IFiltered[];
  page?: number;
  pageSize?: number;
  sorted: ISorted[];
}
