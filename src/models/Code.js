import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  code: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Code', schema);
