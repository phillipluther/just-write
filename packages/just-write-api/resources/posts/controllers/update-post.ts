import { Request, Response } from 'express';

export default function updatePost(req: Request, res: Response) {
  const { id } = req.params;
  const post = req.body;

  console.log('updatePost()', id);

  res.status(200).send(post);
}
