import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MiddlewareInterface } from '../middleware.interface.js';
import mongoose from 'mongoose';

export class ValidateObjectIdMiddleware implements MiddlewareInterface {
  constructor(private param: string) {}

  public execute(req: Request, res: Response, next: NextFunction): void {
    const objectId = req.params[this.param];

    if (!mongoose.Types.ObjectId.isValid(objectId)) {
      res.status(StatusCodes.BAD_REQUEST)
        .send(`${this.param} is invalid`);
      return;
    }

    next();
  }
}
