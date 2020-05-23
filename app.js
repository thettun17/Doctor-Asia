const express = require('express');


const apiRoute = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
    next();
});

app.get('/', (req, res, next) => {
    res.send("API is working well");
})

app.use(apiRoute);

mongoose.connect('mongodb+srv://thettun:9O5WegTwgoIuLV1F@cluster0-fnv01.mongodb.net/doctorAsia').then(result => {
app.listen(process.env.PORT || 3000);
}).catch(err => {console.log(err);
});

// pwd: 9O5WegTwgoIuLV1F
// username: thettun