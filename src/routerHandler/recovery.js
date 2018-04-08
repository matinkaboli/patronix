import { RL } from 'Root/models';

export const path = '/recovery/:code';

export const needLogin = false;

export async function handler(socket, { code }) {
  let rl = await RL.findOne({ code });

  if (rl) {
    return {
      status: 200
    };
  }

  return {
    status: 404
  };
}
