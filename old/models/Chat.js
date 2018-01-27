import mongoose, { Schema } from 'mongoose';

const chats = new Schema({
  sender: {
    enum: [0, 1], // 0: client, 1: operator
    type: Number,
    required: [true, 'Sender required']
  },
  message: {
    type: String,
    trim: true,
    required: [true, 'Message required']
  },
  time: {
    type: Date,
    trim: true,
    default: Date.now
  }
}, {
  _id: false
});

const chatSchema = new Schema({
  chats: [chats],
  site: {
    type: Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  },
  operator: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    socket: String
  },
  client: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  },
  take: {
    type: Boolean,
    required: true
  }
});

export default mongoose.model('Chat', chatSchema);
