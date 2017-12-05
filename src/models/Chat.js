import mongoose, { Schema } from 'mongoose';

const chatSchema = new Schema({
  chats: [{
    sender: {
      enum: [0, 1],
      type: Number,
      trim: true,
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
  }],
  site: {
    type: Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  },
  operator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    socketId: {
      type: String,
      required: true
    }
  },
  client: {
    socketId: {
      type: String,
      required: true
    }
  },
  done: {
    type: Boolean
  }
});

export default mongoose.model('Chat', chatSchema);
