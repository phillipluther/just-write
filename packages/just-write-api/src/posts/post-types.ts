import { ReadResponse } from '@types';

type Post = {
  id: string;
  title: string;
  published: string;
  summary?: string;
  updated?: string[];
  image?: string;
  tags?: string[];
  content: {
    raw: string;
    parsed: string;
  };
  metadata?: {
    [key: string]: any;
  };
};

interface PostsReadResponse extends ReadResponse<Post> {
  custom?: string;
}

type ReadOptions = {
  max: number;
};

export { Post, PostsReadResponse };
