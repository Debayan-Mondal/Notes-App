const express = require('express');
const router = require('./routes/nodeRoutes');
const  connectDB  = require('./config/db.js');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();

connectDB();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/notes',router);





app.listen(PORT,(err) => {
    if(err) {
        throw err;
    }
    console.log(`App listening at ${PORT}`)
})

