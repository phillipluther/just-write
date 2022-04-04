import { Response } from 'express';
import { ContentAdapterRequest, CrudVerbs } from '$types';

const sendResponse = (req: ContentAdapterRequest, res: Response, status: number = 200) => {
  console.log(
    '[just-write-api]',
    `${req.method} ${req.path} handled by ${req.adapter?.name} adapter`,
  );

  res.status(status).send({ data: req.adapter?.data || {} });
};

export default function () {
  const controllers = {
    [CrudVerbs.CREATE]: (req: ContentAdapterRequest, res: Response) => {
      sendResponse(req, res, 201);
    },
    [CrudVerbs.READ]: (req: ContentAdapterRequest, res: Response) => {
      sendResponse(req, res);
    },
    [CrudVerbs.UPDATE]: (req: ContentAdapterRequest, res: Response) => {
      sendResponse(req, res);
    },
    [CrudVerbs.DELETE]: (req: ContentAdapterRequest, res: Response) => {
      sendResponse(req, res);
    },
  };

  return controllers;
}
