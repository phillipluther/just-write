import { PostsReadResponse } from './posts/post-types';

function go(): PostsReadResponse {
  const post = {
    id: '123abc',
    title: 'The Post',
    published: new Date().toString(),
    content: {
      raw: 'ok',
      parsed: 'ok',
    },
  };

  const res = {
    status: 200,
    reason: 'OK',
    data: [post],
  };

  return res;
}

console.log(go());
