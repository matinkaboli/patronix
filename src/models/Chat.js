import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  operator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  }
});

export default mongoose.model('Chat', schema);
