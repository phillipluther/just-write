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

export default async function (name?: string): Promise<ContentAdapter | null> {
  try {
    const { default: sourcePlugin }: { default: SourcePlugin } = await import(
      name || './content-adapter/content-adapter-stubs'
    );

    if (!name) {
      console.warn('[just-write-api]', `No content adapter specified`);
    } else {
      console.log(`[just-write-api] Content adapter middleware (${name}) successfully loaded`);
    }

    const contentAdapter: ContentAdapter = {
      posts: {},
      tags: {},
      authors: {},
    };

    for (let resource of Object.values(Resources)) {
      contentAdapter[resource] = {};

      for (let verb of Object.values(CrudVerbs)) {
        contentAdapter[resource][verb] = async (
          req: AdapterRequest,
          res: Response,
          next: NextFunction,
        ) => {
          const contentAdapterInput: ContentAdapterInput = {
            method: req.method as HttpVerbs,
            url: req.url,
            host: req.hostname,
            endpoint: req.path,
            headers: req.headers,
            params: req.params,
            body: req.body,
          };

          const getSourceData = await sourcePlugin[resource][verb];
          const data = getSourceData ? getSourceData(contentAdapterInput) : null;

          req.adapter = {
            name: name || null,
            data,
          };

          next();
        };
      }
    }

    return contentAdapter as ContentAdapter;
  } catch (err) {
    //
    // logging
    //
    console.log('[just-write-api]', `Could not load '${name}' as a content adapter`);
    console.error(err);
  }

  return null;
}
