import { Router } from 'express';
import { db } from '../utils/firebase.js';
import { requireAuth } from '../utils/authMiddleware.js';

const router = Router();

// LISTAR galerias (neste boilerplate: todas; depois podemos filtrar por cliente/fotógrafo)
router.get('/', requireAuth, async (req, res) => {
  const snap = await db.collection('galleries').orderBy('createdAt', 'desc').get();
  const galleries = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  res.json({ galleries });
});

// CRIAR galeria (útil para o fotógrafo)
router.post('/', requireAuth, async (req, res) => {
  const { title, date, coverUrl, photographerId, clientId } = req.body;
  const ref = await db.collection('galleries').add({
    title, date: date ? new Date(date) : new Date(), coverUrl: coverUrl || '',
    photographerId: photographerId || null, clientId: clientId || null,
    createdAt: Date.now()
  });
  const doc = await ref.get();
  res.json({ gallery: { id: doc.id, ...doc.data() } });
});

// ITENS de uma galeria
router.get('/:id/items', requireAuth, async (req, res) => {
  const snap = await db.collection('items').where('galleryId', '==', req.params.id).orderBy('createdAt', 'desc').get();
  const items = snap.docs.map(d => {
    const data = d.data();
    return {
      id: d.id,
      urlThumbnail: data.urlThumbnail,
      urlHighRes: data.urlHighRes,
      type: data.type,
      selectedByClient: !!data.selectedByClient
    };
  });
  res.json({ items });
});

export default router;
