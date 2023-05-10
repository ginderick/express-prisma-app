import UsersRepository from '../repository/users';
import 'reflect-metadata';
import Container, {Inject, Service} from 'typedi';
import {Logger} from 'winston';

@Service()
export default class UsersService {
  constructor(
    @Inject('logger') private logger: Logger,
    private productsRepository = Container.get(UsersRepository)
  ) {}

  public async getUser(username: string) {
    this.logger.info('Getting user');
    const user = this.productsRepository.getUser(username);
    return user;
  }
}
