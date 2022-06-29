import httpStatus from 'http-status';
const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details
      ?.map((detail) => detail.message)
      .join(',');
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ success: false, message: errorMessage });
  }
  Object.assign(req, value);
  return next();
};

export default validate;
