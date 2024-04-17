const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt'); //Added for password protection
const saltRounds = 10; //Added for password protection
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');

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


//App Settings

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// **API Routes**
app.get('/', (req, res) => { 
   
    res.send('Hello, World!');
  });

app.get('/welcome', (req, res) => { //Given test case in Lab11
    res.json({status: 'success', message: 'Welcome!'});
  });

app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    
      if (req.session) {
          req.session.message = 'Username and password are required.';
      }
      return res.redirect('/login');
  }

  try {
    
      const user = await db.oneOrNone('SELECT username, email, first_name, last_name, password FROM users WHERE username = $1', [username]);

      if (user && await bcrypt.compare(password, user.password)) {
        
          return res.redirect('/home');
      } else {
          
          if (req.session) {
              req.session.message = 'Invalid username or password.';
          }
          return res.redirect('/login');
      }
  } catch (error) {
      console.error('Error during login:', error);
      if (req.session) {
          req.session.message = 'An error occurred, please try again.';
      }
      return res.redirect('/login');
  }
});

app.get('/register', (req, res) => 
{
    res.render('pages/register');
});

app.post('/register', async (req, res) => {
  const {username, password, email, first_name, last_name, date_of_birth } = req.body;
  let errors = []; // \S = any amount of characters that aren't a space or tab 
  if(!username || username.length < 6) {
      errors.push({ msg: "Username must be at least 6 characters long" });
  }
  if (!email || !/\S+@\S+\.\S+/.test(email)) { //I think thats regexp code for valid emails
      errors.push({ msg: "Please enter a valid email address." });
  }
  if (!password || password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters long." });
  }
  if (!first_name) {
      errors.push({ msg: "First name is required." });
  }
  if (!last_name) {
      errors.push({ msg: "Last name is required." });
  }
  if (errors.length > 0) {
      return res.status(400).json({ errors });
  }

  try{
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await db.none(
          'INSERT INTO users (username, password, email, first_name, last_name, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6)',
          [username, hashedPassword, email, first_name, last_name, date_of_birth] //don't we also want username from db? 
      );

      res.redirect('/login');
  } 
  catch (error){
      console.error('Error during registration:', error);
      if (req.session) {
          req.session.message = 'Could not register, try again';
      }
      res.redirect('/register');
  }
});


// POST register sql: INSERT INTO users (password, email, first_name, last_name, date_of_birth) VALUES ($1, $2, $3, $4, $5) returning *;
/*
with this one i made dob optional on the database, if we want we can make a split post like in lab 6
and make two posts, one with dob and one without
*/

// GET login sql: SELECT username, email, first_name, last_name FROM users WHERE email = $1;

app.get('/search', (req, res) => {
  res.render('pages/search');
});

app.post('/search', async (req, res) => {
  const { location_name } = req.body; // Assuming the front-end sends 'location_name'
  if (!location_name) {
      return res.status(400).json({ error: "Location name is required for search." });
  }

  try {
      // Query the locations table to find matching locations
      const results = await db.any('SELECT * FROM locations WHERE location_name ILIKE $1', [`%${location_name}%`]);
      
      if (results.length === 0) {
          // No results found
          return res.status(404).json({ message: "No locations found matching your query." });
      }

      // Send back the found locations
      res.json({ locations: results });
  } catch (error) {
      console.error('Error during location search:', error);
      res.status(500).json({ error: "An error occurred while searching for locations." });
  }
});



module.exports = app.listen(3000);
