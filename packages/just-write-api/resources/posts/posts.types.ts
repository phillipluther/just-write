import { ReadResponse, ReadRequestOptions } from '@types';

type Post = {
  id: string;
  title: string;
  summary?: string;
  published: string;
  image?: string;
  updated?: string[];
  tags?: string[];
  content: string;
  metadata?: {
    [key: string]: any;
  };
};

interface PostsReadResponse extends ReadResponse<Post> {
  custom?: string;
}

interface PostsReadRequestOptions extends ReadRequestOptions {
  max: number;
}

export { Post, PostsReadResponse, PostsReadRequestOptions };
