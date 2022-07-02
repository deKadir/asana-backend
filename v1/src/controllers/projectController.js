import httpStatus from 'http-status';
import { insert, modify, removeProject } from '../services/projectService.js';

const create = async (req, res, next) => {
  req.body.user_id = req.user;
  insert(req.body)
    .then((data) => {
      res.status(httpStatus.CREATED).send(data);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message));
};
const updateProject = (req, res, next) => {
  // authorization not implemented
  if (!req.params.id)
    return res.status(httpStatus.BAD_REQUEST).send({
      message: 'Project id is required',
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
      .send({ message: 'Project id not provided' });
  removeProject({ _id: req.params.id, user_id: req.user })
    .then((del) => {
      if (!del)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: 'Project not found' });
      res.status(httpStatus.OK).send(del);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
    });
};
export { create, updateProject, remove };
