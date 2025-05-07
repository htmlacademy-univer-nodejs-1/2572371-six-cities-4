import { Request, Response, NextFunction } from 'express';

export interface ExceptionFilterInterface {
  catch(error: Error, req: Request, res: Response, next: NextFunction): void;
}
