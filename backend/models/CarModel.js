import mongoose from 'mongoose';

const carModelSchema = mongoose.Schema(
  {
    name: { type: String, required: true }, // Название модели
    bodywork: { type: String, required: true }, // Тип кузов
    power: { type: Number, default: 0 }, // Мощность двигателя
    engineCapacity: { type: Number, default: 0 }, // Объем двигателя
    typeFuel: { type: String, default: 'бензин' }, // Тип топлива
    drive: { type: String, default: '' }, // Привод
    mark: { type: mongoose.Schema.Types.ObjectId, ref: 'CarMark' }, // Марка
  },
  {
    timestamps: true,
  },
);

const CarModel = mongoose.Model('CarModel', carModelSchema);

export default CarModel;
