import UsersRepository from '../repository/users';
import 'reflect-metadata';
import Container, {Inject, Service} from 'typedi';
import {Logger} from 'winston';
import bcrypt from 'bcrypt';

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

  public async addUser(body: any) {
    this.logger.info('Adding user');

    const hashed_password = await bcrypt.hash(body.password, 10);

    const {password, ...hashedUser} = body;
    hashedUser.hashed_password = hashed_password;

    const user = await this.productsRepository.addUser(hashedUser);
    return user;
  }
}
