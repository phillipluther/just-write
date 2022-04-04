export enum Resources {
  POSTS = 'posts',
  TAGS = 'tags',
  AUTHORS = 'authors',
}

export type Post = {
  id: string;
  title: string;
  summary?: string;
  published: string;
  updated?: string[];
  image?: string;
  tags?: string[];
  content: string;
  slug?: string;
  metadata?: {
    [key: string]: any;
  };
};
