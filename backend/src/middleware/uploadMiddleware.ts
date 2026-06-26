import multer from "multer";
import path from "path";
import { ErrorResponse } from "../utils/errorResponse";

const storage = multer.memoryStorage();

const checkFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new ErrorResponse("Images only! (jpg, jpeg, png, webp)", 400) as any);
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
