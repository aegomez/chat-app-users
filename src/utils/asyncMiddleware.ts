import { Request, Response, NextFunction } from 'express';

/**
 * A wrapper around Promise-based middleware.
 */
export const asyncMiddleware = (fn: Function) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
