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

export { Post };
