const express = require('express');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const PROJECT3_DB = process.env.PROJECT3_DB
const PORT = process.env.PORT || 3003;
const db = mongoose.connection;
require('dotenv').config();

const dbupdateobject = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

app.use(express.json());
app.use(express.static('public'))
app.use(session({
    secret:'feedmeseymour',
    resave:false,
    saveUninitialized:false
}));

const sessionController = require('./controllers/session.js');
app.use('/session', sessionController)

const wonderController = require('./controllers/wonders.js');
app.use('/wonder', wonderController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

// Connect to Mongo
mongoose.connect('mongodb://localhost:27017/meancrud',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
// Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected!')
);
db.on('disconnected', () => console.log('mongo disconnected'));
db.on('open', () => {
    console.log('Connection made!');
});

app.listen(3000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
})
