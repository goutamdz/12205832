console.log('url.route.js loaded');

import {Router} from 'express';
const router = Router();
import { shortenUrl } from '../controllers/url.contoller.js';
import Url from '../models/url.model.js';



router.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;
    try {
        const url = await Url.findOne({ shortId });
        if (!url) {
            return res.status(404).json({ error: "URL not found" });
        }
        res.json(url);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/', shortenUrl);   

router.get('/test', (req, res) => {
    res.send('Router is working!');
});

export default router;