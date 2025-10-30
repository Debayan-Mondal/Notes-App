const express = require('express');
const router = require('./routes/nodeRoutes');
const  connectDB  = require('./config/db.js');
const rateLimiter = require('./middleware/rateLimiter.js')
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:5173',
}));

app.use(express.json());


app.use('/api/notes',router);
app.use(rateLimiter);




connectDB().then(() => {
    app.listen(PORT,(err) => {
    if(err) {
        throw err;
    }
    console.log(`App listening at ${PORT}`)
})


});


