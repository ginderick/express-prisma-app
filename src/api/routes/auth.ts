import {NextFunction, Request, Response, Router} from 'express';
import middlewares from '../middlewares';
import {LoginUserSchema} from '../../schema/UserSchema';
import Container from 'typedi';
import TokenService from '../../services/token';

const route = Router();

const auth = (app: Router) => {
  app.use('/auth', route);

  route.post(
    '/login',
    middlewares.validateRequest({body: LoginUserSchema}),
    middlewares.authenticateMultiple(['local']),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const tokenService = Container.get(TokenService);

        const user: any = req.user;

        const token = await tokenService.generateAccessToken(user.username);
        const refreshToken = await tokenService.generateRefreshToken(user.username);
        return res.status(200).json({access_token: token, refresh_token: refreshToken});
      } catch (error) {
        return next(error);
      }
    }
  );
};

export default auth;
