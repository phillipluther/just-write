import { Request, Response } from 'express';
import { CrudVerbs } from '../../../__types__';
import createPost from './create-post';
import getPost from './get-post';
import getAllPosts from './get-all-posts';
import updatePost from './update-post';
import deletePost from './delete-post';

const postControllers = {
  [CrudVerbs.CREATE]: createPost,
  [CrudVerbs.READ]: (req: Request, res: Response) => {
    if (req.params.id) {
      return getPost(req, res);
    }

    return getAllPosts(req, res);
  },
  [CrudVerbs.UPDATE]: updatePost,
  [CrudVerbs.DELETE]: deletePost,
};

export { createPost, getPost, getAllPosts, updatePost, deletePost };
export default postControllers;
