import gather from 'Root/gather';

export default async () => {
  if (localStorage.token) {
    await gather();
  }
};
