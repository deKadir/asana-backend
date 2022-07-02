import { Section } from '../models/index.js';
const insert = (sectionData) => {
  const section = new Section(sectionData);
  return section.save();
};
const list = (where) => {
  return Section.find(where || {})
    .populate({
      path: 'user_id',
      select: 'fullName email profileImage',
    })
    .populate({
      path: 'project_id',
      select: 'name',
    });
};
const modify = (id, data) => {
  return Section.findByIdAndUpdate(id, data, { new: true });
};
const removeSection = (where) => {
  return Section.findOneAndDelete(where);
};
export { insert, list, modify, removeSection };
