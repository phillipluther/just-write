import { Request, Response, NextFunction } from 'express';

export default function (req: Request & { adapter: boolean }, res: Response, next: NextFunction) {
  req.adapter = false;
  console.log('readPost() pass-through');
  next();
}
