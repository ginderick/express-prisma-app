import {Router, Request, Response, NextFunction} from 'express';

const route = Router();

const complaints = (app: Router) => {
  app.use('/complaints', route);

  route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({Hello: 'world'});
  });
};

export default complaints;
