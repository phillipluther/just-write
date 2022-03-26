import readPost from './read-post.middleware';

const contentAdapter = {
  posts: readPost,
};

export default contentAdapter;
