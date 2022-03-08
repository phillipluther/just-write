export type Post = {
  id: string;
  title: string;
  published: string;
  content: {
    raw: string;
    parsed: string;
  };
};

export default async function getPost(postId: string | null): Promise<Post> {
  console.log('get-post()');
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
