import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userShema = mongoose.Schema(
  {
    fullName: String,
    password: { type: String, required: true },
    email: { type: String, required: true },
    avatarUrl: { type: String, default: '' },
    contacts: [
      {
        contactType: { type: String, default: 'телефон' },
        value: { type: String, default: '' },
      },
    ],
  },
  {
    timestamps: true,
  },
);

userShema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userShema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model('User', userShema);

export default User;
