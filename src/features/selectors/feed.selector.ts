import type {RootState} from '..';

export const feedIdSelector = (state: RootState) => state.feeds.feedIds;

export const userFeedIdSelector = (state: RootState) => state.feeds.userFeedIds;

export const createGetFeedByIdSelector = (id: string) => (state: RootState) =>
  state.feeds.feedPages[id];

export const createGetUpVotesByIdSelector =
  (id: string) => (state: RootState) =>
    state.feeds.upVotes[id] || 0;

export const createGetDownVotesByIdSelector =
  (id: string) => (state: RootState) =>
    state.feeds.downVotes[id] || 0;

export const createGetCommentsCountSelector =
  (id: string) => (state: RootState) =>
    state.feeds.commentsCounts[id] || 0;

export const createGetCommentsIdsSelector =
  (id: string) => (state: RootState) =>
    state.feeds.commentsIds[id] || [];

export const createGetCommentByIdSelector =
  (id: string) => (state: RootState) =>
    state.feeds.comments[id];

export const createGetItenVoteSelector = (id: string) => (state: RootState) => {
  if (state.feeds.userUpVoteIds[id]) return 'up';
  if (state.feeds.userDownVoteIds[id]) return 'down';
  return undefined;
};
