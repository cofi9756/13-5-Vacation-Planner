INSERT INTO users
    (username, password, email, first_name, last_name, date_of_birth)
VALUES
    ('bob', 'defaultpassword', 'realemail@realemail.com', 'John', 'Smith', '2004-12-01');


INSERT INTO countries
    (country_name, country_desc, preference_data)
VALUES
    ('Germany', 'known for beer, pretzels, and sausage', ' bright, sunny, warm ');

INSERT INTO cities 
    (countryid, city_name, city_desc, preference_data)
VALUES 
    (1, 'Berlin', 'capital of Germany', ' sunny, warm, old ');

INSERT INTO countries
    (country_name, country_desc, preference_data)
VALUES
    ('United States of America', 'USA! USA! USA! USA!', ' sunny, warm, cold, large ');

INSERT INTO cities 
    (countryid, city_name, city_desc, preference_data)
VALUES 
    (2, 'Boulder', 'City in Colorado', ' sunny, wamr, cold, snow ');


INSERT INTO events  
    (countryid, event_name, event_date, event_time, event_desc, preference_data)
VALUES  
    (1, 'test event', '2004-12-01', '12:00:00', 'dog grooming', ' happy, bright, warm ');


INSERT INTO events  
    (countryid, event_name, event_date, event_time, event_desc, preference_data)
VALUES  
    (2, 'tes name part 2', '2004-11-01', '09:00:00', 'cat business', ' unhappy, dark, cold ');


INSERT INTO saved_events
    (userid, eventid)
VALUES
    (1, 1);


INSERT INTO images
    (eventid, image_link, image_desc)
VALUES
    (1, 'https://cc-prod.scene7.com/is/image/CCProdAuthor/What-is-Stock-Photography_P1_mobile?$pjpeg$&jpegSize=200&wid=720', 'dog with hat');


INSERT INTO images
    (eventid, image_link, image_desc)
VALUES
    (2, 'https://cdn.theatlantic.com/media/mt/science/cat_caviar.jpg', 'business cat');
