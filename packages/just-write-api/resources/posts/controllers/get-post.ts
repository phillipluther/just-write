import { Request, Response } from 'express';

export default function getPost(req: Request, res: Response) {
  const { params } = req;

  if (!params.id) {
    res.status(404).send(`ID ${params.id} not found`);
    return;
  }

  console.log('getPost()', params.id);
  res.status(200).end();
}
