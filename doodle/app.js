const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require("mongodb").ObjectID;
const moment = require('moment');

const app = express();

// define parameters for rendering
app.set('view engine', 'pug');
moment.locale('fr');
app.locals.moment = moment;

// --------------------------------------------------------------------------
// database connection
// --------------------------------------------------------------------------

// TODO: à passer dans les variables d'environnement
const url = 'mongodb://localhost:27017';
const dbName = 'doodle';

// connect to database
const client = new MongoClient(url, { useNewUrlParser: true });
client.connect(err => {
    if (err) console.log(err);

    // use doodle collection and store it in local variable
    const db = client.db(dbName);
    app.locals.db = db;

    // start server once connected with database
    app.listen(8000);

});

// --------------------------------------------------------------------------
// middleware
// --------------------------------------------------------------------------

// middleware to define asset directory (public) and its path (./public)
app.use('/public', express.static('public'));

// middleware for forms type management
// Parser application/json
app.use(bodyParser.json());
// Parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// middleware example : get ip address of connected user
app.use((req, res, next) => {
    // console.log(req.ip);
    next();
});

// --------------------------------------------------------------------------
// routing
// --------------------------------------------------------------------------

app.get('/', (req, res) => {
    res.render('index', { title: 'Accueil', username: 'OlivierValette'});
});

app.get('/doodle', (req, res, next) => {
    // control id
    const { id } = req.query;
    let oId = null;
    try {
        oId = ObjectID(id);
    } catch (err) {
        next();
    }

    // get document in doodles
    app.locals.db.collection('doodles').findOne({'_id': oId}, (err, doodle) => {
        if (err) console.log(err);
        if (!doodle) next();
        res.render('doodle', { doodle: doodle});
    });

});

app.get('/doodle-new', (req, res) => {
    res.render('doodle-new');
});

app.post('/doodle-new', (req, res) => {
    let doodle = req.body;

    doodle.created_at = new Date();
    doodle.users = [];

    // insert new document in doodles
    app.locals.db.collection('doodles')
        .insertOne(doodle, err => {
        if (err) console.log(err);
        res.json(doodle);
    });

});

app.post('/user-new', (req, res, next) => {
    let newUser = req.body;
    // retrieve and control id
    let oId = null;
    try {
        oId = ObjectID(newUser.id);
    } catch (err) {
        console.log('Object Id error:', err);
        next();
    }
    // remove id from object newUser
    delete newUser.id;
    console.log(newUser);
    // update document in doodles
    app.locals.db.collection('doodles').updateOne(
            {'_id': oId},
            {$push: { users: newUser } },
            err => {
                console.log('Database update error:', err);
                res.redirect('/doodle?id=' + oId)
            }
    );
});

// Route 404 (last route)
app.use((req, res) => {
    res.status(404);
    res.end('404');
});
