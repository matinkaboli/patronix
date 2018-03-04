import { SocketStore } from 'Root/models';

export default async (socket, user) => {
  let store = SocketStore.findOne({ user });
  if (store) {
    await store.remove();
  }

  store = new SocketStore({
    socket,
    user
  });
  return await store.save();
};
