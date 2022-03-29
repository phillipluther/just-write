import { ReadResponse, ReadRequestOptions } from './crud.types';

type Post = {
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

interface PostsReadResponse extends ReadResponse<Post> {
  custom?: string;
}

interface PostsReadRequestOptions extends ReadRequestOptions {
  max: number;
}

export { Post, PostsReadResponse, PostsReadRequestOptions };
