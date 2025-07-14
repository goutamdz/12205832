import mongoose, { Schema, model } from 'mongoose';

const clickSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    referrer: String,
    location: String 
});

const urlSchema = new Schema({
    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    clicks: [clickSchema] 
});

urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Url = model('Url', urlSchema);
export default Url;