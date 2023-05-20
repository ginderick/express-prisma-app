import {Router} from 'express';
import products from './routes/products';
import users from './routes/users';
import auth from './routes/auth';

const routes = () => {
  const app = Router();
  products(app);
  users(app);
  auth(app);

  return app;
};

export default routes;
