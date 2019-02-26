const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

// define parameter
app.set('view engine', 'pug');

// database connection
// TODO: à passer dans les variables d'environnement
const url = 'mongodb://localhost:27017';
const dbName = 'doodle';
const client = new MongoClient(url, { useNewUrlParser: true });

// middleware to define asset directory (public) and its path (./public)
app.use('/public', express.static('public'));

// middleware for forms type management
// Parser application/json
app.use(bodyParser.json());
// Parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// middleware example : ip address of connected user
app.use((req, res, next) => {
    // console.log(req.ip);
    next();
});

// routing

app.get('/', (req, res) => {
    res.render('index', { title: 'Accueil', username: 'OlivierValette'});
});

app.get('/doodle/:id', (req, res) => {
    const { id } = req.params;
    res.render('doodle', { id: id});
});

app.get('/doodle-new', (req, res) => {
    res.render('doodle-new');
});

app.post('/doodle-new', (req, res) => {
    let doodle = req.body;

    doodle.created_at = new Date();

    // connect to database
    client.connect(err => {
        if (err) console.log(err);

        // use doodle collection
        const db = client.db(dbName);

        // insert new document in doodles
        db.collection('doodles').insertOne(doodle, (err, result) => {
            if (err) console.log(err);
            res.json(doodle);
        });
    });

});

app.listen(8000);