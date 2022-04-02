export default async function (options) {
  console.log('opts', options);
  return [
    {
      title: 'The Post Title',
      summary: 'A summary of the post',
      published: '2022-04-02',
      content: 'ok',
    },
    {
      title: 'Second Post',
    },
  ];
}
