import request from 'supertest';
import express from 'express';
import 'reflect-metadata';
import {prismaMock} from '../../singleton';

let server;
beforeEach(async () => {
  const app = express();
  await require('../../../src/loaders').default({expressApp: app});
  server = app.listen(8001);
});

afterEach(async () => {
  await server.close();
});

test('should return 200 for getting all products', async () => {
  const res = await request(server).get('/products');
  expect(res.status).toBe(200);
});

test('should return 200 for getting a product with sku', async () => {
  const sku = '555';
  const product = {
    id: 1,
    sku: `${sku}`,
    name: 'shoes',
    category: 'test',
    quantity: 123,
    price: 123,
  };

  prismaMock.product.findUnique.mockResolvedValue(product);
  const res = await request(server).get(`/products/${sku}`);
  expect(res.status).toBe(200);
  expect(res.body.sku).toEqual(sku);
});

test('should return 404 for if product is not found', async () => {
  const product = {
    id: 1,
    sku: '123',
    name: 'shoes',
    quantity: 123,
    price: 123,
  };
  prismaMock.product.findUnique.mockResolvedValue(null);
  const res = await request(server).get('/products/56');
  expect(res.status).toBe(404);
});

test('should return 201 when adding a product', async () => {
  const payload = {
    sku: '12345678',
    name: 'shirt',
    category: 'clothes',
    quantity: 2,
    price: 132,
  };
  const res = await request(server).post('/products').send(payload);
  expect(res.status).toBe(201);
});

test('should return 422 when adding an invalid product', async () => {
  const payload = {
    sku: '12345678',
    name: 'shirt',
    quantity: '2',
    price: '132',
  };
  const res = await request(server).post('/products').send(payload);
  expect(res.status).toBe(422);
});
