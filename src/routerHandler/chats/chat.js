import { Chat } from 'Root/models';

export const path = '/panel/chats/:id';

export async function handler(socket, params) {
  try {
    let chat = await Chat
    .findById(params.id)
    .populate('site')
    .populate('operator.id')
    .exec();

    if (!chat) {
      return {
        status: 404
      };
    }

    let operators = chat.site.operators.map(i => i.toString());
    if (!operators.includes(socket.data.user._id.toString())) {
      return {
        status: 403
      };
    }

    if (!chat.done && chat.taken) {
      return {
        status: 403
      };
    }

    if (
      chat.done &&
      chat.site.owner._id.toString() === socket.data.user._id.toString()
    ) {
      return {
        status: 200,
        data: {
          chats: chat.chats,
          operator: {
            name: chat.operator.id.name,
            email: chat.operator.id.email
          }
        }
      };
    }

    if (!chat.done && !chat.taken) {
      return {
        status: 200,
        data: chat.chats
      };
    }
  }

  catch (e) {
    return {
      status: 400,
      data: 0
    };
  }
}
