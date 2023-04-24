import {Router} from 'express';
import complaints from './routes/complaints';

const routes = () => {
  const app = Router();
  complaints(app);

  return app;
};

export default routes;
