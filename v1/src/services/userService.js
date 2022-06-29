import { User } from '../models/index.js';
import { passwordToHash } from '../scripts/helpers/crypto.js';
const insert = (userData) => {
  const user = new User(userData);
  return user.save();
};
const login = (loginInfo) => {
  return User.findOne({ email: loginInfo.email });
};
const list = () => {
  return User.find();
};

const modify = (where, data) => {
  if (data.password) {
    data.password = passwordToHash(data.password);
  }
  return User.findOneAndUpdate(where, data, { new: true });
};
export { insert, list, login, modify };
