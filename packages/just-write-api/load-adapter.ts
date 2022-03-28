export default async function (name?: string) {
  try {
    const contentAdapter = await import(name || './resources/posts/adapter-stubs');

    if (!name) {
      console.warn('[just-write-api]', `No content adapter specified so the API won't do much`);
    } else {
      console.log('[just-write-api] Content adapter middleware successfully loaded');
    }

    return contentAdapter;
  } catch (err) {
    //
    // logging
    //
    console.error(err);
  }
}
