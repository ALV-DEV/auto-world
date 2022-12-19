import mongoose from 'mongoose';

const carMarkSchema = mongoose.Schema(
  {
    name: String,
    brandImageUrl: { type: String, default: '' },
    description: { type: Text, default: '' },
  },
  {
    timestamps: true,
  },
);

const CarMark = mongoose.Model('CarMark', carMarkSchema);

export default CarMark;
