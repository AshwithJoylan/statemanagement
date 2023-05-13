import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import {useSelector as useReduxSelector} from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';
import feeds from './feeds';

const middlewares: any = [
  /* other middlewares */
];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const store = configureStore({
  reducer: {
    feeds,
  },
  middleware: applyMiddleware => applyMiddleware().concat(middlewares),
});

export const dispatch = store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
