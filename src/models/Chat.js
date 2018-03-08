import mongoose, { Schema } from 'mongoose';

const chats = new Schema({
  sender: {
    enum: [0, 1], // 0: customer, 1: operator
    type: Number,
    required: [true, 'Sender required']
  },
  message: {
    type: String,
    trim: true,
    required: [true, 'Message required'],
    minlength: 1,
    maxlength: 250
  },
  time: {
    type: Date,
    trim: true,
    default: Date.now
  }
}, {
  _id: false
});

const schema = new Schema({
  operator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  chats: [chats]
});

export default mongoose.model('Chat', schema);
