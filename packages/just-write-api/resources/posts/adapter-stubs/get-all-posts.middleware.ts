import { Response, NextFunction } from 'express';
import { AdapterRequest } from '../../../__types__';

export default function (req: AdapterRequest, res: Response, next: NextFunction) {
  console.log('getAllPosts() pass-through');
  next();
}
