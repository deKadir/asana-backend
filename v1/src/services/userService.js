import { User } from '../models/index.js';
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
export { insert, list, login };
