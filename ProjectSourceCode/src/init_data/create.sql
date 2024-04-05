CREATE TABLE users (
    userid SERIAL PRIMARY KEY NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth date 
);

CREATE TABLE locations (
    locationid SERIAL PRIMARY KEY NOT NULL,
    location_name VARCHAR(100) NOT NULL,
    preference_data VARCHAR(150)
);

CREATE TABLE events (
    eventid SERIAL PRIMARY KEY NOT NULL,
    locationid INT NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    event_date date NOT NULL,
    event_time time NOT NULL,
    preference_data VARCHAR(150),
    FOREIGN KEY (locationid) REFERENCES locations(locationid)
);

CREATE TABLE saved_events (
    userid INT NOT NULL,
    eventid INT NOT NULL,
    date_saved date DEFAULT (CURRENT_DATE),
    PRIMARY KEY (userid, eventid),
    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (eventid) REFERENCES events(eventid)
);