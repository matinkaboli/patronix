import mongoose, { Schema } from 'mongoose';

let schema = new Schema({
  socket: {
    type: String,
    require: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model('SocketStore', schema);
