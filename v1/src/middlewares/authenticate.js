import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
const authenticateToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  if (token === null) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ success: false, message: 'authorization failed' });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(httpStatus.FORBIDDEN)
        .send({ success: false, message: 'Token expired' });
    req.user = user.userId;
    return next();
  });
};
export default authenticateToken;
