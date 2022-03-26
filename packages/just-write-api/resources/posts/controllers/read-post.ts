import { Request, Response, NextFunction } from 'express';

export default function getPost(req: Request, res: Response, next: NextFunction) {
  const { params } = req;

  if (!params.id) {
    res.status(404).send(`ID ${params.id} not found`);
    return;
  }

  console.log('getPost()', params.id);
  res.status(200).send(params.id);
}
