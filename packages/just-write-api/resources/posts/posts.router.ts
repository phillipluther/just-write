import { Router, Request, Response, NextFunction } from 'express';
import { readPost, getAllPosts, createPost, updatePost, deletePost } from './controllers';

const router = Router();

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(readPost).put(updatePost).delete(deletePost);

export default router;
