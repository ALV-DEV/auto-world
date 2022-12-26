import mongoose from 'mongoose';

const carModelSchema = mongoose.Schema(
  {
    name: { type: String, default: '' }, // Название модели
    bodywork: { type: String, default: '' }, // Тип кузов
    typeFuel: { type: String, default: 'Бензин' }, // Тип топлива
    drive: { type: String, default: '' }, // Привод
    mark: { type: mongoose.Schema.Types.ObjectId, ref: 'CarMark' }, // Марка
  },
  {
    timestamps: true,
  },
);

const CarModel = mongoose.model('CarModel', carModelSchema);

export default CarModel;
