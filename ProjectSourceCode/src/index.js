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
const axios = require('axios');
const { use } = require('bcrypt/promises');

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

const user = {
  userid: undefined,
  username: undefined, 
  email: undefined,
  first_name: undefined,
  last_name: undefined,
  date_of_birth: undefined,
  destination: undefined,
};
const session_destination = {destination: undefined,};
const session_budget = {budget: undefined,};

const session_tripInfo = {
  destination: undefined,
  startDate: undefined,
  endDate: undefined
};

const saved_events = `
SELECT DISTINCT
ev.eventid, 
ev.event_name, 
ev.event_desc,
ev.cost, 
to_char(ev.event_date, 'DD Month YYYY') AS event_date, 
to_char(ev.event_time, 'HH24:MI') AS event_time, 
co.country_name, 
ci.city_name, 
im.image_link, 
im.image_desc, 
us.userid = $1 AS saved 
FROM events ev
JOIN saved_events se ON ev.eventid = se.eventid 
JOIN users us ON se.userid = us.userid 
JOIN cities ci ON ci.cityid = ev.cityid 
JOIN countries co ON co.countryid = ci.countryid 
JOIN images im ON ev.eventid = im.eventid
WHERE ci.city_name = $2 AND ev.cost < $3;`;

const all_events = `
SELECT 
ev.eventid, 
ev.event_name, 
ev.event_desc, 
ev.cost,
to_char(ev.event_date, 'DD Month YYYY') AS event_date, 
to_char(ev.event_time, 'HH24:MI') AS event_time,
co.country_name, 
ci.city_name, 
im.image_link, 
im.image_desc,
CASE 
WHEN ev.eventid IN (
  SELECT se.eventid FROM saved_events se WHERE se.userid = $1) 
THEN TRUE 
ELSE FALSE 
END AS saved 
FROM events ev JOIN cities ci ON ci.cityid = ev.cityid 
JOIN countries co ON co.countryid = ci.countryid
JOIN images im ON im.eventid = ev.eventid
WHERE ci.city_name = $2 AND ev.cost < $3
ORDER BY ev.eventid ASC;`;

// **API Routes**
app.get('/', (req, res) => { 
  res.redirect('/home');
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
    return res.render('pages/login', {message: 'Please enter a valid username and password', alertType: 'danger'});
  }

  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = {
          userid: user.userid,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          date_of_birth: user.date_of_birth
      };
      console.log(req.session.user);
      await req.session.save(); // Ensure the session is saved before redirecting
      return res.redirect('/home');
    } else {
      if (req.session) {
          req.session.message = 'Invalid username or password.';
      }
      return res.render('pages/login', {message: 'Invalid username or password', alertType: 'danger'});
    }
  } catch (error) {
    console.error('Error during login:', error);
    if (req.session) {
        req.session.message = 'An error occurred, please try again.';
    }
    return res.render('pages/login', {message: 'An error occurred while logging in, please try again', alertType: 'danger'});
  }
});


app.get('/register', (req, res) => 
{
    res.render('pages/register');
});

app.post('/register', async (req, res) => {
  const { username, password, email, first_name, last_name, date_of_birth } = req.body;
  let errors = [];

  if (!username || username.length < 6) {
    errors.push("Username must be at least 6 characters long.");
  }
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.push("Please enter a valid email address.");
  }
  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }
  if (!first_name) {
    errors.push("First name is required.");
  }
  if (!last_name) {
    errors.push("Last name is required.");
  }

  if (errors.length > 0) {
    // Render the register page again with the error messages
    return res.render('pages/register', {
      errors: errors,
      username, email, first_name, last_name, date_of_birth // Preserve user input
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.none(
      'INSERT INTO users (username, password, email, first_name, last_name, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6)',
      [username, hashedPassword, email, first_name, last_name, date_of_birth]
    );
    res.render('pages/login', {message: 'Thank you for creating an account with us. Log in to begin planning your next trip!', alertType: 'info'});
  } catch (error) {
    console.error('Error during registration:', error);
    if (error.code === '23505') {
      errors.push("Username or email already exists.");
    } else {
      errors.push('Unexpected error during registration, please try again.');
    }
    res.render('pages/register', { errors, username, email, first_name, last_name, date_of_birth });
  }
});


app.get('/events', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login'); // Redirect to login if not authenticated
  }
  // const query = 'SELECT event_name, to_char(event_date, \'DD Month YYYY\') AS event_date, to_char(event_time, \'HH24:MI\') AS event_time, event_desc, country_name, city_name, image_link, image_desc FROM events e JOIN countries c ON e.countryid = c.countryid JOIN cities ci ON c.countryid = ci.countryid JOIN images i ON e.eventid = i.eventid;';


  // db.any(query)
  //   .then(events => {
  //     console.log(events);
  //     res.render('pages/events', {
  //       email: user.email,
  //       events,
  //     });
  //   })
  //   .catch(err => {
  //     res.render('pages/events', {
  //       email: user.email,
  //       events: [],
  //       error: true,
  //     });
  //   });
  const saved = req.query.saved;
  
  db.any(saved ? saved_events : all_events, [user.userid, destination, budget])
  .then(events => {
      console.log(events);
      res.render('pages/events', {
        events,
        action: req.query.saved ? 'delete' : 'add',
      });
    })
    .catch(err => {
      console.log("/events error");
      res.render('pages/events', {
        events: [],
        error: true,
      });
    });
});

app.post('/events/add', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login'); // Redirect to login if not authenticated
  }
  const eventid = parseInt(req.body.eventid);
  const query = 'INSERT INTO saved_events (userid, eventid) VALUES ($1, $2);';
  
  console.log("events add");
  temp_userid = req.session.user.userid;
  temp_destination = req.session.session_destination.destination;
  temp_budget = req.session.session_budget.budget;

  db.tx(async t => {
    await t.none(query, [temp_userid, eventid]);
    return t.any(all_events, [temp_userid, temp_destination, temp_budget]);
  })
  .then(events => {
    console.log(events);
    res.render('pages/events', {
      userid: temp_userid,
      destination: temp_destination,
      budget: temp_budget,
      events,
      message: `Successfully added event!`,
    });
  })
  .catch(err => {
    console.log("/events/add error");
    res.render('pages/events', {
      userid: temp_userid,
      destination: temp_destination,
      budget: temp_budget,
      events: [],
      error: true,
    });
  });
});

app.get('/saved_events', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login'); // Redirect to login if not authenticated
  }
  const query = `
  SELECT 
  ev.eventid,
  event_name, 
  event_desc, 
  cost,
  to_char(event_date, \'DD Month YYYY\') AS event_date, 
  to_char(event_time, \'HH24:MI\') AS event_time, 
  country_name, 
  city_name, 
  image_link, 
  image_desc,
  to_char(date_saved, \'DD Month YYYY\') AS date_saved
  FROM saved_events se JOIN events ev ON ev.eventid = se.eventid
  JOIN cities ci ON ci.cityid = ev.cityid
  JOIN countries co ON co.countryid = ci.countryid
  JOIN images im ON ev.eventid = im.eventid
  WHERE se.userid = $1;`;

  temp_user = req.session.user;

  db.any(query, [req.session.user.userid])
  .then(events => {
    console.log(events);
    res.render('pages/saved_events', {
      email: req.session.user.email,
      user: temp_user,
      events,
      first_name: req.session.user.first_name,
    });
  })
  .catch(err => {
    res.render('pages/saved_events', {
      email: req.session.user.email,
      user: temp_user,
      events: [],
      first_name: user.first_name,
    });
  });
});

//currently non-functional, html does not give eventid
app.get('/deleteSaved_event', (req, res) => {
  const eventid = parseInt(req.body.eventid);
  const Delquery = `DELETE FROM saved_events WHERE userid = $1 AND eventid = $2;`;
  const Selquery = `
  SELECT 
  ev.eventid,
  event_name, 
  event_desc, 
  to_char(event_date, \'DD Month YYYY\') AS event_date, 
  to_char(event_time, \'HH24:MI\') AS event_time, 
  country_name, 
  city_name, 
  image_link, 
  image_desc,
  to_char(date_saved, \'DD Month YYYY\') AS date_saved
  FROM users us JOIN saved_events se ON us.userid = se.userid
  JOIN events ev ON ev.eventid = se.eventid
  JOIN countries co ON co.countryid = ev.countryid
  JOIN cities ci ON ci.countryid = co.countryid
  JOIN images im ON ev.eventid = im.eventid
  WHERE se.userid = $1;`;

  db.tx(async t => {
    await t.none(Delquery, [user.userid, eventid]);
    return t.any(Selquery, [user.userid]);
  })
  .then(events => {
    console.log(events);
    res.render('pages/saved_events', {
      email: user.email,
      events,
      first_name: user.first_name,
    });
  })
  .catch(err => {
    res.render('pages/saved_events', {
      email: user.email,
      events: [],
      first_name: user.first_name,
    });
  });
});

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

app.get('/home', (req, res) => {
  if (req.session.user) {
      res.render('pages/home', {
          user: req.session.user // Pass user data if logged in
      });
  } else {
      res.render('pages/home'); // Render without user data if not logged in
  }
});

app.get('/user', (req, res) => {
  if (req.session.user) {
      res.render('pages/user', {
          user: req.session.user // Pass user data if logged in
      });
  } else {
      res.render('pages/login'); // Render without user data if not logged in
  }
});

app.get('/api/cities', async (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm) {
    return res.status(400).json({ message: 'Query parameter "q" is required.' });
  }

  console.log(`Searching for cities starting with: ${searchTerm}`);

  try {
    const query = "SELECT city_name FROM cities WHERE city_name ILIKE $1 ORDER BY city_name ASC";
    const results = await db.any(query, [`${searchTerm}%`]);  
    console.log('Results:', results);
    res.json(results.map(city => city.city_name));  // Send back just the city names
  } catch (error) {
    console.error('Failed to fetch cities:', error);
    res.status(500).send('Server error');
  }
});

app.post('/trip', (req, res) => {
  if (!req.session.user) {
      return res.redirect('/login'); // Redirect to login if not authenticated
  }

  const { destination, budget, startDate, endDate } = req.body;
  let { tripPreferences } = req.body;

  session_tripInfo.destination = destination;
  session_tripInfo.startDate = startDate;
  session_tripInfo.endDate = endDate;

  // Ensure tripPreferences is always an array
  if (!Array.isArray(tripPreferences)) {
      tripPreferences = [tripPreferences]; // Wrap it in an array if it's not
  }
  req.session.tripInfo = { destination, budget, startDate, endDate, tripPreferences };
  const userid = req.session.user.userid;
  const preferencesPattern = tripPreferences.join('|'); // Now safe to use join

  if (destination === '') {
      const sqlQuery = `
          SELECT * FROM cities
          WHERE budget <= $1 AND
          preferences ~* $2;
      `;

      db.any(sqlQuery, [budget, preferencesPattern])
        .then(results => {
            if (results.length > 0) {
                res.render('pages/recommend', { locations: results });
            } else {
                res.render('pages/recommend', { locations: [], message: 'No matching locations found.', alertType: 'warning'});
            }
        })
          .catch(error => {
              console.error('Error fetching destinations:', error);
              res.status(500).send('Error fetching destinations');
          });
  } else {
      // Handle the request to plan a trip with a known destination
      res.redirect('/calendar');
      return res.render('pages/search_api', {
        destination: session_tripInfo.destination,
      });
  }
});

const auth = (req,res,next) => {
  if (!req.session.user) {
    return res.redirect('/login');  // default redirect to login page
  }
  next();
}

app.use(auth);

app.get('/select_event_type', (req, res) => {
  
  if(!req.session.user) {
    return res.render('/login', {message: 'Login to begin planning your trip', alertType: 'info'});
  }
  else if (!session_tripInfo.destination || !session_tripInfo.startDate || !session_tripInfo.endDate) {
    return res.render('/home',{user: req.session.user, message: 'Input trip information to see events', alertType: 'info'});
  }
  
  res.render('pages/search_api', {
    destination: req.session.tripInfo.destination,
    date: date // Pass the selected date to the page
  });
});

app.get('/search_events', async (req, res) => {
  
  if(!req.session.user) {
    return res.render('/login', {message: 'Login to begin planning your trip', alertType: 'info'});
  }
  else if (!session_tripInfo.destination || !session_tripInfo.startDate || !session_tripInfo.endDate) {
    return res.render('/home',{user: req.session.user, message: 'Input trip information to see events', alertType: 'info'});
  }

  const categories = [];
  if (req.query.music) categories.push('music');
  if (req.query.sports) categories.push('sports');
  if (req.query.arts_theater) categories.push('arts');
  if (req.query.family) categories.push('family');
  if (req.query.miscellaneous) categories.push('miscellaneous');

  const categoryString = categories.join(',');

  if(categories.length === 0) {
    return res.render('pages/search_api', {
      destination: session_tripInfo.destination, 
      message: 'Please select at least one event type',
      alertType: 'warning'
    });
  }

  const destination = session_tripInfo.destination;
  const startDate = new Date(session_tripInfo.startDate).toISOString().replace(/\.\d{3}/, '');
  const endDate = new Date(session_tripInfo.endDate).toISOString().replace(/\.\d{3}/, '');

  console.log('Categories', categories);
  // console.log(startDate);
  // console.log(endDate);
  // console.log(destination);

  try {
    const response = await axios({
      url: `https://app.ticketmaster.com/discovery/v2/events.json`,
      method: 'GET',
      headers: {
        'Accept-Encoding': 'application/json',
      },
      params: {
        apikey: process.env.API_KEY,
        startDateTime: startDate,
        endDateTime: endDate,
        city: destination,  // Try as a string if the array format causes issues
        classificationName: categoryString,
        size: 30,
      }
    });

    if(!response.data._embedded || !response.data._embedded.events || response.data._embedded.events.length === 0) {
      return res.render('pages/home', { 
        user: req.session.user, 
        message: 'No events found',
        alertType: 'warning'
      });
    }
    else{
      console.log('returned events successfully');
    }

    const events = response.data._embedded.events.map(event => ({
      name: event.name,
      start: event.dates && event.dates.start ? event.dates.start.dateTime : '',
      end: event.dates && event.dates.end ? event.dates.end.dateTime : '',
      image: event.images && event.images.length > 0 ? event.images[0].url : '',
      url: event.url,
      description: event.description || '',
      minPrice: event.priceRanges && event.priceRanges.length > 0 ? event.priceRanges[0].min : '',
      maxPrice: event.priceRanges && event.priceRanges.length > 0 ? event.priceRanges[0].max : '',
      category: event.classifications && event.classifications.length > 0 && event.classifications[0].genre ? event.classifications[0].genre.name : '',
      place: event.place && event.place.name ? event.place.name : '',
    }));

    res.render('pages/events_api', {
      events, destination: session_tripInfo.destination,
    });
  }
  catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
    res.render('pages/events_api', {
      events: [],
      message: 'Error finding events',
      alertType: 'warning'
    });
  }
});

app.get('/logout', (req, res) => {
  if (req.session) {
      req.session.destroy(err => {
          if (err) {
              console.error('Failed to destroy the session during logout.', err);
          }
          res.clearCookie('connect.sid'); // This is the default session cookie name used by express-session middleware
          res.render('pages/login', {message: 'Logout successful!', alertType: 'success'});
      });
  } else {
      res.redirect('/login'); // Redirect directly if no session exists
  }
});


app.get('/calendar', (req, res) => {
  if (!req.session.user || !req.session.tripInfo) {
      return res.redirect('/login'); // Redirect if no session or trip info
  }

  // Render calendar page with session data
  res.render('pages/calendar', {
      tripInfo: req.session.tripInfo
  });
});



app.post('/add_event_to_itinerary', (req, res) => {
  if (!req.session.user || !req.session.tripInfo) {
      return res.redirect('/login');
  }

  const name = req.query.name; // Make sure body-parser is used

  // Assuming you store itinerary in the session
  if (!req.session.itinerary) {
      req.session.itinerary = [];
  }
  req.session.itinerary.push(eventDetails);

  res.render('pages/calendar', {
    eventName: name,
    tripInfo: req.session.tripInfo,
  });
});

module.exports = app.listen(3000);
