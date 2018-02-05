export const path = '/u/setting';

export async function handler(user) {
  return {
    success: true,
    data: {
      name: user.name,
      email: user.email,
      avatar: user.avatar
    }
  };
}
