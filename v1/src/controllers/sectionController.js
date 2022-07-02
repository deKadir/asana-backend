import httpStatus from 'http-status';
import {
  insert,
  modify,
  removeSection,
  list,
} from '../services/sectionService.js';
import CustomError from '../scripts/helpers/CustomError.js';

const create = async (req, res, next) => {
  req.body.user_id = req.user;
  insert(req.body)
    .then((data) => {
      res.status(httpStatus.CREATED).send(data);
    })
    .catch((e) => next(CustomError(e.message)));
};
const updateSection = (req, res, next) => {
  // authorization not implemented
  if (!req.params.id)
    return next(CustomError('section_id is required'), httpStatus.BAD_REQUEST);
  modify(req.params.id, req.body)
    .then((data) => {
      if (!data)
        return next(CustomError('Section not found', httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).send(data);
    })
    .catch((e) => next(CustomError(e.message)));
};
const remove = (req, res, next) => {
  //authorization not implemented
  if (!req.params.id)
    return next(CustomError('section_id is required'), httpStatus.BAD_REQUEST);

  removeSection({ _id: req.params.id, user_id: req.user })
    .then((del) => {
      if (!del)
        return next(CustomError('Section not found'), httpStatus.NOT_FOUND);
      res.status(httpStatus.OK).send(del);
    })
    .catch((e) => {
      next(CustomError(e.message));
    });
};

const listSections = (req, res, next) => {
  list({ user_id: req.user })
    .then((data) => res.status(httpStatus.OK).send(data))
    .catch((e) => next(CustomError(e.message)));
};
export { create, updateSection, remove, listSections };
