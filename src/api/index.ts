import {Router} from 'express';
import products from './routes/products';
import users from './routes/users';

const routes = () => {
  const app = Router();
  products(app);
  users(app);

  return app;
};

export default routes;
