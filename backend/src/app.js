import express from 'express';
import router from './routes/nodeRoutes.js'
import connectDB from './config/db.js'
import rateLimiter from './middleware/rateLimiter.js';
import path from "path";
import cors from 'cors';
import { configDotenv } from 'dotenv';

configDotenv();
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();



app.use(express.json());

if(process.env.NODE_ENV !== "production") {
    app.use(cors({
    origin: 'http://localhost:5173',
}));
}

app.use('/api/notes',router);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req, res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist",))
})
}



connectDB().then(() => {
    app.listen(PORT,(err) => {
    if(err) {
        throw err;
    }
    console.log(`App listening at ${PORT}`)
})


});


