import {prismaMock} from '../../singleton';
import UsersService from '../../../src/services/users';
import UsersRepository from '../../../src/repository/users';
import loggerInstance from '../../../src/loaders/logger';
import {user} from '../../utils/utils';

test('should get user', async () => {
  prismaMock.user.findFirst.mockResolvedValue(user);
  const logger = loggerInstance;
  const usersRepository = new UsersRepository(logger);
  const usersSerivce = new UsersService(logger, usersRepository);

  await expect(usersSerivce.getUser('ginderick')).resolves.toEqual(user);
});
