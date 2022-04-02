import { Response } from 'express';
import { AdapterRequest, CrudVerbs } from '$types';

const sendResponse = (req: AdapterRequest, res: Response, status: number = 200) => {
  console.log(
    '[just-write-api]',
    `${req.method} ${req.path} handled by ${req.adapter?.name} adapter`,
  );

  console.log('Adpt', req.adapter);
  res.status(status).send({ data: req.adapter?.data || {} });
};

export default function () {
  const controllers = {
    [CrudVerbs.CREATE]: (req: AdapterRequest, res: Response) => {
      sendResponse(req, res, 201);
    },
    [CrudVerbs.READ]: (req: AdapterRequest, res: Response) => {
      sendResponse(req, res);
    },
    [CrudVerbs.UPDATE]: (req: AdapterRequest, res: Response) => {
      sendResponse(req, res);
    },
    [CrudVerbs.DELETE]: (req: AdapterRequest, res: Response) => {
      sendResponse(req, res);
    },
  };

  return controllers;
}
