const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.engine('hbs', engine({
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/pages/partials',
  }));
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
   
    res.send('Hello, World!');
  });

app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
