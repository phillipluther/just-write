import getPosts from './get-all-posts';
import getPost from './read-posts';

const create = async () => {
  console.log('CREATE');
};

const read = async (postId: string | null = null) => (postId ? getPost(postId) : getPosts);

export { read, create };
