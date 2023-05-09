import ProductsService from '../../services/products';
import {Router, Request, Response, NextFunction} from 'express';
import Container from 'typedi';
import {Logger} from 'winston';
import middlewares from '../middlewares';
import {ProductParamSchema, ProductSchema} from '../../schema/ProductSchema';

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

  route.post(
    '/',
    middlewares.validateRequest({
      body: ProductSchema,
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const productsService = Container.get(ProductsService);
        const product = await productsService.addProduct(req.body);
        return res.status(201).json(product);
      } catch (error) {
        return next(error);
      }
    }
  );

  route.get(
    '/:sku',
    middlewares.validateRequest({params: ProductParamSchema}),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const productsService = Container.get(ProductsService);
        const product = await productsService.getProduct(req.params.sku);

        if (!product) {
          return res.status(404).send({error: 'product not found'});
        }
        return res.status(200).json(product);
      } catch (error) {
        return next(error);
      }
    }
  );
};

export default products;
