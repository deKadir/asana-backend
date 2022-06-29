import { Router } from 'express';
import { create, userLogin } from '../controllers/userController.js';
import validate from '../middlewares/validate.js';
import { createValidation, loginValidation } from '../validations/User.js';
const router = Router();
router.post('/create', validate(createValidation), create);
router.post('/login', validate(loginValidation), userLogin);
export default router;
