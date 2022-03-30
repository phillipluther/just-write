# Content Adapters

Adapters tell the API how to interact with a content source, such as Markdown files or a Wordpress CMS.

## Creating an Adapter

Content adapters for the `just-write-api` should provide CRUD handlers for each blog resource: posts, tags, pages, and authors [list will probably grow, too]. The API is expecting a single default export that looks like this:

```
{
  posts: {
    create: function(requestObj) { ... },
    read: function(requestObj) {
      if (requestObj.params.id) {
        // get a single resource
      } else {
        // get many resources
      }
    },
    update: function(requestObj) { ... },
    delete: function(requestObj) { ... },
  },
  tags: {
    create: function(requestObj) { ... },
    read: function(requestObj) {
      if (requestObj.params.id) {
        // get one resource
      } else {
        // get many resources
      }
    },
    update: function(requestObj) { ... },
    delete: function(requestObj) { ... },
  },
  // etc. for each resource type
}
```

### API Routes/Endpoint Mapping

Using CRUD handlers provided by the content adapter, the API exposes a small set of critical endpoints for managing resources.

Using the `posts` object from the exactly adapter above:

```
GET /posts          <--> posts.read
GET /posts/:id      <--> posts.read

POST /posts         <--> posts.create

PUT /posts/:id      <--> posts.update
UPDATE /posts/:id   <--> posts.update

DELETE /posts/:id   <--> posts.delete

```
