import prisma from '../../prisma';
import {Inject, Service} from 'typedi';
import {Logger} from 'winston';

@Service()
export default class ProductsRepository {
  constructor(@Inject('logger') private logger: Logger) {}

  public async getProducts(limit: number, page: number) {
    const complaints = prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {name: 'asc'},
    });
    return complaints;
  }

  public async getProduct(sku: string) {
    const product = prisma.product.findUnique({
      where: {sku: sku},
    });
    return product;
  }

  public async addProduct(data: any) {
    const product = prisma.product.create({
      data: {
        sku: data.sku,
        name: data.name,
        category: data.category,
        quantity: data.quantity,
        price: data.price,
      },
    });
    return product;
  }
}
