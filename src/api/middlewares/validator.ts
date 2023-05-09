import LoggerInstance from '../../loaders/logger';
import {NextFunction, Request, Response} from 'express';
import {loggers} from 'winston';
import {AnyZodObject, ZodError} from 'zod';

export default interface RequestValidators {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
}

export function validateRequest(validators: RequestValidators) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const zodError = JSON.parse(error.message);
        res.status(422).json({message: zodError});
        LoggerInstance.info(`Validation failed: ${zodError[0].message}`);
        return;
      }
      LoggerInstance.error(error);
      next(error);
    }
  };
}
