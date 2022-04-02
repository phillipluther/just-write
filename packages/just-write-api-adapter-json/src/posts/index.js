import getAllPosts from './get-all-posts';
import getPost from './get-post';

const posts = {
  create: () => {},
  read: (req) => {
    if (req.params.id) {
      getPost(req);
    } else {
      getAllPosts(req);
    }
  },
  update: () => {},
  delete: () => {},
};

export default posts;
