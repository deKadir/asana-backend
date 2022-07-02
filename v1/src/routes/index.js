import express, { Router } from 'express';
import path from 'path';

import projects from './projects.js';
import users from './users.js';
import sections from './sections.js';
import tasks from './tasks.js';
const router = Router();

router.use('/project', projects);
router.use('/user', users);
router.use('/section', sections);
router.use('/task', tasks);
//http://localhost:8080/api/v1/uploads/folder/....jpg
router.use(
  '/uploads',
  express.static(path.join(path.resolve(), '/v1/src/uploads'))
);

export default router;
