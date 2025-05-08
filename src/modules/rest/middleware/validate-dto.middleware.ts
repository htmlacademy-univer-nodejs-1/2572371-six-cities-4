import {Request, Response, NextFunction} from 'express';
import {ClassConstructor, plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import {StatusCodes} from 'http-status-codes';
import {MiddlewareInterface} from '../middleware.interface.js';

export class ValidateDtoMiddleware implements MiddlewareInterface {
  constructor(private dto: ClassConstructor<object>) {
  }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, req.body);

    if (!dtoInstance) {
      res.status(StatusCodes.BAD_REQUEST)
        .json({message: 'Invalid DTO instance'});
      return;
    }

    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      res.status(StatusCodes.BAD_REQUEST)
        .json({
          message: 'Validation error',
          errors: errors.map((error) => ({
            property: error.property,
            constraints: error.constraints
          }))
        });
      return;
    }

    next();
  }
}
