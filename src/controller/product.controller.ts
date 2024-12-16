import { Request, Response } from 'express';
import { SearchProductBuilder } from '../patterns/product.builder';
import { ResponseBuilder } from '../patterns/response.builder';
import { IVariables } from '../type/index.type';
import { TBodyCreateProduct } from '../type/product.type';

export const createProductController = (
  req: Request<{}, {}, TBodyCreateProduct>,
  res: Response
) => {
  const { count, name, price, purchaseCount, typeId } = req.body;
  const file = req.file;
  console.log('req::', req.body);
  console.log('file::', req.file);
  const responseBuilder = new ResponseBuilder();
  responseBuilder.setResponse(res);
};

export const getListProductController = async (
  req: Request<{}, {}, IVariables>,
  res: Response
) => {
  const { filtered, sorted, page, pageSize } = req.body;
  const responseBuilder = new ResponseBuilder();
  responseBuilder.setResponse(res);
  const productBuilder = new SearchProductBuilder();
  try {
    const { total, dataSearch } = await productBuilder
      .setPage(page ?? 0)
      .setPageSize(pageSize ?? 10)
      .setFiltered(filtered ?? [])
      .setSorted(sorted ?? [])
      .excuteSearchProduct();
    return responseBuilder
      .setMessage('Lấy dữ liệu thành công')
      .setData({ total: Number(total), dataSearch })
      .excuteResponseOk();
  } catch (error: any) {
    console.log('error::', error);
    return responseBuilder.setMessage(error.message).excuteResponseInternal();
  }
};
