import config from '../../config';
import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import {localStrategy} from '../../strategies/localStrategy';

passport.use('local', localStrategy);

export function authenticate() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization!.split(' ')[1];
      jwt.verify(token, config.token.privateJWTKey!);
      next();
    } catch (error) {
      return res.status(401).json({message: 'Authentication failed'});
    }
  };
}

export const authenticateMultiple = (strategies: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(strategies, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({error: info || 'Authentication failed'});
      }

      const {hashed_password, email, ...userInfo} = user;
      req.user = userInfo;
      return next();
    })(req, res, next);
  };
};
