import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 40
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  operators: [ {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

export default mongoose.model('Site', schema);
