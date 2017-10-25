import mongoose, { Schema } from 'mongoose';

const chatSchema = new Schema({
  chat: [{
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
      type: Number,
      trim: true,
      default: Date.now()
    }
  }],
  site: {
    type: Schema.Types.ObjectId,
    ref: 'Site'
  },
  operator: {
    type: Schema.Types.ObjectId,
    ref: 'Operator'
  },
  client: {
  }
});

export default mongoose.model('Chat', chatSchema);
