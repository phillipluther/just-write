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

      for (let verb of Object.values(CrudVerbs)) {
        contentAdapter[resource][verb] = async (
          req: AdapterRequest,
          res: Response,
          next: NextFunction,
        ) => {
          try {
            const contentAdapterInput: ContentAdapterInput = {
              method: req.method as HttpVerbs,
              protocol: req.protocol,
              url: `${req.protocol}://${req.hostname}${req.url}`,
              host: req.hostname,
              endpoint: req.path,
              headers: req.headers,
              params: req.params,
              body: req.body,
            };

            const getSourceData = sourcePlugin[resource][verb];
            const data = getSourceData ? await getSourceData(contentAdapterInput) : null;

            req.adapter = {
              name: adapterName || null,
              data,
            };

            next();
          } catch (err) {
            console.log('[just-write-api]', `Error in ${adapterName} adapter`);
            console.error(err);

            // additional logging?

            res.status(500).end();
          }
        };
      }
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
