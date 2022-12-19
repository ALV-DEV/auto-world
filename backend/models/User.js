import mongoose from 'mongoose';

const userShema = mongoose.Schema(
  {
    fullName: String,
    password: { type: String, required: true },
    email: { type: String, required: true },
    avatarUrl: { type: String, default: '' },
    contacts: [{ type: String, default: [] }],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userShema);

export default User;
