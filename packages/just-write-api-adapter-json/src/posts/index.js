import getAllPosts from './get-all-posts';
import getPost from './get-post';
import createPost from './create-post';

const posts = {
  create: createPost,
  read: (id, options = {}) => {
    if (id) {
      return getPost(id);
    }

    return getAllPosts(options);
  },
  update: async function (requestObj) {
    console.log('[json-adapter] posts.update');
    return requestObj;
  },
  delete: async function (requestObj) {
    console.log('[json-adapter] posts.delete');
    return requestObj;
  },
};

export default posts;
