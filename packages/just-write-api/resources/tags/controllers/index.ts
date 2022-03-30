import { Response, NextFunction } from 'express';
import { AdapterRequest, CrudVerbs } from '../../../__types__';

const controllerStub = (req: AdapterRequest, res: Response, next?: NextFunction) => {
  console.log('Stubbed --|');
  res.status(200).send('Stubbed --|');
};

const controllerStubs = {
  [CrudVerbs.CREATE]: controllerStub,
  [CrudVerbs.READ]: controllerStub,
  [CrudVerbs.UPDATE]: controllerStub,
  [CrudVerbs.DELETE]: controllerStub,
};

export default controllerStubs;
