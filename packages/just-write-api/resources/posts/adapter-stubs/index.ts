import { NextFunction, Response } from 'express';
import { AdapterRequest, AdapterCruds, CrudMethods, Resources } from '../../../__types__';
import { enumKeys } from '../../../utils';

const adapterStub = (req: AdapterRequest, res: Response, next: NextFunction) => {
  req.adapter = null;

  console.warn(
    '[just-write-api]',
    'No content adapter specified; calls to the API will have no effect',
  );

  next();
};

const contentAdapter: AdapterCruds = enumKeys(Resources).reduce((acc, resource) => {
  acc[resource] = {};
  enumKeys(CrudMethods).forEach((method) => {
    acc[resource][method] = adapterStub;
  });

  return acc;
}, {});

export default contentAdapter;
