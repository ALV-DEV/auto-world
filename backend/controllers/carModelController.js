import CarModel from '../models/CarModel.js';

class CarModelController {
  async create(req, res) {
    try {
      const carModel = await CarModel.create({
        name: '',
        bodywork: '',
      });
      res.status(201).json({
        _id: carModel._id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Не удалось создать модель автомобиля',
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      CarModel.findByIdAndUpdate(
        id,
        { ...req.body },
        {
          returnDocument: 'after',
        },
        (err, doc) => {
          if (err) {
            console.log(err);
            res.status(500).json({
              message: 'Не удалось обновить модель автомобиля',
            });
          }

          if (!doc) {
            res.status(404).json({
              message: 'Не удалось найти модель автомобиля',
            });
          }

          res.status(200).json(doc);
        },
      ).populate('mark');
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Не удалось обновить модель автомобиля',
      });
    }
  }

  async getByMark(req, res) {
    try {
      const models = await CarModel.find({ mark: req.params.markId }).populate('mark');
      res.status(200).json(models);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Не удалось получить модели автомобиля',
      });
    }
  }

  async delete(req, res) {
    try {
      await CarModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: 'Модель удалена',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Не удалось удалить модель автомобиля',
      });
    }
  }
}

export default new CarModelController();
