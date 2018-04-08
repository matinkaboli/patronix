import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  sockets: [String]
});

export default mongoose.model('SocketStore', schema);
