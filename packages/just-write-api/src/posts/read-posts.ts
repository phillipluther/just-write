import { Post, ReadOptions } from './types';

export default async function readPosts(postId: string | ReadOptions): Promise<Post> {
  console.log('READ');
  return {
    id: '12345A',
    title: 'Dummy Post',
    published: '2022-03-08',
    content: {
      raw: '#Fake Markdown!',
      parsed: '<h1>Fake Markdown!</h1>',
    },
  };
}
