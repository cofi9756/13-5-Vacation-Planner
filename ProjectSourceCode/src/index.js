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
    return res.redirect('/login');
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

/*
when the endpoint is written for these, render the events page with the events data structure like done in the /events endpoint 
searching events based on city_name
SELECT event_name, to_char(event_date, \'DD Month YYYY\') AS event_date, to_char(event_time, \'HH24:MI\') AS event_time, event_desc, country_name, city_name, image_link FROM events e JOIN countries c ON e.countryid = c.countryid JOIN cities ci ON c.countryid = ci.countryid JOIN images i ON e.eventid = i.eventid WHERE city_name = $1;
searching events based on country_name
SELECT event_name, to_char(event_date, \'DD Month YYYY\') AS event_date, to_char(event_time, \'HH24:MI\') AS event_time, event_desc, country_name, city_name, image_link FROM events e JOIN countries c ON e.countryid = c.countryid JOIN cities ci ON c.countryid = ci.countryid JOIN images i ON e.eventid = i.eventid WHERE country_name = $1;
basic search based on preference data if we are still planning on doing that (this is probabaly not going to work, but its a skeleton)
SELECT event_name, to_char(event_date, \'DD Month YYYY\') AS event_date, to_char(event_time, \'HH24:MI\') AS event_time, event_desc, country_name, city_name, image_link FROM events e JOIN countries c ON e.countryid = c.countryid JOIN cities ci ON c.countryid = ci.countryid JOIN images i ON e.eventid = i.eventid WHERE e.preference_data LIKE '%[$1]%' OR ci.preference_data LIKE '%[$2]%' OR c.preference_data '%[$3]';
*/

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

// app.post('/trip', (req, res) => {
//   if (!req.session.user) {
//       return res.redirect('/login'); // Redirect to login if not authenticated
//   }

//   const { destination, budget} = req.body;
//   console.log('Trip details:', { destination, budget});

//   const saved = req.query.saved;
//   userid = req.session.user.userid;
//   req.session.session_destination = {destination: destination};
//   req.session.session_budget = {budget: budget};
  
//   db.any(saved ? saved_events : all_events, [req.session.user.userid, destination, budget])
//   .then(events => {
//       console.log(events);
//       res.render('pages/events', {
//         destination,
//         budget,
//         userid,
//         events,
//         action: req.query.saved ? 'delete' : 'add',
//       });
//     })
//     .catch(err => {
//       res.render('pages/events', {
//         userid,
//         destination,
//         budget,
//         events: [],
//         error: true,
//       });
//     }); // Redirect to a confirmation or next step page
// });

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

  const { destination, budget, tripPreferences, startDate, endDate } = req.body;
  const userid = req.session.user.userid;

  req.session.session_destination = { destination: destination };
  req.session.session_budget = { budget: budget };

  if (destination === '') {
      // User asked for a recommendation
      const preferencesPattern = tripPreferences.split(',').map(pref => `%${pref}%`).join('|');

      // Since only maximum budget is considered, update the query accordingly
      const sqlQuery = `
          SELECT * FROM locations
          WHERE budget_max >= $1 AND preferences ~* $2;
      `;

      db.any(sqlQuery, [budget, preferencesPattern])
        .then(results => {
            res.render('pages/recommend', { locations: results });
        })
        .catch(error => {
            console.error('Error fetching destinations:', error);
            res.status(500).send('Error fetching destinations');
        });
  } else {
      // Handle the request to plan a trip with a known destination
      const saved = req.query.saved;
      db.any(saved ? saved_events : all_events, [userid, destination, budget])
          .then(events => {
              console.log('Events:', events);
              res.render('pages/events', {
                  destination,
                  budget,
                  userid,
                  events,
                  action: req.query.saved ? 'delete' : 'add',
              });
          })
          .catch(err => {
              console.error('Error processing events:', err);
              res.render('pages/events', {
                  userid,
                  destination,
                  budget,
                  events: [],
                  error: true,
              });
          });
  }
});

const auth = (req,res,next) => {
  if (!req.session.user) {
    return res.redirect('/login');  // default redirect to login page
  }
}

app.use(auth);

app.get('/smart_search', (req, res) => {
  res.render('pages/search_api');
});

app.get('/search_api', async (req, res) => {
  // const location = req.query.location;
  // const start_date = req.query.start_date;
  // const end_date = req.query.end_date;
  // const categories = [];
  //   if (req.query.expos) categories.push('expos');
  //   if (req.query.concerts) categories.push('concerts');
  //   if (req.query.festivals) categories.push('festivals');
  //   if (req.query.performing_arts) categories.push('performing-arts');
  //   if (req.query.sports) categories.push('sports');
  //   if (req.query.conferences) categories.push('conferences');
  //   if (req.query.community) categories.push('community');
  // const location_result = await axios({
  //   url: 'https://api.predicthq.com/v1/places/',
  //   method: 'GET',
  //   dataType: 'json',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.API_KEY}`,
  //     'Accept': 'application/json'
  //   },
  //   params: {
  //     q: location,
  //     limit: 1
  //   }
  // })
  //   .then(location_result => {
  //     const location_id = location_result.id;
  //     const location_name = location_result.name;
  //   })
  //   .catch(error => {
  //     res.render('pages/search_api', {
  //       message: 'Invalid location'
  //     });
  //   });
  // const events_result = await axios({
  //   url: 'https://api.predicthq.com/v1/events/',
  //   method: 'GET',
  //   dataType: 'json',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.API_KEY}`,
  //     'Accept': 'application/json'
  //   },
  //   params: {
  //     'place.scope': location_id,
  //     'active.gte': start_date,
  //     'active.lte': end_date,
  //     'category': categories,
  //   }
  // })
  const location = req.query.location;
  const start_date = req.query.start_date;
  const end_date = req.query.end_date;
  const categories = [];
    if (req.query.expos) categories.push('expos');
    if (req.query.concerts) categories.push('concerts');
    if (req.query.festivals) categories.push('festivals');
    if (req.query.performing_arts) categories.push('performing-arts');
    if (req.query.sports) categories.push('sports');
    if (req.query.conferences) categories.push('conferences');
    if (req.query.community) categories.push('community');  

  try {
    const locationResponse = await axios({
      url: 'https://api.predicthq.com/v1/places/',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'Accept': 'application/json'
      },
      params: {
        q: location,
        limit: 1
      }
    });

    if (locationResponse.data.results.length === 0) {
      return res.render('pages/search_api', { message: 'Invalid location' });
    }

    const location_id = locationResponse.data.results[0].id;
    const location_name = locationResponse.data.results[0].name;

    try{
      const eventsResponse = await axios({
        url: 'https://api.predicthq.com/v1/events/',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.API_KEY}`,
          'Accept': 'application/json'
        },
        params: {
          'place.scope': location_id,
          'active.gte': start_date,
          'active.lte': end_date,
          'category': categories.join(),
          'limit': 10,
        }
      });
      if(eventsResponse.data.results.length === 0){
        return res.render('pages/search_api', { message: 'Could not find any events with selected options'});
      }

      const events = eventsResponse.data.results.map(event => ({
        title: event.title,
        start: event.start,
        end: event.end,
        category: event.category,
        description: event.description
      }));
    }
    catch (error) {
      res.render('pages/search_api', { message: `Error finding events in ${location_name} with selected options`});
    }
  }
  catch (error) {
    res.render('/pages/search_api', {
      message: 'Error finding location'
    });
  }
});

module.exports = app.listen(3000);
