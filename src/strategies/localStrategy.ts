import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import prisma from '../../prisma';
import bcrypt from 'bcrypt';

export const localStrategy = new LocalStrategy(async function verify(username, password, done) {
  try {
    const user = await prisma.user.findUnique({where: {username: username}});
    const result = await bcrypt.compare(password, user!.hashed_password);
    if (!user || !result) {
      return done(null, false, {message: 'Invalid email or password'});
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
