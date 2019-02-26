const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// define parameter
app.set('view engine', 'pug');

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

app.get('/doodle', (req, res) => {
    const { id } = req.params;
    res.render('doodle', { id: id});
});

app.get('/doodle-new', (req, res) => {
    res.render('doodle-new');
});

app.post('/doodle-new', (req, res) => {
    console.log(req.body);
    res.end();
});

app.listen(8000);