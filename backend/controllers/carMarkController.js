import CarMark from '../models/CarMark.js';
import { formatBytes } from '../utils/formatBytes.js';
import { upload } from '../utils/uploadFiles.js';

class CarMarkController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const carMark = await CarMark.create({ name });
      res.status(201).json(carMark);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Не удалось создать марку автомобиля, ошибка сервера',
      });
    }
  }

  async update(req, res) {
    try {
      upload(req, res, async function (err) {
        const { id } = req.params;
        if (err) {
          console.log(err.message);

          res.status(400).json({
            status: 'Не удалось загрузить',
            message: err,
          });
        } else {
          const files = req.files;
          if (!files) {
            res.status(400);
            throw new Error('Пожалуйста, загрузи файл');
          }

          let paths = [];

          files.map((file, index) =>
            paths.push({
              _id: index,
              name: file.filename,
              path: `/${file.path}`,
              size: formatBytes(file.size),
            }),
          );
          const carMark = await CarMark.updateOne(
            {
              _id: id,
            },
            {
              ...req.body,
              brandImageUrl: paths[0].path,
            },
          );

          res.status(200).json({
            message: 'Марка автомобиля обновлена',
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Не удалось обновить марку автомобиля, ошибка сервера',
      });
    }
  }

  async getAll(req, res) {
    try {
      const marks = await CarMark.find();

      res.status(200).json(marks);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Не удалось марки автомобилей, ошибка сервера',
      });
    }
  }
}

export default new CarMarkController();
