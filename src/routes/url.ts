const siteUrl = {
  root: '/',
  community: {
    root: '/community',
    list: '/community/list',
    post: {
      post_pk: '/community/post/:post_pk',
      new: '/community/post/new',
    },
  },
} as const;

export default siteUrl;
