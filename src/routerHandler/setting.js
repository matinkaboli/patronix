export const path = '/panel/setting';

export async function handler(user) {
  return {
    status: 200,
    data: {
      name: user.name,
      email: user.email,
      avatar: user.avatar.url
    }
  };
}
