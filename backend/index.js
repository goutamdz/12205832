import express from 'express';
import 'dotenv/config';
import urlRoutes from './routes/url.route.js';
import connectDB from './config/connect.js';
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/shorturls', (req, res, next) => {
    console.log('Request received at /shorturls');
    next();
}, urlRoutes);

app.get('/',(req,res)=>{
    res.send('Hello World!');
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
