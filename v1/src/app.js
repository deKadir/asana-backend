import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import loaders from './loaders/index.js';
import fileupload from 'express-fileupload';

import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
const app = express();

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: '*',
    methods: '*',
  })
);
app.use(fileupload());
app.use('/api/v1', routes);
app.use((req, res, next) => {
  const error = new Error('invalid request');
  next(error);
});

app.use(errorHandler);

loaders();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App started running on port ${PORT}`);
});
