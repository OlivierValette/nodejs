const App = require('./App.js');

const app = new App(8000);

app.addRoute('/', (req,res) => {
    res.render('index.html', { username: 'Olivier Valette' });
});

app.addRoute('/contact', (req,res) => {
    res.write('Contact');
});

app.on('404', (req, res) => {
    res.write('Erreur 404');
});