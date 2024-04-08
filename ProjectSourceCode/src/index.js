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

// POST login sql: INSERT INTO users (password, email, first_name, last_name, date_of_birth) VALUES ($1, $2, $3, $4, $5) returning *;
/*
with this one i made dob optional on the database, if we want we can make a split post like in lab 6
and make two posts, one with dob and one without
*/

// GET login sql: SELECT username, email, first_name, last_name FROM users WHERE email = $1;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
