import Url from "../models/url.model.js";
import { nanoid } from "nanoid";

export const shortenUrl = async (req, res) => {
    let validity = Number(req.body.validity) || 30;
    const { originalUrl, shortcode } = req.body;


    if (!originalUrl || originalUrl.trim() === "") {
        return res.status(400).json({ error: "Original URL is required." });
    }
    if (shortcode) {
        if (shortcode.trim() === "") {
            return res.status(400).json({ error: "Shortcode must be a non-empty string." });
        }
        if (await Url.findOne({ shortId: shortcode })) {
            return res.status(400).json({ error: "Shortcode already exists." });
        }
    }

    if (await Url.findOne({ originalUrl })) {
        return res.status(400).json({ error: "This URL has already been shortened." });
    }


    if (validity <= 0) {
        return res.status(400).json({ error: "Validity must be a positive number." });
    }
    try {
        const shortId = shortcode || nanoid(8);
        const newUrl = new Url({
            originalUrl,
            shortId,
            expiresAt: new Date(Date.now() + 1000 * 60 * validity) // validity in minutes
        });

        await newUrl.save();
        res.status(201).json({ shortlink: `http://localhost:${process.env.PORT || 3000}/${shortId}`, expiry: newUrl.expiresAt });
    } catch (error) {
        console.error("Error shortening URL:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}