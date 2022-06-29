import { Project } from '../models/index.js';
const insert = (projectData) => {
  const project = new Project(projectData);
  return project.save();
};
const list = (where) => {
  return Project.find(where || {}).populate({
    path: 'user_id',
    select: 'fullName email',
  });
};
const modify = (id, data) => {
  return Project.findByIdAndUpdate(id, data, { new: true });
};

export { insert, list, modify };
