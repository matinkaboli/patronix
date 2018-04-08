export const path = '/panel/setting';

export async function handler(socket) {
  return {
    status: 200,
    data: {
      name: socket.data.user.name,
      email: socket.data.user.email,
      avatar: socket.data.user.avatar.url
    }
  };
}
