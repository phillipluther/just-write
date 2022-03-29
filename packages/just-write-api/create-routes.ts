import { Request, Response } from 'express';
import { Router } from 'express';
import { ContentAdapter, Resources, CrudMethods, CrudVerbs } from './__types__';

// const resources = [Resources.Posts /*, Resources.Tags, Resources.Pages, Resources.Authors*/];
// const crudActions = [CrudMethods.Create, CrudMethods.Read, CrudMethods.Update, CrudMethods.Delete];

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

export default async function (contentAdapter: ContentAdapter) {
  const router = Router();

  console.log(contentAdapter);
  const routes = await Promise.all(
    Object.values(Resources).map((resource: Resources) => {
      for (const crudMethod in CrudMethods) {
        const crudVerb = CrudVerbs[crudMethod as CrudMethods];

        console.log(
          '[just-write-api]',
          `Building route to ${crudMethod.toLowerCase()} ${resource}:`,
          `${crudVerb.toUpperCase()} /${resource}`,
        );

        if (resource === 'posts') {
          // TODO: work through the enum tomfoolery
          // @ts-ignore
          router[crudVerb](`/${resource}`, contentAdapter[resource][crudMethod], (req, res) => {
            console.log('STUB');
            res.status(200).send('ok');
          });
        }
      }
    }),
  );

  // resources.forEach((resource) => {
  //   crudActions.forEach((crudAction) => {
  //     const singleResourceAction = contentAdapter[resource][crudAction].one;
  //     const multiResourceAction = contentAdapter[resource][crudAction].many;
  //     const verb = CrudVerbs[crudAction];
  //     //
  //     // imported routers should follow a similar mapping ... ?
  //     //

  //     console.log(`Building route to ${verb} one at /${resource}/:id`);
  //     router[verb](`/${resource}/:id`, singleResourceAction, (req: Request, res: Response) => {
  //       console.log('posts; one');
  //       res.status(200).send('ok');
  //     });

  //     if (multiResourceAction) {
  //       console.log(`Building route to ${verb} many at /${resource}`);
  //       router[verb](`/${resource}`, multiResourceAction, (req: Request, res: Response) => {
  //         console.log('posts; many');
  //         res.status(200).send('ok');
  //       });
  //     }
  //   });
  // });

  return router;
}
