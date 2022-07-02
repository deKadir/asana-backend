import { Router } from 'express';

import authenticateToken from './../middlewares/authenticate.js';
import validate from '../middlewares/validate.js';
import { createValidation, updateValidation } from '../validations/Section.js';
import {
  create,
  updateSection,
  remove,
  listSections,
} from '../controllers/sectionController.js';
const router = Router();
router.post('/create', validate(createValidation), authenticateToken, create);
router.patch(
  '/update/:id',
  validate(updateValidation),
  authenticateToken,
  updateSection
);
router.delete('/remove/:id', authenticateToken, remove);
router.get('/list', authenticateToken, listSections);
export default router;
