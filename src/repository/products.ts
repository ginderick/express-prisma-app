import prisma from '../../prisma';
import {Inject, Service} from 'typedi';
import {Logger} from 'winston';

@Service()
export default class ProductsRepository {
  constructor(@Inject('logger') private logger: Logger) {}

  public async getProducts() {
    const complaints = prisma.product.findMany();
    return complaints;
  }

  public async getProduct(sku: string) {
    const product = prisma.product.findFirst({
      where: {sku: sku},
    });
    return product;
  }

  public async addProduct(data: any) {
    const product = prisma.product.create({
      data: {
        sku: data.sku,
        name: data.name,
        quantity: data.quantity,
        price: data.price,
      },
    });
    return product;
  }
}
