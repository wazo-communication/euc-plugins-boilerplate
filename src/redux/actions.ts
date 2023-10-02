import { createAsyncThunk } from '@reduxjs/toolkit';
import type { WDASession, Context as AppContext } from '@wazo/euc-plugins-sdk/types';

import { app as application } from '@wazo/euc-plugins-sdk';

import type { RootState } from './store';

export const loadContext = createAsyncThunk('global/loadContext', async (_, { getState }): Promise<AppContext | undefined> => {
  const state: RootState = getState() as RootState;
  if (state.global.context) {
    // Already initialized
    return state.global.context as AppContext;
  }

  try {
    await application.initialize();
    const { app, user }: AppContext = await application.getContext();
    const appContext: AppContext = { app, user: { ...user } as WDASession };

    console.log('appContext', appContext);

    return appContext as AppContext;
  } catch (e) {
    console.error(e);
  }
});
