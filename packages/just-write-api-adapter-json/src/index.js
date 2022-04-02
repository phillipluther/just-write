import posts from './posts';

export default {
  posts,
  tags: {
    create: async function (requestObj) {
      console.log('[json-adapter] tags.create');
      return requestObj;
    },
    read: async function (requestObj) {
      console.log('[json-adapter] tags.read');
      return requestObj;
    },
    update: async function (requestObj) {
      console.log('[json-adapter] tags.update');
      return requestObj;
    },
    delete: async function (requestObj) {
      console.log('[json-adapter] tags.delete');
      return requestObj;
    },
  },
  authors: {
    create: async function (requestObj) {
      console.log('[json-adapter] authors.create');
      return requestObj;
    },
    read: async function (requestObj) {
      console.log('[json-adapter] authors.read');
      return requestObj;
    },
    update: async function (requestObj) {
      console.log('[json-adapter] authors.update');
      return requestObj;
    },
    delete: async function (requestObj) {
      console.log('[json-adapter] authors.delete');
      return requestObj;
    },
  },
};
