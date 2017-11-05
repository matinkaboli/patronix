class A {
  auth(req, res, next) {
    if (req.session.user) {
      console.log(req.session);
      return next();
    } else {
      res.reply.notFound();
    }
  }
}

export default new A();
