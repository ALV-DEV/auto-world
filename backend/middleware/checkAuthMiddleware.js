import jwt from 'jsonwebtoken';

export const checkAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      req.userId = decoded.userId;
      next();
    } catch (error) {}
  } else {
    return res.status(403).json({
      message: 'Нет доступа',
    });
  }
};
