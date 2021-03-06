import httpStatus from 'http-status';
import * as uuid from 'uuid';
import path from 'path';

import {
  generateAccessToken,
  generateRefreshToken,
} from '../scripts/helpers/token.js';
import { passwordToHash } from '../scripts/helpers/crypto.js';
import { insert, login, modify } from '../services/userService.js';
import * as projectController from '../services/projectService.js';
import CustomError from '../scripts/helpers/CustomError.js';

const create = async (req, res, next) => {
  insert(req.body)
    .then((data) => {
      res.status(httpStatus.CREATED).send(data);
    })
    .catch((e) => next(CustomError(e.message)));
};

const userLogin = async (req, res, next) => {
  req.body.password = passwordToHash(req.body.password);
  login(req.body)
    .then((user) => {
      if (!user)
        return next(CustomError('User not found', httpStatus.NOT_FOUND));

      if (user.password === req.body.password) {
        return res.status(httpStatus.OK).send({
          success: true,
          tokens: {
            accessToken: generateAccessToken(user),
            refreshToken: generateRefreshToken(user),
          },
        });
      }
      return next(CustomError('Wrong password', 403));
    })
    .catch((e) => next(CustomError(e.message)));
};
const listProjects = async (req, res, next) => {
  projectController
    .list({ user_id: req.user })
    .then((data) => res.status(httpStatus.OK).send(data))
    .catch((e) => next(CustomError(e.message)));
};

const resetPassword = async (req, res, next) => {
  const newPassword = uuid.v4()?.split('-')[0];
  console.log(newPassword);
  modify(req.body, { password: newPassword })
    .then((data) => {
      if (!data)
        return next(CustomError('User not found', httpStatus.NOT_FOUND));
      //send mail
      res
        .status(httpStatus.OK)
        .send({ message: 'Your password has been sent to your mail address' });
    })
    .catch((e) => next(CustomError(e.message)));
};
const update = (req, res, next) => {
  modify({ _id: req.user }, req.body)
    .then((updated) => {
      res.status(httpStatus.OK).send(updated);
    })
    .catch((e) => next(CustomError(e.message)));
};
const updateProfileImage = (req, res, next) => {
  const extension = path.extname(req.files.profileImage.name);
  const fileName = `${req.user}${extension}`;
  const folderPath = path.join(
    path.resolve(),
    '/v1/src/uploads/users',
    fileName
  );
  console.log(folderPath);
  if (!req.files?.profileImage)
    return next(
      CustomError('Please provide profileImage', httpStatus.BAD_REQUEST)
    );

  req.files.profileImage.mv(folderPath, function (err) {
    if (err) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    }
    modify({ _id: req.user }, { profileImage: fileName })
      .then((result) => {
        return res
          .status(httpStatus.OK)
          .send({ message: 'Image successfully uploaded' });
      })
      .catch((e) => next(CustomError(e.message)));
  });
};

export {
  create,
  userLogin,
  listProjects,
  resetPassword,
  update,
  updateProfileImage,
};
