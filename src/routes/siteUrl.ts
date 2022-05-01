const siteUrl = {
  root: '/',
  community: {
    root: '/community',
    list: '/community/list',
    post: {
      post_id: '/community/post/:post_id',
      new: '/community/post/new',
    },
  },
} as const;

export default siteUrl;
