import { Request, RequestHandler, Response, NextFunction } from 'express';
import { IncomingHttpHeaders } from 'http';
import { CrudVerbs, HttpVerbs } from './crud.types';
import { Resources } from './resource.types';

export type AdapterCruds = {
  // TODO: too loose;
  [key in CrudVerbs]?: Function;
};

export type SourceCruds = {
  [key in CrudVerbs]?: Function;
};

export type ContentAdapterRequest = Request & {
  adapter?: {
    name: string | null;
    data: { [key: string]: any };
  };
};

export type ContentAdapter = {
  [key in Resources]: AdapterCruds;
};

export type SourcePlugin = {
  [key in Resources]: SourceCruds;
};

export type ContentAdapterInput = {
  method: HttpVerbs;
  protocol: string;
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
