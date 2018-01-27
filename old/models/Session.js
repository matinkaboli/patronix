import mongoose, { Schema } from 'mongoose';

const schema = new Schema({}, {
  strict: false
});

export default mongoose.model('Session', schema);
