INSERT INTO users 
    (password, email, first_name, last_name, date_of_birth)
VALUES
    ('defaultpassword', 'realemail@realemail.com', 'John', 'Smith', '2004-12-01');

INSERT INTO locations
    (location_name, preference_data)
VALUES
    ('test location', 'bright, sunny, warm');

INSERT INTO events  
    (locationid, event_name, event_date, event_time, preference_data)
VALUES  
    (1, 'test event', '2004-12-01', '12:00:00', 'happy, bright, warm');

INSERT INTO saved_events
    (userid, eventid)
VALUES
    (1, 1);