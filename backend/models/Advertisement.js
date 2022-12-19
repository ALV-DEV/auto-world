import mongoose from 'mongoose';

const advertisementSchema = mongoose.Schema(
  {
    carModel: { type: mongoose.Schema.Types.ObjectId, ref: 'CarModel' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    releaseYear: { type: Number, default: 1000 }, // Год выпуска
    mileage: { type: Number, default: 0 }, // Пробег
    color: { type: String, default: '' }, // Цвет
    transmissionType: { type: String, default: 'Механика' }, // Коробка передач
    condition: { type: String, default: 'Не требует ремонта' }, // Состояние автомобиля
    countOwner: { type: Number, default: 1 }, // Количество владельцев
    description: { type: Text, default: '' },
  },
  {
    timestamps: true,
  },
);

const Advertisement = mongoose.Model('Advertisement', advertisementSchema);

export default Advertisement;
