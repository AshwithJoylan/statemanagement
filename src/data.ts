export type Feed = {
  id: string;
  ups: number;
  downs: number;
  commentsCount: number;
};

export type Comment = {
  id: string;
  replies: Comment[];
  text: string;
  ups: number;
  downs: number;
  postId: string;
  parentId?: string;
};

export const feeds: Feed[] = [
  {
    id: '8dsj223',
    ups: 10,
    downs: -2,
    commentsCount: 0,
  },
  {
    id: '8maj223',
    ups: 3,
    downs: -2,
    commentsCount: 0,
  },
  {
    id: '8dsj2s3',
    ups: 32,
    downs: -2,
    commentsCount: 0,
  },
  {
    id: '8dsj2l2',
    ups: 40,
    downs: -2,
    commentsCount: 0,
  },
  {
    id: 's9sd223',
    ups: 44,
    downs: -2,
    commentsCount: 0,
  },
  {
    id: 'l2sjd23',
    ups: 10,
    downs: -3,
    commentsCount: 0,
  },
  {
    id: '20sj252',
    ups: 0,
    downs: 0,
    commentsCount: 0,
  },
  {
    id: '8d4j202',
    ups: 10,
    downs: -4,
    commentsCount: 0,
  },
  {
    id: 'm3sj243',
    ups: 11,
    downs: 0,
    commentsCount: 0,
  },
  {
    id: '8ds5v23',
    ups: 20,
    downs: -10,
    commentsCount: 0,
  },
];

export const myFeeds: Feed[] = [
  {
    id: '8dsj223',
    ups: 10,
    downs: -2,
    commentsCount: 0,
  },
  {
    id: '8mds223',
    ups: 3,
    downs: -2,
    commentsCount: 0,
  },
  {
    id: '8dsj2s65',
    ups: 32,
    downs: -2,
    commentsCount: 0,
  },
  {
    id: '8dsj2342',
    ups: 40,
    downs: -2,
    commentsCount: 0,
  },
  {
    id: 's9sd22ds3',
    ups: 44,
    downs: -2,
    commentsCount: 0,
  },
  {
    id: 'l2sjd2ds3',
    ups: 10,
    downs: -3,
    commentsCount: 0,
  },
  {
    id: '20sj252',
    ups: 0,
    downs: 0,
    commentsCount: 0,
  },
  {
    id: '8d4j2d02',
    ups: 10,
    downs: -4,
    commentsCount: 0,
  },
  {
    id: 'm3sj243',
    ups: 11,
    downs: 0,
    commentsCount: 0,
  },
  {
    id: '8ds5v23',
    ups: 20,
    downs: -10,
    commentsCount: 0,
  },
];
