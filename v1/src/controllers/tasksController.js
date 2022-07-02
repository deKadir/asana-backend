import httpStatus from 'http-status';

import {
  insert,
  modify,
  removeSection,
  list,
} from '../services/taskService.js';
import CustomError from '../scripts/helpers/CustomError.js';

const create = async (req, res, next) => {
  req.body.user_id = req.user;
  insert(req.body)
    .then((data) => {
      res.status(httpStatus.CREATED).send(data);
    })
    .catch((e) => next(CustomError(e.message)));
};
const updateTask = (req, res, next) => {
  // authorization not implemented
  if (!req.params.id)
    return next(CustomError('id is required'), httpStatus.BAD_REQUEST);
  modify(req.params.id, req.body)
    .then((data) => {
      if (!data)
        return next(CustomError('Task not found', httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).send(data);
    })
    .catch((e) => next(CustomError(e.message)));
};
const remove = (req, res, next) => {
  //authorization not implemented
  if (!req.params.id)
    return next(CustomError('Task id not provided', httpStatus.BAD_REQUEST))
      .then((del) => {
        if (!del)
          return next(CustomError('Task not found', httpStatus.NOT_FOUND));
        res.status(httpStatus.OK).send(del);
      })

      .catch((e) => next(CustomError(e.message)));
};

const listTasks = (req, res, next) => {
  list({ user_id: req.user })
    .then((data) => res.status(httpStatus.OK).send(data))
    .catch((e) => next(CustomError(e.message)));
};
export { create, updateTask, remove, listTasks };
