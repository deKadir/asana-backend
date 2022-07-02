import { Project } from '../models/index.js';

const insert = (projectData) => {
  const project = new Project(projectData);
  return project.save();
};
const list = (where) => {
  return Project.find(where || {}).populate({
    path: 'user_id',
    select: 'fullName email profileImage',
  });
};
const modify = (id, data) => {
  return Project.findByIdAndUpdate(id, data, { new: true });
};
const removeProject = (where) => {
  return Project.findOneAndDelete(where);
};
export { insert, list, modify, removeProject };
