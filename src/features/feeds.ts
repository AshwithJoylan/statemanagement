import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {Comment, Feed} from '../data';
import {v4 as uuidv4} from 'uuid';

type FeedPageState = {
  id: string;
  ups: number;
  downs: number;
  commentsCount: number;
  comments: Comment[];
};

type FeedState = {
  upVotes: Record<string, number>;
  downVotes: Record<string, number>;
  commentsCounts: Record<string, number>;
  feedIds: string[];
  userUpVoteIds: Record<string, string[]>;
  userDownVoteIds: Record<string, string[]>;
  userFeedIds: string[];
  comments: Record<string, Comment>;
  commentsIds: Record<string, string[]>;
  feedPages: Record<string, FeedPageState>;
};

const craeteComment = (
  id: string,
  comment: string,
  parentId?: string,
): Comment => ({
  text: comment,
  id: uuidv4().toString(),
  replies: [],
  ups: 0,
  downs: 0,
  postId: id,
  parentId,
});

const initialState: FeedState = {
  upVotes: {},
  downVotes: {},
  commentsCounts: {},
  feedIds: [],
  userUpVoteIds: {},
  userDownVoteIds: {},
  commentsIds: {},
  userFeedIds: [],
  feedPages: {},
  comments: {},
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    // TODO: upVote
    addUpVote: (
      state,
      action: PayloadAction<{id: string; exists: boolean; commentId?: string}>,
    ) => {
      const {upVotes, comments} = state;
      const {id, exists, commentId} = action.payload;

      if (!commentId) {
        // TODO: add it in upvotes
        upVotes[id] = upVotes[id] + (exists ? 2 : 1);
        // TODO: if exists is true remove downvotes
      } else {
        upVotes[commentId] = (upVotes[commentId] || 0) + (exists ? 2 : 1);
      }
    },
    addDownVote: (
      state,
      action: PayloadAction<{id: string; exists: boolean; commentId?: string}>,
    ) => {
      const {upVotes, downVotes, feedPages} = state;
      const {id, exists, commentId} = action.payload;
      if (!commentId) {
        // TODO: add it in upvotes
        downVotes[id] = downVotes[id] - (exists ? 2 : 1);
        // TODO: if exists is true remove downvotes
      } else {
        downVotes[commentId] = (downVotes[commentId] || 0) - (exists ? 2 : 1);
      }
    },
    addComment: (
      state,
      action: PayloadAction<{
        id: string;
        comment: string;
        isReply: string | undefined;
      }>,
    ) => {
      const {commentsIds, feedPages, commentsCounts, comments} = state;
      const {id, comment, isReply} = action.payload;
      // TODO: generate comment object
      const commentObj = craeteComment(id, comment, isReply);

      // TODO: add the id in comments with post id
      if (!commentsIds[id]) {
        commentsIds[id] = [];
      }
      let index: number | undefined = undefined;
      if (!!isReply) {
        const parent = commentsIds[id];

        let ids = [];
        for (let i = 0; i < parent.length; i++) {
          if (parent[i] === isReply) {
            index = i;
            ids.push(parent[i]);
            ids.push(commentObj.id);
          } else {
            ids.push(parent[i]);
          }
        }
        commentsIds[id] = ids;
      } else {
        commentsIds[id].push(commentObj.id);
      }
      // TODO: increase comment count
      if (!commentsCounts[id]) {
        commentsCounts[id] = 0;
      }
      commentsCounts[id] = commentsCounts[id] + 1;
      // TODO: add the object in feedPages coments
      if (!feedPages[id].comments) {
        feedPages[id].comments = [];
      }
      if (!isReply && !index) {
        feedPages[id].comments.unshift(commentObj);
      } else {
        feedPages[id].comments[index!].replies.unshift(commentObj);
      }
      // TODO: add the object in comments
      comments[commentObj.id] = commentObj;
    },
    setFeeds: (state, action: PayloadAction<Feed[]>) => {
      const {upVotes, downVotes, feedPages, commentsCounts} = state;
      const feeds = action.payload;

      const ids: string[] = [];

      feeds.forEach(({ups, downs, id, commentsCount}, index) => {
        // TODO: add id to ids array
        ids.push(id);
        // TODO: generate upvotes
        if (upVotes[id] == undefined) {
          upVotes[id] = ups;
        }
        // TODO: generate downvotes
        if (downVotes[id] == undefined) {
          downVotes[id] = downs;
        }

        // TODO: generate comments counts
        if (commentsCounts[id] == undefined) {
          commentsCounts[id] = commentsCount;
        }

        // TODO: generate feedPages by id
        if (feedPages[id] == undefined) {
          feedPages[id] = {ups, downs, id, comments: [], commentsCount};
        }
      });

      state.feedIds = ids;
    },
    setMyFeeds: (state, action: PayloadAction<Feed[]>) => {
      const {upVotes, downVotes, feedPages, commentsCounts} = state;
      const feeds = action.payload;

      const ids: string[] = [];
      feeds.forEach(({ups, downs, id, commentsCount}, index) => {
        // TODO: add id to ids array
        ids.push(id);
        // TODO: generate upvotes
        if (upVotes[id] == undefined) {
          upVotes[id] = ups;
        }
        // TODO: generate downvotes
        if (downVotes[id] == undefined) {
          downVotes[id] = downs;
        }
        // TODO: generate comments counts
        if (commentsCounts[id] == undefined) {
          commentsCounts[id] = commentsCount;
        }

        // TODO: generate feedPages by id
        if (feedPages[id] == undefined) {
          feedPages[id] = {ups, downs, id, commentsCount, comments: []};
        }
      });

      state.userFeedIds = ids;
    },
  },
});

export const {setFeeds, setMyFeeds, addUpVote, addDownVote, addComment} =
  feedSlice.actions;

export default feedSlice.reducer;
