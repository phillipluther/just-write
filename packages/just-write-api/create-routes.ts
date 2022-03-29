import { Router } from 'express';
import { ContentAdapter, Resources, CrudMethods, CrudVerbs } from './__types__';
import { enumKeys } from './utils';

export default async function (contentAdapter: ContentAdapter) {
  const router = Router();
  const crudMethods = enumKeys(CrudMethods);
  const crudVerbs = enumKeys(CrudVerbs);
  const resources = enumKeys(Resources);

  resources.forEach((resource) => {
    crudVerbs.forEach((verb, index) => {
      const method = crudMethods[index];

      console.log(
        '[just-write-api]',
        `Creating route to ${method} ${resource} ... ${verb.toUpperCase()} /${resource}`,
      );
      // TODO: wtf, enums ... figure out how to glue this back together so TS knows that
      // the ver, which came from an enum type, is a member of the enum
      //
      router[verb](`/${resource}`, contentAdapter[resource][method], (req, res) => {
        res.status(200).send('OK');
      });
    });

    // wire up the "many" route ... tackle this when we sort out the enum stuff
    router.get(`/${resource}/:id`, contentAdapter[resource].read, (req, res) => {
      res.status(200).send('OK');
    });
  });

  return router;
}
