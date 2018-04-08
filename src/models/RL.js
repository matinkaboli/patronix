import mongoose, { Schema } from 'mongoose';

let schema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24
  }
});

export default mongoose.model('RecoveryLink', schema);
