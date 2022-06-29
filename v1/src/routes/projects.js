import { Router } from 'express';
import { create, updateProject } from '../controllers/projectController.js';
import validate from '../middlewares/validate.js';
import { createValidation, updateValidation } from '../validations/Project.js';
import authenticateToken from './../middlewares/authenticate.js';
const router = Router();
router.post('/create', validate(createValidation), authenticateToken, create);
router.patch(
  '/update/:id',
  validate(updateValidation),
  authenticateToken,
  updateProject
);
export default router;
