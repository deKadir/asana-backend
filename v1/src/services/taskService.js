import { Task } from '../models/index.js';

const insert = (taskData) => {
  const task = new Task(taskData);
  return task.save();
};
const list = (where) => {
  return Task.find(where || {});
};
const modify = (id, data) => {
  return Task.findByIdAndUpdate(id, data, { new: true });
};
const removeSection = (where) => {
  return Task.findOneAndDelete(where);
};
export { insert, list, modify, removeSection };
