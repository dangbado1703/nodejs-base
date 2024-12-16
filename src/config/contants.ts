import { Response } from 'express';
import { IFormResponse } from '../type/index.type';

export const handleError500 = (res: Response<IFormResponse>) => {
  return res.status(500).json({ message: INTERAL_SERVER });
};

export const INTERAL_SERVER = 'Interal server';
export const FORMAT_DDMMYYYY = 'DD/MM/YYYY';
