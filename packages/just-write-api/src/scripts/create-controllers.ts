import { Response, NextFunction } from 'express';
import { AdapterRequest, CrudVerbs } from '$types';

function handleRequest(
  req: AdapterRequest,
  res: Response,
  next: NextFunction,
  status: number = 200,
) {
  console.log(
    '[just-write-api]',
    `${req.method} ${req.path} handled by ${req.adapter?.name} adapter`,
  );

  const data = req.adapter?.data || {};
  res.status(status).send({ data });
}

export default function () {
  const controllers = {
    [CrudVerbs.CREATE]: (req: AdapterRequest, res: Response, next: NextFunction) =>
      handleRequest(req, res, next, 201),
    [CrudVerbs.READ]: handleRequest,
    [CrudVerbs.UPDATE]: handleRequest,
    [CrudVerbs.DELETE]: handleRequest,
  };

  return controllers;
}
