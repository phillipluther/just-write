import { NextFunction, Response } from 'express';
import { AdapterRequest, AdapterCruds, CrudVerbs, Resources } from '../__types__';

const adapterStub = (req: AdapterRequest, res: Response, next: NextFunction) => {
  req.adapter = null;

  console.warn(
    '[just-write-api]',
    'No adapter specified; calls to the API will not effect content',
  );

  next();
};

const contentAdapter: AdapterCruds = Object.values(Resources).reduce(
  (acc: { [key: string]: any }, resource: string) => {
    acc[resource] = {};
    Object.values(CrudVerbs).forEach((method) => {
      acc[resource][method] = adapterStub;
    });

    return acc;
  },
  {},
);

export default contentAdapter;
