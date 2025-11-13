import mongoose from 'mongoose';
const itemSchema = new mongoose.Schema({
  galleryId: { type: mongoose.Schema.Types.ObjectId, ref:'Gallery' },
  filename: String,
  urlThumbnail: String,
  urlHighRes: String,
  type: { type: String, enum:['photo','video'] },
  selectedByClient: { type: Boolean, default:false },
  status: { type: String, enum:['pending','edited','published'], default:'pending' }
}, { timestamps: true });
export default mongoose.model('Item', itemSchema);
