import mongoose from 'mongoose';
const gallerySchema = new mongoose.Schema({
  title: String,
  date: Date,
  photographerId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  coverUrl: String
}, { timestamps: true });
export default mongoose.model('Gallery', gallerySchema);
