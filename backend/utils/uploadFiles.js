import multer from 'multer';
import path from 'path';
import { checkFileType } from './checkFileType.js';
import { formatBytes } from './formatBytes.js';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadFolder = req.headers.folder;
    cb(null, `static/${uploadFolder || ''}`);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.originalname.split('.')[0]}${Date.now()}${path.extname(file.originalname)}`
        .toLowerCase()
        .replace(/_/g, '-')
        .replace(' ', '-'),
    );
  },
});

export const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array('imagesUp', 10);

// export const uploadFiles = (req, res) =>
//   upload(req, res, function (err) {
//     if (err) {
//       console.log(err.message);

//       res.status(400).json({
//         status: 'Не удалось загрузить',
//         message: err,
//       });
//     } else {
//       const files = req.files;
//       if (!files) {
//         res.status(400);
//         throw new Error('Пожалуйста, загрузи файл');
//       }

//       let paths = [];

//       files.map((file, index) =>
//         paths.push({
//           _id: index,
//           name: file.filename,
//           path: `/${file.path}`,
//           size: formatBytes(file.size),
//         }),
//       );

//       //   res.status(200).json({
//       //     status: 'success',
//       //     message: 'Файл успешно загружен',
//       //     data: paths,
//       //   });
//       return paths;
//     }
//   });
