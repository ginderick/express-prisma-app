import {prismaMock} from '../../singleton';
import ProductsService from '../../../src/services/products';
import ProductsRepository from '../../../src/repository/products';
import loggerInstance from '../../../src/loaders/logger';

test('should get all products', async () => {
  const product = {
    id: 1,
    sku: '123',
    name: 'shoes',
    quantity: 123,
    price: 123,
  };
  const products = [product];

  prismaMock.product.findMany.mockResolvedValue(products);
  const logger = loggerInstance;
  const productsRepository = new ProductsRepository(logger);
  const productsService = new ProductsService(logger, productsRepository);

  await expect(productsService.getProducts()).resolves.toEqual([
    {
      id: 1,
      sku: '123',
      name: 'shoes',
      quantity: 123,
      price: 123,
    },
  ]);
});
