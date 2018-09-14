module.exports = {
  quickReply: {
    items: [
      {
        type: 'action',
        action: {
          type: 'message',
          label: 'Upcoming',
          text: 'upcoming',
        },
      },
      {
        type: 'action',
        action: {
          type: 'message',
          label: 'Popular',
          text: 'popular',
        },
      },
      {
        type: 'action',
        action: {
          type: 'message',
          label: 'Trending',
          text: 'trending',
        },
      },
      {
        type: 'action',
        action: {
          type: 'message',
          label: 'Recommend',
          text: 'recommend',
        },
      },
    ],
  },
};
