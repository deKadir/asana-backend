import joi from 'joi';

const createValidation = joi.object({
  name: joi.string().required().min(5),
});

const updateValidation = joi.object({});
export { createValidation, updateValidation };
