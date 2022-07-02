import mongoose from 'mongoose';
import logger from '../scripts/logger/Sections.js';

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    statuses: [String],
    assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    order: {
      type: Number,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
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
    comments: [
      {
        value: String,
        created_at: Date,
        user_id: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
    media: [
      {
        file: String,
        user_id: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    sub_tasks: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  { timestamps: true }
);

TaskSchema.post('save', (doc) => {
  logger.log({
    level: 'info',
    message: doc,
  });
});
export default mongoose.model('Task', TaskSchema);
