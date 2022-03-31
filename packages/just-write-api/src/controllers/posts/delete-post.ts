import { Request, Response } from 'express';

export default function deletePost(req: Request, res: Response) {
  const { id } = req.params;

  console.log('deletePost()', id);

  res.status(200).send({});
}
