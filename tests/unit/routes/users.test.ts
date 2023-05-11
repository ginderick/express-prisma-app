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

test('should return 200 with login', async () => {
  const user = {
    id: 1,
    username: 'ginderick7',
    email: 'ginderick@gmail.com',
    hashed_password: '$2b$10$HZZ71ccbvhImsgYt/SO7TOfFKKkwvu0viguSFbWNL0du95o6hJMo.',
  };

  prismaMock.user.findFirst.mockResolvedValue(user);
  const payload = {
    username: 'ginderick7',
    password: 'yahoomail123',
  };
  const res = await request(server).post('/users/login').send(payload);
  expect(res.status).toBe(200);
});
