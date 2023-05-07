import {Router} from 'express';
import products from './routes/products';

const routes = () => {
  const app = Router();
  products(app);

  return app;
};

export default routes;
