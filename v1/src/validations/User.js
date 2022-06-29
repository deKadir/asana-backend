import joi from 'joi';

const createValidation = joi.object({
  fullName: joi.string().required().min(4),
  password: joi.string().required().min(8),
  email: joi.string().email().required(),
});

const loginValidation = joi.object({
  password: joi.string().required().min(8),
  email: joi.string().email().required(),
});
const resetValidation = joi.object({
  email: joi.string().email().required(),
});
export { createValidation, loginValidation, resetValidation };
