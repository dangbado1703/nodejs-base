import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { ProductTypeBuilder } from '../patterns/productType.builder';
import { ResponseBuilder } from '../patterns/response.builder';

const creatType = async (
  req: Request<{}, {}, { name: string; id: string }>,
  res: Response
) => {
  const { name } = req.body;
  const responseBuilder = new ResponseBuilder();
  responseBuilder.setResponse(res);
  const productTypeBuilder = new ProductTypeBuilder();
  if (!name)
    return responseBuilder
      .setMessage('Tên không được để trống')
      .excuteResponseError();
  try {
    const data = await productTypeBuilder.setName(name).excuteFindOneByName();
    if (data)
      return responseBuilder
        .setMessage('Đã tồn tại phân loại này')
        .excuteResponseError();
    await productTypeBuilder.setId(v4()).setName(name).excuteCreate();
    return responseBuilder.setMessage('Tạo thành công').excuteResponseOk();
  } catch (error) {
    console.log('error create productype:::', error);
    return responseBuilder.excuteResponseInternal();
  }
};

const updateType = async (
  req: Request<{}, {}, { name: string; id: string }>,
  res: Response
) => {
  const { id, name } = req.body;
  const responseBuilder = new ResponseBuilder();
  responseBuilder.setResponse(res);
  const productTypeBuilder = new ProductTypeBuilder();
  if (!id)
    return responseBuilder
      .setMessage('Thiếu id phân loại')
      .excuteResponseError();
  if (!name)
    return responseBuilder
      .setMessage('Tên phân loại không được để trống')
      .excuteResponseError();
  try {
    const data = await productTypeBuilder.setName(name).excuteFindOneByName();
    if (data)
      return responseBuilder
        .setMessage('Đã tồn tại phân loại này')
        .excuteResponseError();
    await productTypeBuilder.setId(id).setName(name).excuteUpdate();
    return responseBuilder
      .setMessage('Cập nhật phân loại thành công')
      .excuteResponseOk();
  } catch (error) {
    console.log('error update phân loại:::', error);
    return responseBuilder.excuteResponseInternal();
  }
};

export default { creatType, updateType };
