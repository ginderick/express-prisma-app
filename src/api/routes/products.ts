import ProductsService from '../../services/products';
import {Router, Request, Response, NextFunction} from 'express';
import Container from 'typedi';
import {Logger} from 'winston';

const route = Router();

const products = (app: Router) => {
  app.use('/products', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productsService = Container.get(ProductsService);
      const products = await productsService.getProducts();
      return res.status(200).json(products);
    } catch (error) {
      return next(error);
    }
  });

  route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productsService = Container.get(ProductsService);
      const product = await productsService.addProduct(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return next(error);
    }
  });
};

export default products;
