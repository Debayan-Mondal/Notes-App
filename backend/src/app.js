const express = require('express');
const router = require('./routes/nodeRoutes');
const  connectDB  = require('./config/db.js');
const rateLimiter = require('./middleware/rateLimiter.js')
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(rateLimiter);

app.use('/api/notes',router);




connectDB().then(() => {
    app.listen(PORT,(err) => {
    if(err) {
        throw err;
    }
    console.log(`App listening at ${PORT}`)
})


});


