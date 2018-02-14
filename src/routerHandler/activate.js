const { User, AL } = rootRequire('./models');

export const path = '/activate/:code';

export async function handler(user, { code }) {
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
