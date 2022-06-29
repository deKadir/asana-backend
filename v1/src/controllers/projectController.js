import httpStatus from 'http-status';
import { insert, list } from '../services/projectService.js';

const create = async (req, res, next) => {
  req.body.user_id = req.user;
  insert(req.body)
    .then((data) => {
      res.status(httpStatus.CREATED).send(data);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message));
};

const listProjects = async (req, res, next) => {
  list()
    .then((data) => res.status(httpStatus.OK).send(data))
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};
export { create, listProjects };
