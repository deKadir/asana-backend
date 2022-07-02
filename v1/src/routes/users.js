import { Router } from 'express';
import {
  create,
  userLogin,
  listProjects,
  resetPassword,
  update,
  updateProfileImage,
} from '../controllers/userController.js';
import validate from '../middlewares/validate.js';
import {
  createValidation,
  loginValidation,
  resetValidation,
} from '../validations/User.js';
import authenticateToken from './../middlewares/authenticate.js';
const router = Router();
router.post('/create', validate(createValidation), create);
router.post('/login', validate(loginValidation), userLogin);
router.get('/projects', authenticateToken, listProjects);
router.post('/reset-password', validate(resetValidation), resetPassword);
router.patch('/update', authenticateToken, update);
router.post('/update-profile-image', authenticateToken, updateProfileImage);
export default router;
