import { Router } from 'express';
import postsRouter from './resources/posts/posts.router';

export default function (contentAdapter: any) {
  const router = Router();
  router.use('/posts', contentAdapter.posts, postsRouter);

  return router;
}
