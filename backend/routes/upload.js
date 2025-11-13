import { Router } from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import { bucket, db } from '../utils/firebase.js';

const router = Router();

// Usaremos memória; depois enviamos pro Storage
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 1024 * 1024 * 1024 } }); // até ~1GB

// Upload múltiplo (fotos e vídeos) para uma galeria
router.post('/:galleryId', upload.array('files', 20), async (req, res) => {
  const galleryId = req.params.galleryId;
  const files = req.files || [];
  const results = [];

  for (const file of files) {
    const ext = (file.originalname.split('.').pop() || '').toLowerCase();
    const id = uuid();
    const filename = `${galleryId}/${id}.${ext}`;
    const gfile = bucket.file(filename);

    await gfile.save(file.buffer, {
      contentType: file.mimetype,
      metadata: { cacheControl: 'public, max-age=31536000' },
      resumable: false
    });

    // URL pública? Mantemos PRIVADO e usamos link assinado pra download seguro.
    const [meta] = await gfile.getMetadata();
    const isVideo = file.mimetype.startsWith('video/');
    const itemDoc = {
      galleryId,
      filename,
      urlThumbnail: isVideo ? `https://via.placeholder.co/800x600?text=Video` : `https://storage.googleapis.com/${bucket.name}/${filename}`, // placeholder; podemos gerar thumbs depois
      urlHighRes: `gs://${bucket.name}/${filename}`, // guardamos caminho interno
      type: isVideo ? 'video' : 'photo',
      selectedByClient: false,
      status: 'pending',
      createdAt: Date.now()
    };

    const ref = await db.collection('items').add(itemDoc);
    results.push({ id: ref.id, ...itemDoc });
  }

  res.json({ success: true, items: results });
});

// Alternar seleção do cliente
router.post('/select/:itemId', async (req, res) => {
  const id = req.params.itemId;
  const ref = db.collection('items').doc(id);
  const snap = await ref.get();
  if (!snap.exists) return res.status(404).json({ error: 'Item não encontrado' });
  const current = !!snap.data().selectedByClient;
  await ref.update({ selectedByClient: !current, updatedAt: Date.now() });
  res.json({ success: true, selected: !current });
});

// Link de download assinado (expira em 5 minutos)
router.get('/download/:itemId', async (req, res) => {
  const id = req.params.itemId;
  const snap = await db.collection('items').doc(id).get();
  if (!snap.exists) return res.status(404).json({ error: 'Item não encontrado' });

  const { filename } = snap.data();
  const gfile = bucket.file(filename);
  const [url] = await gfile.getSignedUrl({
    action: 'read',
    expires: Date.now() + 5 * 60 * 1000 // 5 minutos
  });

  res.json({ url });
});

export default router;
