import httpStatus from 'http-status';
import { passwordToHash } from '../scripts/helpers/crypto.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../scripts/helpers/token.js';
import { insert, list, login } from '../services/userService.js';
const create = async (req, res, next) => {
  insert(req.body)
    .then((data) => {
      res.status(httpStatus.CREATED).send(data);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message));
};

const userLogin = async (req, res, next) => {
  req.body.password = passwordToHash(req.body.password);
  login(req.body)
    .then((user) => {
      if (!user)
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ success: false, message: 'User not found' });
      if (user.password === req.body.password) {
        return res.status(httpStatus.OK).send({
          success: true,
          tokens: {
            accessToken: generateAccessToken(user),
            refreshToken: generateRefreshToken(user),
          },
        });
      }
      res.status(403).send('Password is wrong');
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: e.message,
      });
    });
};
export { create, userLogin };
