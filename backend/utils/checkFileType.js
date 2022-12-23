import path from 'path';

export const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png|svg+xml|svg|webp|pjpeg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (!extname && !mimetype) {
    return cb(new Error('Ты можешь загрузить только картинки!'), false);
  }

  return cb(null, true);
};
