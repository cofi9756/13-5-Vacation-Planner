CREATE TABLE users (
    userid SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth date
);

CREATE TABLE countries (
    countryid SERIAL PRIMARY KEY NOT NULL,
    country_name VARCHAR(100) NOT NULL,
    country_desc VARCHAR(150) NOT NULL,
    preference_data VARCHAR(150)
);

CREATE TABLE cities (
    cityid SERIAL PRIMARY KEY NOT NULL,
    countryid INT NOT NULL,
    city_name VARCHAR(100) NOT NULL,
    city_desc VARCHAR(150) NOT NULL,
    budget INT NOT NULL,
    preferences VARCHAR(150),
    FOREIGN KEY (countryid) REFERENCES countries(countryid)
);

-- CREATE TABLE locations (
--     locationid SERIAL PRIMARY KEY NOT NULL,
--     location_name VARCHAR(100) NOT NULL,
--     preference_data VARCHAR(150)
-- );

-- change events to reference a cityid
CREATE TABLE events (
    eventid SERIAL PRIMARY KEY NOT NULL,
    cityid INT NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    event_desc VARCHAR(150),
    cost INT NOT NULL,
    event_date date NOT NULL,
    event_time time NOT NULL,
    preference_data VARCHAR(150),
    FOREIGN KEY (cityid) REFERENCES cities(cityid)
);

CREATE TABLE images (
    imageid SERIAL PRIMARY KEY NOT NULL,
    eventid INT NOT NULL,
    image_link VARCHAR(150),
    image_desc VARCHAR(100),
    FOREIGN KEY (eventid) REFERENCES events(eventid)
);

CREATE TABLE saved_events (
    userid INT NOT NULL,
    eventid INT NOT NULL,
    date_saved date DEFAULT (CURRENT_DATE),
    PRIMARY KEY (userid, eventid),
    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (eventid) REFERENCES events(eventid)
);

--Temp table to get recommendation page working
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    budget_max INT NOT NULL,
    preferences VARCHAR(255) NOT NULL
);
