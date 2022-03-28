import { Request, Response } from 'express';
import { Router } from 'express';
import postsRouter from './resources/posts/posts.router';
import { ContentAdapter, Resources, CrudMethods, CrudVerbs } from './__types__';

const resources = [Resources.Posts /*, Resources.Tags, Resources.Pages, Resources.Authors*/];
const crudActions = [CrudMethods.Create, CrudMethods.Read, CrudMethods.Update, CrudMethods.Delete];

const stub = (req: Request, res: Response) => {
  console.log('Stubbed');
  res.status(200).send('OK');
};

// TODO: automate this ... map over resources and import() controllers?
const controllers = {
  [Resources.Posts]: {
    one: (req: Request, res: Response) => {
      console.log('posts; one');
      res.status(200).send('ok');
    },
    many: (req: Request, res: Response) => {
      console.log('posts; many');
      res.status(200).send('ok');
    },
  },
  [Resources.Tags]: stub,
  [Resources.Pages]: stub,
  [Resources.Authors]: stub,
};

export default function (contentAdapter: ContentAdapter) {
  const router = Router();

  resources.forEach((resource) => {
    crudActions.forEach((crudAction) => {
      const singleResourceAction = contentAdapter[resource][crudAction].one;
      const multiResourceAction = contentAdapter[resource][crudAction].many;
      const verb = CrudVerbs[crudAction];
      //
      // imported routers should follow a similar mapping ... ?
      //

      console.log(`Building route to ${verb} one at /${resource}/:id`);
      router[verb](`/${resource}/:id`, singleResourceAction, (req: Request, res: Response) => {
        console.log('posts; one');
        res.status(200).send('ok');
      });

      if (multiResourceAction) {
        console.log(`Building route to ${verb} many at /${resource}`);
        router[verb](`/${resource}`, multiResourceAction, (req: Request, res: Response) => {
          console.log('posts; many');
          res.status(200).send('ok');
        });
      }
    });
  });

  return router;
}
