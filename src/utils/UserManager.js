class A {
  auth(req, res, next) {
    if (req.session.user) {
      return next();
    } else {
      res.reply.notFound();
    }
  }
  
  logged(req, res, next) {
    if (req.session.user) {
      res.redirect('/u');
    } else {
      return next();
    }
  }
}

export default new A();
