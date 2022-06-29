import crypto from 'crypto-js';

const passwordToHash = (password) => {
  return crypto.HmacSHA1(password, process.env.SECRET_KEY).toString();
};

export { passwordToHash };
