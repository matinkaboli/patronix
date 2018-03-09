import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  countOnlines: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('Site', schema);
