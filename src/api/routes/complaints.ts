import ComplaintsService from '../../services/complaints';
import {Router, Request, Response, NextFunction} from 'express';
import Container from 'typedi';
import {Logger} from 'winston';

const route = Router();

const complaints = (app: Router) => {
  app.use('/complaints', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const complaintsService = Container.get(ComplaintsService);
      const complaints = await complaintsService.getComplaints();
      return res.status(200).json(complaints);
    } catch (error) {
      return next(error);
    }
  });

  route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const complaintsService = Container.get(ComplaintsService);
      const complaint = await complaintsService.createComplaint();
      return res.status(201).json(complaint);
    } catch (error) {
      return next(error);
    }
  });
};

export default complaints;
