import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { formatBytes } from '../utils/formatBytes.js';
import { upload } from '../utils/uploadFiles.js';
import path from 'path';
import fs from 'fs';

class AuthController {
  // @desc   Register user
  // @route  POST /api/auth/register
  // @access Public
  async register(req, res) {
    try {
      const { email } = req.body;
      const isHaveUser = await User.findOne({ email });
      if (isHaveUser) {
        res.status(400).json({
          message: 'Пользователь с таким email уже зарегистрирован',
        });
        throw new Error('this email is busy');
      }
      const user = await User.create({
        ...req.body,
      });

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, { expiresIn: '30d' });
      const { password, ...info } = user._doc;

      return res.json({ ...info, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Не удалось зарегистрироваться',
      });
    }
  }

  // @desc   Login user
  // @route  POST /api/auth/login
  // @access Public
  async login(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(req.body.password))) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
          expiresIn: '30d',
        });
        const { password, ...info } = user._doc;

        return res.json({ ...info, token });
      } else {
        res.status(404).json({
          message: 'Неверный email или пароль',
        });
        throw new Error('incorrect password or email');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Не удалось авторизоваться',
      });
    }
  }

  // @desc   Get profile user
  // @route  GET /api/auth
  // @access private
  async getProfile(req, res) {
    try {
      const user = await User.findById(req.userId).select('-password').lean();

      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Пользователь не найден',
      });
    }
  }

  // @desc   upload avatar
  // @route  POST /api/auth/upload
  // @access private
  async uploadAvatar(req, res) {
    try {
      upload(req, res, async function (err) {
        const user = await User.findById(req.userId);
        if (!user) {
          res.status(404).json({
            message: 'Пользователь не найден',
          });
        }

        if (Boolean(user.avatarUrl)) {
          fs.unlinkSync(`${path.resolve()}${user.avatarUrl}`);
        }
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
          user.avatarUrl = paths[0].path;
          await user.save();

          const { password, ...info } = user._doc;
          res.json({ ...info });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Пользователь не найден',
      });
    }
  }

  // @desc   delete avatar
  // @route  DELETE /api/auth/upload
  // @access private

  async delteAvatar(req, res) {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        res.status(404).json({
          message: 'Пользователь не найден',
        });
      }
      fs.unlinkSync(`${path.resolve()}${user.avatarUrl}`);
      user.avatarUrl = '';
      await user.save();
      const { password, ...info } = user._doc;
      res.json({ ...info });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Пользователь не найден',
      });
    }
  }
}

export default new AuthController();
