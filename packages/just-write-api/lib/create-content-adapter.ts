import { Response, NextFunction } from 'express';
import {
  AdapterRequest,
  ContentAdapter,
  ContentAdapterInput,
  CrudVerbs,
  HttpVerbs,
  Resources,
} from '$types';

export default async function (name?: string): Promise<ContentAdapter> {
  try {
    const { default: sourcePlugin } = await import(
      name || './content-adapter/content-adapter-stubs'
    );

    if (!name) {
      console.warn('[just-write-api]', `No content adapter specified`);
    } else {
      console.log(`[just-write-api] Content adapter middleware (${name}) successfully loaded`);
    }

    // @ts-ignore
    const contentAdapter: ContentAdapter = Object.values(Resources).reduce(
      (acc: ContentAdapter, resource: Resources) => {
        acc[resource] = {};

        for (let crudVerb of Object.values(CrudVerbs)) {
          acc[resource][crudVerb] = (req: AdapterRequest, res: Response, next: NextFunction) => {
            const contentAdapterInput: ContentAdapterInput = {
              method: req.method as HttpVerbs,
              url: req.url,
              host: req.hostname,
              endpoint: req.path,
              headers: req.headers,
              params: req.params,
              body: req.body,
            };

            req.adapter = {
              name: name || null,
              data: sourcePlugin[resource][crudVerb](contentAdapterInput),
            };

            next();
          };
        }

        return acc;
      },
      {},
    );

    return contentAdapter;
  } catch (err) {
    //
    // logging
    //
    console.log('[just-write-api]', `Could not load '${name}' as a content adapter`);
    console.error(err);
  }
}
