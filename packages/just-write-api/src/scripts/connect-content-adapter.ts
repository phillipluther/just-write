import { Response, NextFunction } from 'express';
import {
  AdapterRequest,
  ContentAdapter,
  ContentAdapterInput,
  CrudVerbs,
  HttpVerbs,
  Resources,
  SourcePlugin,
} from '$types';

export default async function (adapterName?: string): Promise<ContentAdapter | null> {
  try {
    function handleError(err: any, res: Response) {
      console.log('[just-write-api]', `Error in ${adapterName} adapter`);
      console.error(err);

      // additional logging?

      res.status(500).end();
    }

    function addAdapterData(req: AdapterRequest, next: NextFunction) {
      req.adapter = {
        name: adapterName || null,
        data: req.adapter?.data || {},
      };

      next();
    }

    const adapterPackage = `just-write-api-adapter-${adapterName}`;
    const { default: sourcePlugin }: { default: SourcePlugin } = await import(
      adapterPackage || './content-adapter/content-adapter-stubs'
    );

    if (!adapterName) {
      console.warn('[just-write-api]', `No content adapter specified`);
    } else {
      console.log(
        `[just-write-api] Content adapter middleware (${adapterName}) successfully loaded`,
      );
    }

    const contentAdapter: ContentAdapter = {
      posts: {},
      tags: {},
      authors: {},
    };

    for (let resource of Object.values(Resources)) {
      contentAdapter[resource] = {};

      contentAdapter[resource][CrudVerbs.CREATE] = async (
        req: AdapterRequest,
        res: Response,
        next: NextFunction,
      ) => {
        try {
          const adapterAction = sourcePlugin[resource][CrudVerbs.CREATE];
          const data = adapterAction ? await adapterAction(req.body) : null;

          req.adapter = {
            name: adapterName || null,
            data,
          };

          next();
        } catch (err) {
          handleError(err, res);
        }
      };

      contentAdapter[resource][CrudVerbs.READ] = async (
        req: AdapterRequest,
        res: Response,
        next: NextFunction,
      ) => {
        try {
          const adapterAction = sourcePlugin[resource][CrudVerbs.READ];
          const data = adapterAction ? await adapterAction(req.params.id) : null;

          req.adapter = {
            name: adapterName || null,
            data,
          };

          next();
        } catch (err) {
          handleError(err, res);
        }
      };

      contentAdapter[resource][CrudVerbs.UPDATE] = async (
        req: AdapterRequest,
        res: Response,
        next: NextFunction,
      ) => {
        try {
          const adapterAction = sourcePlugin[resource][CrudVerbs.UPDATE];
          const data = adapterAction ? await adapterAction(req.params.id, req.body) : null;

          req.adapter = {
            name: adapterName || null,
            data,
          };

          next();
        } catch (err) {
          handleError(err, res);
        }
      };

      contentAdapter[resource][CrudVerbs.DELETE] = async (
        req: AdapterRequest,
        res: Response,
        next: NextFunction,
      ) => {
        try {
          const adapterAction = sourcePlugin[resource][CrudVerbs.DELETE];
          const data = adapterAction ? await adapterAction(req.params.id) : null;

          req.adapter = {
            name: adapterName || null,
            data,
          };

          next();
        } catch (err) {
          handleError(err, res);
        }
      };
    }

    return contentAdapter as ContentAdapter;
  } catch (err) {
    //
    // logging
    //
    console.log('[just-write-api]', `Could not load '${adapterName}' as a content adapter`);
    console.error(err);
  }

  return null;
}
