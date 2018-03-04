import mongoose, { Schema } from 'mongoose';

let schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  }
});

export default mongoose.model('Invitation', schema);
