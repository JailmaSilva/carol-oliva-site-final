import { Router } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const router = Router();

router.get('/login', (req, res) => {
  const url = `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.INSTAGRAM_REDIRECT_URI)}&scope=user_profile&response_type=code`;
  res.redirect(url);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const tokenRes = await axios.post('https://api.instagram.com/oauth/access_token', null, {
      params: {
        client_id: process.env.INSTAGRAM_CLIENT_ID,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
        code
      }
    });
    const access_token = tokenRes.data.access_token;
    const userRes = await axios.get(`https://graph.instagram.com/me`, {
      params: { fields: 'id,username', access_token }
    });
    const { id: instagramId, username } = userRes.data;
    let user = await User.findOne({ instagramId });
    if (!user) {
      user = await User.create({ instagramId, username, type: 'cliente' });
    }
    const token = jwt.sign({ userId: user._id, type: user.type }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
  } catch (e) {
    console.error(e?.response?.data || e.message);
    res.status(400).json({ error: 'Falha no login Instagram' });
  }
});

export default router;
