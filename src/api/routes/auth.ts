import {NextFunction, Request, Response, Router} from 'express';

const route = Router();

const auth = (app: Router) => {
  app.use('/auth', route);

  route.get('/login', async (req: Request, res: Response, next: NextFunction) => {
    res.send('login');
  });
};

export default auth;
