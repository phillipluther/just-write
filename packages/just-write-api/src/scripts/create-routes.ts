import { RequestHandler, Router } from 'express';
import { ContentAdapter, Resources, HttpVerbs, CrudVerbs } from '$types';

export default async function (contentAdapter: ContentAdapter) {
  const router = Router();

  /**
   * GET /resource          <--> adapter.resource.read
   * GET /resource/:id      <--> adapter.resource.read
   *
   * POST /resource         <--> adapter.resource.create
   *
   * PUT /resource/:id      <--> adapter.resource.update
   *
   * UPDATE /resource/:id   <--> adapter.resource.update
   * DELETE /resource/:id   <--> adapter.resource.delete
   */

  for (let resource of Object.values(Resources)) {
    const { default: controllers } = await import(`../controllers/${resource}`);
    const middleware = contentAdapter[resource];
    const resourceRoute = `/${resource}`;
    const singleResourceRoute = `/${resource}/:id`;

    // create
    router[HttpVerbs.CREATE](
      resourceRoute,
      middleware[CrudVerbs.CREATE] as RequestHandler,
      controllers[CrudVerbs.CREATE],
    );
    // read
    router[HttpVerbs.READ](
      resourceRoute,
      middleware[CrudVerbs.READ] as RequestHandler,
      controllers[CrudVerbs.READ],
    );
    router[HttpVerbs.READ](
      singleResourceRoute,
      middleware[CrudVerbs.READ] as RequestHandler,
      controllers[CrudVerbs.READ],
    );
    // update
    router[HttpVerbs.UPDATE](
      singleResourceRoute,
      middleware[CrudVerbs.UPDATE] as RequestHandler,
      controllers[CrudVerbs.UPDATE],
    );
    // delete
    router[HttpVerbs.DELETE](
      singleResourceRoute,
      middleware[CrudVerbs.DELETE] as RequestHandler,
      controllers[CrudVerbs.DELETE],
    );
  }

  // 401 fallback/catch-all for anything that doesn't match
  router.use('*', (req, res) => {
    res.status(401).send('Method not supported');
  });

  return router;
}
