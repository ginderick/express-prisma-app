import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import prisma from '../../../prisma';
import config from '../../config';

const jwtOptions = {
  secretOrKey: config.token.privateJWTKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

type Payload = {
  user: string;
  iat: number;
  exp: number;
};

export const jwtStrategy = new JwtStrategy(jwtOptions, async (payload: Payload, done: any) => {
  try {
    const user = await prisma.user.findUnique({where: {username: payload.user}});
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});