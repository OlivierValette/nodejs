const App = require('./App.js');

const app = new App(8000);
app.setStaticDir('/public');

app.addRoute('/', (req,res) => {
    if (!req.query.username) {
        res.write('Param missing');
        res.end();
    } else {
        res.render('index.html', { username: req.query.username });
    }
});

app.addRoute('/contact', (req,res) => {
    res.write('Contact');
});

app.on('404', (req, res) => {
    res.write('Erreur 404');
});