import { Router, Request, Response, NextFunction } from 'express';
import { readPost, getAllPosts, createPost, updatePost, deletePost } from './controllers';

const router = Router();

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(readPost).put(updatePost).delete(deletePost);

export default router;

/**
 *
 * Request flow
 * ---
 * req --> API reqHandler --> ADAPTER middleware --> API resHandler --> res
 *
 * eg.
 *
 * GET /post/:id --> validate ID --> use ID to find post, passes --> responds
 *
 */
