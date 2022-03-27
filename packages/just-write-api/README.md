# just-write-api

> It's all WIP. So very, very WIP.

## The General Idea

The `just-write-api` provides an interface for creating, editing, and managing simple blog posts. It's goal is to normal data-in/-out to a client and is powered by adapters (better name incoming?), middleware that interacts with a content source.

### Request Flow

1. Client request -->
1. API route+verb -->
1. API-to-adapter handoff -->
1. Adapter actions -->
1. Adapter-to-API handoff -->
1. API response

### Content Types

Posts, tags, pages.

More to come.

### Routes, Verbs, One-or-Many

The `just-write-api` aims to provide a simple REST interface for managing blog content. Every content type is mapped to a route. Every route supports the basic CRUD operations (create, read, update, delete). Every CRUD operation can be performed on one or N resources.

## Adapter Basics

As the project evolves, better docs follow.

An adapter is just middleware between the incoming request and outgoing response. The `just-write-api` handles incoming requests and outgoing data; the adapter translates data between the API and a content source (Markdown files, Wordpress, a DB, etc.).

### Required Methods

For consumption by the API, an adapter package should export a single object/map outlining CRUD operations for each Just Write content type (post, tag, etc. see above).

```
{
  posts: {
    create: {
      one: function(requestObj) { ... }
      many: function(requestObj) { ... }
    },
    read: {
      one: function(requestObj) { ... }
      many: function(requestObj) { ... }
    },
    update: {
      one: function(requestObj) { ... }
      many: function(requestObj) { ... }
    },
    delete: {
      one: function(requestObj) { ... }
      many: function(requestObj) { ... }
    },
  },
  tags: { ... etc. ... },
  pages: { ... etc. ... },
}
```

The function signature of every adapter method is the same.

### Data-in

```
export default function myAdapter(requestObj) { ... }
```

Adapter middleware can expect a request object as its first parameter. The request object looks like this:

```
{
  method: 'PUT',
  //
  // ... etc. ...
  //
  params: {
    id: '012lkjd8am',
    limit: 50,
  },
  body: {
    field: 'value',
  },
}
```

### Data-out

After an adapter performs an action based on the given request, it passes resulting data to a `just-write-api` controller. The controller expects the adapter's returned data to look like this:

```
// again, super-WIP!
{
  error: false, // or error obj?

}

```
