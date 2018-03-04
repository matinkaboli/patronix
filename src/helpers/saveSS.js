import { SocketStore } from 'Root/models';

export default async (socket, token) => {
  let store = new SocketStore({
    socket,
    token
  });
  
  return await store.save();
};
