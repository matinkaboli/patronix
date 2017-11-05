class A {
  auth(req, res, next) {
    if (req.session.user) {
      return next();
    } else {
      res.reply.notFound();
    }
  }
}

export default new A();
