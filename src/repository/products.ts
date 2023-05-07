import {PrismaClient} from '@prisma/client';
import {Inject, Service} from 'typedi';
import {Logger} from 'winston';

const prisma = new PrismaClient();

@Service()
export default class ProductsRepository {
  constructor(@Inject('logger') private logger: Logger) {}

  public async getProducts() {
    const complaints = prisma.product.findMany();
    return complaints;
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
