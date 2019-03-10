const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config  = require('./config/database'); //importing module.exports of DB
const path = require('path'); // prod requirement to connect to angular

mongoose.Promise = global.Promise;//mongoose config
mongoose.connect(config.uri, {useNewUrlParser: true}, (err) => {
    if(err) {
        console.log('Could NOT connect to database: ', err);
    } else{
        console.log('Could connect to database: ', config.db);
    }
});

// TODO app.use(express.static(__dirname + '/client/dist/'));
// app.get( '*', (req, res) => { //prod only
//     res.sendFile(path.join(__dirname + '/client/dist/index/html'));
// });

app.get( '/', (req, res) => {
    res.send('<h1>hello world</h1>');
});
app.get( '*', (req, res) => {
    res.send('<h1>default for all routes</h1>');
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
});