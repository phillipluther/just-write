import { Request, Response } from 'express';

export default function getAllPosts(req: Request, res: Response) {
  const { params } = req;

  console.log('getAllPosts()', params);
  res.status(200).end();
}
