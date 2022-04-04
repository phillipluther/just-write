export default function (requestObj) {
  const { method, protocol, url, host, endpoint, headers, params, body } = requestObj;

  return {
    id: '',
    title: '',
    summary: '',
    published: '',
    updated: '',
    image: '',
    tags: '',
    content: '',
    slug: '',
    metadata: {},
  };
}
