import { Router } from 'express';

const perms = rootRequire('./perms');
const { Site } = rootRequire('./models');

const router = new Router();

router.get(
  '/u/site/:id/edit',
  perms.basic,
  perms.u.site.isOwner,
  (req, res) => {
    Site.findOne({_id: req.params.id }).then(site => {
      res.render('u/site/edit.njk', { site });
    });
});

router.post(
  '/u/site/:id/edit',
  perms.basic,
  perms.u.site.isOwner,
  (req, res) => {
    Site.updateOne(
      {
        _id: req.params.id
      },
      {
        $set: {
          name: req.body.name
        }
      }
    ).then(() => {
      res.reply.ok();
    });
});


export default router;
