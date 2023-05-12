import request from 'supertest';
import express from 'express';
import 'reflect-metadata';
import {prismaMock} from '../../singleton';
import {user, loginPayload} from '../../utils/utils';

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
  prismaMock.user.findFirst.mockResolvedValue(user);
  const res = await request(server).post('/users/login').send(loginPayload);
  expect(res.status).toBe(200);
});
