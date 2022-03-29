import { Request, RequestHandler } from 'express';
import { CrudMethods } from './crud.types';

export type AdapterCruds = {
  [key in CrudMethods]?: RequestHandler;
};

export type AdapterRequest = Request & {
  adapter: 'string' | null;
};

export type ContentAdapter = {
  posts: AdapterCruds;
  tags: AdapterCruds;
  pages: AdapterCruds;
  authors: AdapterCruds;
};
