export default {
  posts: {
    create: async function (requestObj) {
      console.log('[markdown-adapter] posts.create');
      return requestObj;
    },
    read: async function (requestObj) {
      console.log('[markdown-adapter] posts.read');
      return requestObj;
    },
    update: async function (requestObj) {
      console.log('[markdown-adapter] posts.update');
      return requestObj;
    },
    delete: async function (requestObj) {
      console.log('[markdown-adapter] posts.delete');
      return requestObj;
    },
  },
  tags: {
    create: async function (requestObj) {
      console.log('[markdown-adapter] tags.create');
      return requestObj;
    },
    read: async function (requestObj) {
      console.log('[markdown-adapter] tags.read');
      return requestObj;
    },
    update: async function (requestObj) {
      console.log('[markdown-adapter] tags.update');
      return requestObj;
    },
    delete: async function (requestObj) {
      console.log('[markdown-adapter] tags.delete');
      return requestObj;
    },
  },
  authors: {
    create: async function (requestObj) {
      console.log('[markdown-adapter] authors.create');
      return requestObj;
    },
    read: async function (requestObj) {
      console.log('[markdown-adapter] authors.read');
      return requestObj;
    },
    update: async function (requestObj) {
      console.log('[markdown-adapter] authors.update');
      return requestObj;
    },
    delete: async function (requestObj) {
      console.log('[markdown-adapter] authors.delete');
      return requestObj;
    },
  },
};
