import readPost from './read-post.middleware';
import getAllPosts from './get-all-posts.middleware';
import deletePost from './delete-post.middleware';
import updatePost from './update-post.middleware';
import createPost from './create-post.middleware';

const contentAdapter = {
  posts: {
    create: {
      one: createPost,
      many: null,
    },
    read: {
      one: readPost,
      many: getAllPosts,
    },
    update: {
      one: updatePost,
      many: null,
    },
    delete: {
      one: deletePost,
      many: null,
    },
  },
};

export default contentAdapter;
