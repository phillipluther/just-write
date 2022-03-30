import { Request, RequestHandler } from 'express';
import { IncomingHttpHeaders } from 'http';
import { CrudVerbs, HttpVerbs } from './crud.types';
import { Resources } from './content.types';

export type AdapterCruds = {
  [key in CrudVerbs]?: RequestHandler;
};

export type AdapterRequest = Request & {
  adapter: {
    name: string | null;
    data: { [key: string]: any };
  };
};

export type ContentAdapter = {
  [key in Resources]: AdapterCruds;
};

export type ContentAdapterInput = {
  method: HttpVerbs;
  url: string;
  host: string;
  endpoint: string;
  //
  // ... etc. ...
  //
  headers: IncomingHttpHeaders;
  params: { [key: string]: string };
  body: { [key: string]: string };
};
