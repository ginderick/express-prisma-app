import request from 'supertest';
import express from 'express';
import 'reflect-metadata';

let server;
beforeEach(async () => {
  const app = express();
  await require('../../../src/loaders').default({expressApp: app});
  server = app.listen(8001);
});

afterEach(async () => {
  await server.close();
});

test('should return 200 with login', async () => {
  const payload = {
    username: 'ginderick',
    password: 'test123',
  };
  const res = await request(server).post('/users/login').send(payload);
  expect(res.status).toBe(200);
});
