const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt'); //Added for password protection
const saltRounds = 10; //Added for password protection

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

app.get('/welcome', (req, res) => { //Given test case in Lab11
    res.json({status: 'success', message: 'Welcome!'});
  });

app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.get('/register', (req, res) => 
{
    res.render('pages/register');
});

app.post('/register', async (req, res) => {
    try {
        // Destructure the form data from req.body
        const { username, password, email, first_name, last_name, date_of_birth } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await pool.query(
            'INSERT INTO users (username, password, email, first_name, last_name, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6) RETURNING userid',
            [username, hashedPassword, email, first_name, last_name, date_of_birth]
        );

        res.redirect('/login'); // Redirect to the login page after register
    } 
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('An error occurred during registration.');
    }
});
// POST login sql: INSERT INTO users (password, email, first_name, last_name, date_of_birth) VALUES ($1, $2, $3, $4, $5) returning *;
/*
with this one i made dob optional on the database, if we want we can make a split post like in lab 6
and make two posts, one with dob and one without
*/

// GET login sql: SELECT username, email, first_name, last_name FROM users WHERE email = $1;

module.exports = app.listen(3000);
