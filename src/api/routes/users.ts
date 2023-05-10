import TokenService from '../../services/token';
import UsersService from '../../services/users';
import {NextFunction, Request, Response, Router} from 'express';
import Container from 'typedi';
import middlewares from '../middlewares';
import {LoginUserSchema, UserSchema} from '../../schema/UserSchema';

const route = Router();

const users = (app: Router) => {
  app.use('/users', route);

  route.post(
    '/',
    middlewares.validateRequest({body: UserSchema}),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const usersService = Container.get(UsersService);
        const user = await usersService.addUser(req.body);
        return res.status(201).json({
          email: user.email,
        });
      } catch (error) {
        return next(error);
      }
    }
  );

  route.post(
    '/login',
    middlewares.validateRequest({body: LoginUserSchema}),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const tokenService = Container.get(TokenService);
        const usersService = Container.get(UsersService);

        const username = req.body.username;
        const password = req.body.password;

        const user = await usersService.getUser(username);
        if (!user) return res.status(401).send({error: 'Unauthorized'});
        const token = await tokenService.generateAccessToken(username);
        const refreshToken = await tokenService.generateAccessToken(username);
        return res.status(200).json({access_token: token, refresh_token: refreshToken});
      } catch (error) {
        return next(error);
      }
    }
  );
};

export default users;
