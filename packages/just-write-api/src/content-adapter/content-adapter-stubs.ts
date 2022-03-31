import { AdapterCruds, ContentAdapterInput, CrudVerbs, Resources } from '$types';

const contentAdapter: AdapterCruds = Object.values(Resources).reduce(
  (acc: { [key: string]: any }, resource: string) => {
    acc[resource] = {};
    Object.values(CrudVerbs).forEach((method) => {
      acc[resource][method] = async (requestObj: ContentAdapterInput) => {
        console.warn(
          '[just-write-api]',
          `No content adapter specified for ${requestObj.method.toUpperCase()} ${
            requestObj.endpoint
          }`,
        );

        return null;
      };
    });

    return acc;
  },
  {},
);

export default contentAdapter;
