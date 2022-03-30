import { Request, RequestHandler } from 'express';
import { CrudVerbs } from './crud.types';
import { Resources } from './content.types';

export type AdapterCruds = {
  [key in CrudVerbs]?: RequestHandler;
};

export type AdapterRequest = Request & {
  adapter: 'string' | null;
};

export type ContentAdapter = {
  [key in Resources]: AdapterCruds;
};
