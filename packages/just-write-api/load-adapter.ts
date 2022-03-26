export default async function (name?: string) {
  try {
    const contentAdapter = await import(name || './resources/posts/middleware');

    if (!name) {
      console.warn(
        '[just-write-api]',
        `No adapter specified; the API won't do much without an adapter to manage content`,
      );
    } else {
      console.log('[just-write-api] Adapter middleware successfully loaded');
    }

    return contentAdapter;
  } catch (err) {
    //
    // logging
    //
    console.error(err);
  }
}
