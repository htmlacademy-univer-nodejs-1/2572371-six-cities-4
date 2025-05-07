import { Request, Response, NextFunction } from 'express';
import { MiddlewareInterface } from './middleware.interface.js';

export interface RouteInterface {
  path: string;
  method: 'get' | 'post' | 'delete' | 'patch' | 'put';
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: MiddlewareInterface[];
}
