import mongoose from 'mongoose';
import logger from './../scripts/logger/Sections.js';

const SectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    project_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    order: Number,
  },
  { timestamps: true }
);

SectionSchema.post('save', (doc) => {
  logger.log({
    level: 'info',
    message: doc,
  });
});
export default mongoose.model('Section', SectionSchema);
