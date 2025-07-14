console.log('url.route.js loaded');

import {Router} from 'express';
const router = Router();
import { shortenUrl } from '../controllers/url.contoller.js';
import Url from '../models/url.model.js';


router.get('/', async (req, res) => {
    try {
        const urls = await Url.find();
        res.json(urls);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/', shortenUrl);   
router.get('/test', (req, res) => {
    res.send('Router is working!');
});

export default router;