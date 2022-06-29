import { Router } from 'express';
import { create, listProjects } from '../controllers/projectController.js';
import validate from '../middlewares/validate.js';
import { createValidation } from '../validations/Project.js';
import authenticateToken from './../middlewares/authenticate.js';
const router = Router();
router.post('/create', validate(createValidation), authenticateToken, create);
router.get('/list', listProjects);
export default router;
