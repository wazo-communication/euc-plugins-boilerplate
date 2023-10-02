import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { Context as AppContext } from '@wazo/euc-plugins-sdk/types';

import { loadContext } from './actions';

// Define a type for the slice state
interface GlobalState {
  context?: AppContext;
}

// Define the initial state using that type
const initialState: GlobalState = {
  context: undefined,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadContext.fulfilled, (state, { payload }) => {
      if (payload) {
        state.context = payload as AppContext;
      }
    });
  },
});

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
