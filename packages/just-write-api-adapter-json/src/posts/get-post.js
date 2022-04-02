import { readFile, writeFile } from 'fs/promises';

export default async function ({ params: { id } }) {
  return {
    id,
    title: 'The Post Title',
    summary: 'A summary of the post',
    published: '2022-04-02',
    content: 'ok',
  };
}
