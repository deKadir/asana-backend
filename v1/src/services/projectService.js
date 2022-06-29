import { Project } from '../models/index.js';
const insert = (projectData) => {
  const project = new Project(projectData);
  return project.save();
};
const list = () => {
  return Project.find().populate({
    path: 'user_id',
    select: 'fullName email',
  });
};
export { insert, list };
