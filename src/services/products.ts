import ProductsRepository from '../repository/products';
import Container, {Inject, Service} from 'typedi';
import {Logger} from 'winston';

@Service()
export default class ProductsService {
  constructor(
    @Inject('logger') private logger: Logger,
    private productsRepository = Container.get(ProductsRepository)
  ) {}

  public async getProducts(limit: number, page: number) {
    this.logger.info('Service: Getting products');
    const products = this.productsRepository.getProducts(limit, page);
    return products;
  }

  public async getProduct(sku: string) {
    this.logger.info('Service: Getting a product');
    const product = this.productsRepository.getProduct(sku);
    return product;
  }

  public async addProduct(data: any) {
    this.logger.info('Service: Adding a product');
    const product = this.productsRepository.addProduct(data);
    return product;
  }
}
