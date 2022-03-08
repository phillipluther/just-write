export type PostsList = {
  start: number;
  end: number;
  total: number;
  posts: string[];
};

export default async function getPosts(options = {}): Promise<PostsList> {
  return {
    start: 1,
    end: 50,
    total: 100,
    posts: [],
  };
}
