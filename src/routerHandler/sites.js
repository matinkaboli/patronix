export const path = '/panel/sites';

export async function handler(socket) {
  console.log(socket.data.user);

  return {
    status: 403
  };
}
