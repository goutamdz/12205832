console.log('url.route.js loaded');

import {Router} from 'express';
const router = Router();
import { shortenUrl } from '../controllers/url.contoller.js';
import Url from '../models/url.model.js';



router.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;
    try {
        const url = await Url.findOne({ shortId }).lean();
        if (!url) {
            return res.status(404).json({ error: "URL not found" });
        }

        // Collect click data
        const clickData = {
            timestamp: new Date(),
            referrer: req.get('Referrer') || '',
            location: req.ip
        };

        // Save click data
        await Url.updateOne(
            { shortId },
            { $push: { clicks: clickData } }
        );

        
        url.totalClicks = url.clicks.length + 1; // +1 for the new click just added
        delete url.__v;

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