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
          user,
        });
      } catch (error) {
        return next(error);
      }
    }
  );
};

export default users;
