import prisma from '../../prisma';
import {Inject, Service} from 'typedi';
import {Logger} from 'winston';

@Service()
export default class UsersRepository {
  constructor(@Inject('logger') private logger: Logger) {}

  public async getUser(username: string) {
    const user = prisma.user.findFirst({where: {username: username}});
    return user;
  }
}
