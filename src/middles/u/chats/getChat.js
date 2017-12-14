const { Chat } = rootRequire('./models');

export default (req, res, next) => {
  Chat.findOne({ _id: req.params.id, taken: false }).then(chat => {
    if (chat) {
      req.middle.chat = chat;
      next();
    } else {
      res.reply.notFound();
    }
  }).catch(() => res.reply.notFound());
};
