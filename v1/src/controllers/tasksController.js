import httpStatus from 'http-status';
import {
  insert,
  modify,
  removeSection,
  list,
} from '../services/taskService.js';

const create = async (req, res, next) => {
  req.body.user_id = req.user;
  insert(req.body)
    .then((data) => {
      res.status(httpStatus.CREATED).send(data);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message));
};
const updateTask = (req, res, next) => {
  // authorization not implemented
  if (!req.params.id)
    return res.status(httpStatus.BAD_REQUEST).send({
      message: 'Section id is required',
    });
  modify(req.params.id, req.body)
    .then((data) => {
      res.status(httpStatus.OK).send(data);
    })
    .catch((e) =>
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message })
    );
};
const remove = (req, res, next) => {
  //authorization not implemented
  if (!req.params.id)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: 'Task id not provided' });
  removeSection({ _id: req.params.id, user_id: req.user })
    .then((del) => {
      if (!del)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: 'Task not found' });
      res.status(httpStatus.OK).send(del);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
    });
};

const listTasks = (req, res, next) => {
  list({ user_id: req.user })
    .then((data) => res.status(httpStatus.OK).send(data))
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};
export { create, updateTask, remove, listTasks };
