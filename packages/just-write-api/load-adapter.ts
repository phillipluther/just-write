export default async function (name?: string) {
  try {
    const contentAdapter = await import(name || './resources/adapter-stubs');

    if (!name) {
      console.warn('[just-write-api]', `No content adapter specified so the API won't do much`);
    } else {
      console.log(`[just-write-api] Content adapter middleware (${name}) successfully loaded`);
    }

    return contentAdapter;
  } catch (err) {
    //
    // logging
    //
    console.error(err);
  }
}
