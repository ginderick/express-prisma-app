import config from '../../config';
import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  tokenPayload: any;
}

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
