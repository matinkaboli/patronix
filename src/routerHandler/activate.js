import { User, AL } from 'Root/models';

export const path = '/activate/:code';

export const needLogin = false;

export async function handler(socket, { code }) {
  let al = await AL.findOne({ code });

  if (al) {
    let user = await User.findById(al.user);

    user.status = 1;

    await user.save();
    await al.remove();

    return { status: 200 };
  }

  else {
    return { status: 400 };
  }
}
