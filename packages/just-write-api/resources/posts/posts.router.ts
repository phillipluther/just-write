import { Router } from 'express';
import { getPost, getAllPosts, createPost, updatePost, deletePost } from './controllers';

const router = Router();

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getPost).put(updatePost).delete(deletePost);

export default router;
