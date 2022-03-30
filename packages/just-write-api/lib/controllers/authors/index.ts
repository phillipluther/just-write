import { Request, Response } from 'express';
import { CrudVerbs } from '../../../__types__';

const controllerStub = (req: Request, res: Response) => {
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
