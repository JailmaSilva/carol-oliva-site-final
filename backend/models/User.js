import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  instagramId: String,
  username: String,
  type: { type: String, enum: ['cliente','fotografo'], default: 'cliente' }
}, { timestamps: true });
export default mongoose.model('User', userSchema);
