import { app } from '@wazo/euc-plugins-sdk';
import type { WDASession } from '@wazo/euc-plugins-sdk/types';

(async () => {
  await app.initialize();
  const { user } = await app.getContext();
  const token = (user as WDASession)?.token;
  console.log('background token', token);
})();
