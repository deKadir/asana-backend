const CustomError = (message, status) => {
  const error = new Error();
  error.message = message || 'An error occured';
  error.status = status || 500;
  return error;
};

export default CustomError;
