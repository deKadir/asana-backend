import joi from 'joi';

const createValidation = joi.object({
  title: joi.string().required().min(5),
  description: joi.string().required().min(5),
  assigned_to: joi.string().required().min(5),
  due_date: joi.date().required().min(5),
  statuses: joi.array().required(),
  section_id: joi.string().required().min(5),
  project_id: joi.string().required().min(5),
  order: joi.number().required(),
  isCompleted: joi.boolean().required(),
});

const updateValidation = joi.object({
  title: joi.string().min(5),
  description: joi.string().min(5),
  assigned_to: joi.string().min(5),
  due_date: joi.date().min(5),
  statuses: joi.array(),
  section_id: joi.string().min(5),
  project_id: joi.string().min(5),
  order: joi.number(),
  isCompleted: joi.boolean(),
});
export { createValidation, updateValidation };
