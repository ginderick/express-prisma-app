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

  public async addProduct() {
    const product = prisma.product.create({
      data: {
        sku: '123',
        name: 'shoes',
        quantity: '1',
        price: '112',
      },
    });
    return product;
  }
}
