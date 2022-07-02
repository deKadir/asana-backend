import { Router } from 'express';

import authenticateToken from '../middlewares/authenticate.js';
import validate from '../middlewares/validate.js';
import { createValidation, updateValidation } from '../validations/Task.js';
import {
  create,
  updateTask,
  remove,
  listTasks,
} from '../controllers/tasksController.js';
const router = Router();
router.post('/create', validate(createValidation), authenticateToken, create);
router.patch(
  '/update/:id',
  validate(updateValidation),
  authenticateToken,
  updateTask
);
router.delete('/remove/:id', authenticateToken, remove);
router.get('/list', authenticateToken, listTasks);
export default router;
