import mongoose, { Schema } from 'mongoose';

let schema = new Schema({
  socket: {
    type: String,
    require: true,
    unique: true
  },
  token: {
    type: Schema.Types.ObjectId,
    ref: 'ClientToken',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 7
  }
});

export default mongoose.model('SocketStore', schema);
