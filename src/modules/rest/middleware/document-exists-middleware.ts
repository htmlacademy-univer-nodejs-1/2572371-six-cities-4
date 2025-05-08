import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import mongoose from 'mongoose';
import {MiddlewareInterface} from '../middleware.interface.js';

export class DocumentExistsMiddleware implements MiddlewareInterface {
  constructor(
    private readonly exists: (id: mongoose.Types.ObjectId) => Promise<boolean>,
    private readonly entityName: string,
    private readonly paramName: string,
  ) {
  }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const {[this.paramName]: id} = req.params;

    const documentId = new mongoose.Types.ObjectId(id);
    const documentExists = await this.exists(documentId);

    if (!documentExists) {
      res.status(StatusCodes.NOT_FOUND).send({
        message: `${this.entityName} with id ${id} not found`
      });
      return;
    }

    next();
  }
}
