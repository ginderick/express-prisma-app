import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import prisma from 'prisma';
import bcrypt from 'bcrypt';

passport.use(
  'local',
  new LocalStrategy(async function verify(username, password, done) {
    try {
      const user: any = prisma.user.findFirst({where: {username: username}});
      const result = await bcrypt.compare(password, user.hashed_password);
      if (!user || !result) {
        return done(null, false, {message: 'Invalid email or password'});
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
