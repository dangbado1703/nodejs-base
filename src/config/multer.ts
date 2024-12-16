import { Request } from 'express';
import { FileFilterCallback, diskStorage } from 'multer';
import path from 'path';

const storage = diskStorage({
  destination(_, __, callback) {
    callback(null, './src/assets');
  },
  filename(req, file, callback) {
    callback(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Vui lòng tải lên định dạng ảnh';
    cb(null, false);
  }
  cb(null, true);
};

export default storage;
