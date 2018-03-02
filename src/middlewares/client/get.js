import { OperatorToken } from 'Root/models';
import { routers } from 'Root/routerHandler';

export default (next, socket) => async ({ path }) => {
  for (let router of routers.values()) {
    if (router.path === path) {
      if (router.needLogin) {
        let token = await OperatorToken
        .findOne({ token: socket.handshake.query.token })
        .populate('user')
        .exec();

        if (token) {
          socket.data.user = token.user;

          next();
          break;
        }

        else {
          socket.emit('get', 403);
          break;
        }
      }

      else {
        next();
        break;
      }
    }
  }
};
