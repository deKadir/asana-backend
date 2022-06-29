import { Router } from 'express';
import projects from './projects.js';
import users from './users.js';
const router = Router();
router.use('/project', projects);
router.use('/user', users);
export default router;
