import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

export default async function (postData) {
  const contentDir = path.resolve(process.cwd(), 'content/posts');
  const id = nanoid();
  const filepath = path.join(contentDir, `${id}.post.json`);
  const newPost = {
    ...postData,
    id,
    published: new Date(),
  };

  await mkdir(contentDir, { recursive: true });
  await writeFile(filepath, JSON.stringify(newPost));
  return newPost;
}
