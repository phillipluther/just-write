import { Request, Response } from 'express';
import { Post } from '../posts.types';

export default function createPost(req: Request, res: Response) {
  const post: Post = req.body;

  console.log('getPost()', post);
  res.status(201).send({ data: post });
}
