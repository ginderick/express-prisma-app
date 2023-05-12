import request from 'supertest';
import express from 'express';
import 'reflect-metadata';
import {prismaMock} from '../../singleton';
import {invalidProductPayload, product, productPayload} from '../../utils/utils';

let server;
beforeEach(async () => {
  const app = express();
  await require('../../../src/loaders').default({expressApp: app});
  server = app.listen(8001);
});

afterEach(async () => {
  await server.close();
});

describe('GET /products', () => {
  it('should return 200 for getting all products', async () => {
    const res = await request(server).get('/products');
    expect(res.status).toBe(200);
  });

  it('should return 200 for getting a product with sku', async () => {
    const sku = product.sku;

    prismaMock.product.findUnique.mockResolvedValue(product);
    const res = await request(server).get(`/products/${sku}`);
    expect(res.status).toBe(200);
    expect(res.body.sku).toEqual(sku);
  });

  it('should return 404 for if product is not found', async () => {
    prismaMock.product.findUnique.mockResolvedValue(null);
    const res = await request(server).get('/products/56');
    expect(res.status).toBe(404);
  });
});

describe('POST /products', () => {
  it('should return 201 when adding a product', async () => {
    const res = await request(server).post('/products').send(productPayload);
    expect(res.status).toBe(201);
  });

  it('should return 422 when adding an invalid product', async () => {
    const res = await request(server).post('/products').send(invalidProductPayload);
    expect(res.status).toBe(422);
  });
});
