import {Service} from 'typedi';
import jwt from 'jsonwebtoken';
import config from '../config';

@Service()
export default class TokenService {
  public async generateAccessToken(user: string) {
    const token = jwt.sign(
      {
        user: user,
      },
      config.token.privateJWTKey!,
      {
        expiresIn: '30m',
      }
    );

    return token;
  }
}
