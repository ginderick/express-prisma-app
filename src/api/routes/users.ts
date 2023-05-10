import {NextFunction, Request, Response, Router} from 'express';

const route = Router();

const users = (app: Router) => {
  app.use('/users', route);

  route.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const test = {hello: 'World'};
      return res.status(200).json(test);
    } catch (error) {
      return next(error);
    }
  });
};

export default users;
