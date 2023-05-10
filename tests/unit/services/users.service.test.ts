import {prismaMock} from '../../singleton';
import UsersService from '../../../src/services/users';
import UsersRepository from '../../../src/repository/users';
import loggerInstance from '../../../src/loaders/logger';

test('should get user', async () => {
  const user = {
    id: 1,
    username: 'ginderick',
    email: 'ginderick@gmail.com',
    password: '123',
  };

  prismaMock.user.findFirst.mockResolvedValue(user);
  const logger = loggerInstance;
  const usersRepository = new UsersRepository(logger);
  const usersSerivce = new UsersService(logger, usersRepository);

  await expect(usersSerivce.getUser('ginderick')).resolves.toEqual(user);
});
