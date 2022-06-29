import mongoose from 'mongoose';
import logger from '../scripts/logger/Projects.js';

const ProjectSchema = mongoose.Schema(
  {
    name: String,
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false, timestamps: true }
);

ProjectSchema.post('save', (doc) => {
  logger.log({
    level: 'info',
    message: doc,
  });
});
export default mongoose.model('Project', ProjectSchema);
