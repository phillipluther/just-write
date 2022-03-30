import { Router } from 'express';
import { ContentAdapter, Resources, HttpVerbs, CrudVerbs, AdapterCruds } from './__types__';

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
    const { default: controllers } = await import(`./resources/${resource}/controllers`);
    const middleware = contentAdapter[resource];
    const resourceRoute = `/${resource}`;
    const singleResourceRoute = `/${resource}/:id`;

    // create
    router[HttpVerbs.CREATE](
      resourceRoute,
      middleware[CrudVerbs.CREATE],
      controllers[CrudVerbs.CREATE],
    );
    // read
    router[HttpVerbs.READ](resourceRoute, middleware[CrudVerbs.READ], controllers[CrudVerbs.READ]);
    router[HttpVerbs.READ](
      singleResourceRoute,
      middleware[CrudVerbs.READ],
      controllers[CrudVerbs.READ],
    );
    // update
    router[HttpVerbs.UPDATE](
      singleResourceRoute,
      middleware[CrudVerbs.UPDATE],
      controllers[CrudVerbs.UPDATE],
    );
    // delete
    router[HttpVerbs.DELETE](
      singleResourceRoute,
      middleware[CrudVerbs.DELETE],
      controllers[CrudVerbs.DELETE],
    );
  }

  return router;
}
