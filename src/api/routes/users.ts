import TokenService from '../../services/token';
import {NextFunction, Request, Response, Router} from 'express';
import Container from 'typedi';

const route = Router();

const users = (app: Router) => {
  app.use('/users', route);

  route.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenService = Container.get(TokenService);
      const token = await tokenService.generateAccessToken('ginderick');
      const refreshToken = await tokenService.generateAccessToken('ginderick');
      return res.status(200).json({access_token: token, refresh_token: refreshToken});
    } catch (error) {
      return next(error);
    }
  });
};

export default users;
