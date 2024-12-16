import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import multer, { MulterError } from 'multer';
import storage from '../config/multer';
import { ResponseBuilder } from '../patterns/response.builder';
import {
  createProductController,
  getListProductController,
} from '../controller/product.controller';
import { TBodyCreateProduct, TProductListValidate } from '../type/product.type';
import { ProductValidate } from '../validate/product.validate';

const router = Router();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const imageReg = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/;
    if (!imageReg.test(file.originalname)) {
      req.body.fileValidationError = 'Tải file không đúng định dạng';
      return cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
    }
    cb(null, true);
  },
  limits: {
    fieldSize: 5 * 1024 * 1024,
  },
});

const MulterErrorHandler = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const responseBuilder = new ResponseBuilder();
  responseBuilder.setResponse(res);
  if (err instanceof MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return responseBuilder
        .setMessage('Dung lượng size vượt quá giới hạn 5MB')
        .excuteResponseError();
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return responseBuilder
        .setMessage(
          'Định dạng file không hợp lệ. Chỉ chấp nhận jpeg, jpg, png, gif.'
        )
        .excuteResponseError();
    }
  }
  next(err);
};

router.post(
  '/create',
  (req: Request<{}, {}, TBodyCreateProduct>, res, next) => {
    upload.single('image')(req, res, (error) => {
      MulterErrorHandler(error, req, res, next);
    });
  },
  (req: Request<{}, {}, TBodyCreateProduct>, res, next) => {
    const { name, price, typeId } = req.body;
    const file = req.file;
    const validate = new ProductValidate(req, res, next);
    const listValidate: TProductListValidate[] = [
      {
        name: 'name',
        required: true,
        value: name,
      },
      {
        name: 'price',
        required: true,
        value: price,
      },
      {
        name: 'typeId',
        required: true,
        value: typeId,
      },
      {
        name: 'file',
        required: true,
        value: file,
      },
    ];
    validate.setListValidate(listValidate).excuteValidate();
  },
  (req, res) => {
    createProductController(req, res);
  }
);

router.post('/search', (req, res) => {
  getListProductController(req, res);
});

export default router;
