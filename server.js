const express = require('express');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const PROJECT3_DB = process.env.PROJECT3_DB
const PORT = process.env.PORT || 3003;
const db = mongoose.connection;

app.use(express.json());
app.use(express.static('public'))
app.use(session({
    secret:'feedmeseymour',
    resave:false,
    saveUninitialized:false
}))


mongoose.connect(PROJECT3_DB ,  { useNewUrlParser: true});

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', PROJECT3_DB));
db.on('disconnected', () => console.log('mongo disconnected'));

app.listen(PORT, () => console.log( 'Listening on port:', PORT));
