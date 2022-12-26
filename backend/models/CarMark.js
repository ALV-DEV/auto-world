import mongoose from 'mongoose';

const carMarkSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    brandImageUrl: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);

const CarMark = mongoose.model('CarMark', carMarkSchema);

export default CarMark;
