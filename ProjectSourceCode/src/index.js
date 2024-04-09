const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt'); //Added for password protection
const saltRounds = 10; //Added for password protection
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');

app.engine('hbs', engine({
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/pages/partials',
  }));
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, 'views'));

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/pages/partials',
});

// database configuration
const dbConfig = {
  host: 'db', // the database server
  port: 5432, // the database port
  database: process.env.POSTGRES_DB, // the database name
  user: process.env.POSTGRES_USER, // the user account to connect with
  password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
  .then(obj => {
    console.log('Database connection successful'); // you can view this message in the docker compose logs
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });

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
        const { username, password, email, first_name, last_name, date_of_birth } = req.body;
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await pool.query(
            'INSERT INTO users (username, password, email, first_name, last_name, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6) RETURNING userid',
            [username, hashedPassword, email, first_name, last_name, date_of_birth]
        );

        res.redirect('/login');
    } 
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('An error occurred during registration.');
    }
});
// POST register sql: INSERT INTO users (password, email, first_name, last_name, date_of_birth) VALUES ($1, $2, $3, $4, $5) returning *;
/*
with this one i made dob optional on the database, if we want we can make a split post like in lab 6
and make two posts, one with dob and one without
*/

// GET login sql: SELECT username, email, first_name, last_name FROM users WHERE email = $1;

module.exports = app.listen(3000);
