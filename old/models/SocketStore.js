import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  session: {
    type: String,
    required: true
  },
  sockets: [String],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24
  }
});

export default mongoose.model('SocketStore', schema);
