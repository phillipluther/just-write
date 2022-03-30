# Posts

## Endpoints

Manage posts using the RESTful route + verb combinations:

`GET /posts` :: requests a list of posts
`GET /posts/:id` :: requests a single post by ID
`POST /posts` :: creates a new post
`PUT /posts/:id` :: update an existing post by ID
`DELETE /posts/:id` :: delete a post with the given ID

## Structure of a Post

Just Write posts look like this:

```
{
  id: 'abcdefg123456', // GUID
  title: 'This is a Post',
  slugs: 'this-posts-slug',
  summary: 'This is a quick way of summarizing the post; it should be SEO-friendly.',
  published: '2022-03-08T22:21:22.142Z', // platform-independent format
  image: '1234-reference-to-asset-id-4321', // ID of an image asset
  updated: [
    '2022-03-06T20:21:22.142Z',
    '2022-03-01T22:32:18.142Z',
    '2022-02-28T17:41:19.142Z',
  ], // array of platform-independent formats
  tags: [
    '1234abcd',
    '2345bcde',
    '3456cdef',
  ], // array of Tag object GUIDs
  content: '<h1>My content!</h1>,
  metadata: {
    something: 'Any key/val pair describing the post object',
    usage: 'Great for user-specific use cases',
    breaking: false,
  }
}
```
