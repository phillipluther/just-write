import { Request, Response } from 'express';
import { Post } from '../../../__types__';

export default function createPost(req: Request, res: Response) {
  const post: Post = req.body;

  console.log('createPost()', post);
  res.status(201).send({ data: post });
}
