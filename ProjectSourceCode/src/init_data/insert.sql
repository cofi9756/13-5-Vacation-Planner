-- INSERT INTO users
--     (username, password, email, first_name, last_name, date_of_birth)
-- VALUES
--     ('bob', 'defaultpassword', 'realemail@realemail.com', 'John', 'Smith', '2004-12-01');


-- INSERT INTO countries
--     (country_name, country_desc, preference_data)
-- VALUES
--     ('Germany', 'known for beer, pretzels, and sausage', ' bright, sunny, warm ');

-- INSERT INTO cities 
--     (countryid, city_name, city_desc, preference_data)
-- VALUES 
--     (1, 'Berlin', 'capital of Germany', ' sunny, warm, old ');

-- INSERT INTO countries
--     (country_name, country_desc, preference_data)
-- VALUES
--     ('United States of America', 'USA! USA! USA! USA!', ' sunny, warm, cold, large ');

-- INSERT INTO cities 
--     (countryid, city_name, city_desc, preference_data)
-- VALUES 
--     (2, 'Boulder', 'City in Colorado', ' sunny, wamr, cold, snow ');


-- INSERT INTO events  
--     (countryid, event_name, event_date, event_time, event_desc, cost, preference_data)
-- VALUES  
--     (1, 'test event', '2004-12-01', '12:00:00', 'dog grooming', 1, ' happy, bright, warm ');


-- INSERT INTO events  
--     (countryid, event_name, event_date, event_time, event_desc, cost, preference_data)
-- VALUES  
--     (2, 'tes name part 2', '2004-11-01', '09:00:00', 'cat business', 2, ' unhappy, dark, cold ');


-- INSERT INTO saved_events
--     (userid, eventid)
-- VALUES
--     (1, 1);


-- INSERT INTO images
--     (eventid, image_link, image_desc)
-- VALUES
--     (1, 'https://cc-prod.scene7.com/is/image/CCProdAuthor/What-is-Stock-Photography_P1_mobile?$pjpeg$&jpegSize=200&wid=720', 'dog with hat');


-- INSERT INTO images
--     (eventid, image_link, image_desc)
-- VALUES
--     (2, 'https://cdn.theatlantic.com/media/mt/science/cat_caviar.jpg', 'business cat');

INSERT INTO countries (country_name, country_desc) VALUES
('United States', 'Land of the free.'),
('Canada', 'Beautiful maple leaf country.'),
('United Kingdom', 'Home of the Queen.'),
('Australia', 'Land of kangaroos.'),
('Germany', 'Efficient and innovative country.'),
('France', 'City of love and lights.'),
('Italy', 'Land of pizza and pasta.'),
('Japan', 'Land of the rising sun.'),
('China', 'Great Wall and rich culture.'),
('India', 'Colorful and diverse nation.'),
('Brazil', 'Carnival and soccer.'),
('Mexico', 'Rich in history and culture.'),
('South Korea', 'K-pop and technology hub.'),
('Russia', 'Vast and diverse country.'),
('Spain', 'Sunny beaches and siestas.'),
('Netherlands', 'Tulips and windmills.'),
('Argentina', 'Passion for football and tango.'),
('Switzerland', 'Chocolate and Swiss Alps.'),
('Sweden', 'Scandinavian beauty and design.'),
('Norway', 'Fjords and northern lights.'),
('Denmark', 'Home of Lego and Vikings.'),
('Finland', 'Land of a thousand lakes.'),
('Portugal', 'Port wine and stunning coastlines.'),
('Belgium', 'Waffles and comic strips.'),
('Austria', 'Classical music and Alps.'),
('Greece', 'Ancient ruins and Mediterranean charm.'),
('Turkey', 'East meets West.'),
('Egypt', 'Pyramids and ancient civilization.'),
('Thailand', 'Exotic beaches and temples.'),
('South Africa', 'Wildlife safari adventures.'),
('New Zealand', 'Lord of the Rings filming location.'),
('Ireland', 'Green countryside and friendly pubs.'),
('Singapore', 'Clean and modern city-state.'),
('Poland', 'Rich in history and culture.'),
('Malaysia', 'Food paradise and cultural melting pot.'),
('Philippines', 'Archipelago of stunning islands.'),
('Vietnam', 'Rich history and delicious cuisine.'),
('Indonesia', 'Island paradise and diverse culture.'),
('Colombia', 'Coffee and salsa.'),
('Chile', 'Long coastline and Andes mountains.'),
('Saudi Arabia', 'Desert landscapes and oil wealth.'),
('United Arab Emirates', 'Luxury and futuristic cities.'),
('Israel', 'Holy land and vibrant culture.'),
('Pakistan', 'Cultural diversity and ancient heritage.'),
('Iran', 'Rich history and Persian culture.'),
('Iraq', 'Mesopotamian cradle of civilization.'),
('Nigeria', 'African giant and diverse cultures.'),
('Kenya', 'Safari destination and Maasai culture.'),
('Ghana', 'Gold coast and friendly people.');

INSERT INTO cities (countryid, city_name, city_desc, budget, preferences) VALUES
(1, 'New York City', 'Bustling metropolis.', 3000, 'city'),
(2, 'Toronto', 'Multicultural city.', 2500, 'city'),
(3, 'London', 'Cosmopolitan city.', 2500, 'city, historicSites'),
(4, 'Sydney', 'Harbor city.', 2500, 'beach, city, mountains'),
(5, 'Berlin', 'Artistic vibe.', 1700, 'city, historicSites'),
(6, 'Paris', 'City of lights.', 2500, 'city, historicSites'),
(7, 'Rome', 'Eternal city.', 2000, 'city, historicSites'),
(8, 'Tokyo', 'High-tech city.', 1500, 'city'),
(9, 'Beijing', 'Imperial grandeur.', 1500, 'city, historicSites'),
(10, 'Mumbai', 'Bollywood capital.', 700, 'city'),
(11, 'Rio de Janeiro', 'Stunning beaches.', 1000, 'beach, city'),
(12, 'Mexico City', 'Vibrant culture.', 1000, 'city, historicSites'),
(13, 'Seoul', 'Vibrant nightlife.', 1300, 'city'),
(14, 'Moscow', 'Iconic landmarks.', 1200, 'city, historicSites'),
(15, 'Barcelona', 'Gaudi architecture.', 1300, 'city, beach'),
(16, 'Amsterdam', 'Canal city.', 1500, 'city'),
(17, 'Buenos Aires', 'Cultural hub.', 900, 'city'),
(18, 'Zurich', 'Banking hub.', 3000, 'city, mountains'),
(19, 'Stockholm', 'Scandinavian beauty.', 2000, 'city, mountains'),
(20, 'Oslo', 'Fjords and Vikings.', 2200, 'city, countryside, mountains'),
(21, 'Copenhagen', 'Bicycle-friendly city.', 1800, 'city'),
(22, 'Helsinki', 'Design capital.', 1700, 'city'),
(23, 'Lisbon', 'Historical charm.', 1500, 'city, beach'),
(24, 'Brussels', 'European capital.', 1800, 'city'),
(25, 'Vienna', 'Imperial elegance.', 2000, 'city, historicSites'),
(26, 'São Paulo', 'Financial center.', 1500, 'city'),
(27, 'Guadalajara', 'Colonial architecture.', 800, 'city, historicSites'),
(28, 'Incheon', 'Port city.', 1200, 'city, mountains'),
(29, 'Saint Petersburg', 'Cultural treasure.', 1500, 'city, historicSites'),
(30, 'Valencia', 'City of Arts.', 1200, 'city, beach'),
(31, 'Rotterdam', 'Modern architecture.', 1700, 'city'),
(32, 'Mendoza', 'Wine region.', 1300, 'countryside'),
(33, 'Geneva', 'International city.', 3000, 'city, mountains'),
(34, 'Gothenburg', 'Cultural events.', 1400, 'city, mountains'),
(35, 'Bergen', 'Fjord gateway.', 2000, 'countryside, mountains'),
(36, 'Odense', 'Birthplace of Andersen.', 1200, 'city, historicSites'),
(37, 'Tampere', 'Industrial city.', 1300, 'city'),
(38, 'Faro', 'Algarve gateway.', 800, 'beach, historicSites'),
(39, 'Ghent', 'Medieval charm.', 1100, 'city, historicSites'),
(40, 'Salzburg', 'Mozart city.', 1800, 'city, historicSites'),
(41, 'Chicago', 'Windy city.', 2000, 'city'),
(42, 'Montreal', 'Cultural hub.', 1800, 'city'),
(43, 'Edinburgh', 'Royal history.', 1700, 'city, historicSites, mountains'),
(44, 'Brisbane', 'Sunshine city.', 1500, 'city, beach, mountains'),
(45, 'Hamburg', 'Port city.', 1500, 'city'),
(46, 'Marseille', 'Port city.', 1300, 'city, beach'),
(47, 'Venice', 'City of canals.', 2200, 'city, historicSites'),
(8, 'Osaka', 'Foodie paradise.', 1500, 'city'),
(9, 'Guangzhou', 'Trade hub.', 1200, 'city'),
(10, 'Delhi', 'Historic capital.', 500, 'city, historicSites'),
(1, 'Los Angeles', 'Entertainment capital.', 2500, 'city, beach, mountains'),
(1, 'Chicago', 'Windy city.', 2000, 'city, historicSites'),
(1, 'Las Vegas', 'City of lights.', 3000, 'city'),
(1, 'San Francisco', 'Tech hub.', 2800, 'city, beach'),
(1, 'Seattle', 'Emerald city.', 2500, 'city, mountains'),
(1, 'Miami', 'Magic city.', 3000, 'city, beach'),
(1, 'Denver', 'Mile High City.', 2300, 'city, mountains'),
(1, 'Orlando', 'Theme park central.', 2800, 'city'),
(1, 'Boston', 'Historic charm.', 2500, 'city, historicSites'),
(1, 'Washington D.C.', 'Capital city.', 2700, 'city, historicSites'),
(1, 'Austin', 'Live music capital.', 2400, 'city'),
(1, 'Nashville', 'Music city.', 2400, 'city'),
(1, 'San Diego', 'Americas Finest City.', 2700, 'city, beach'),
(1, 'New Orleans', 'Big Easy.', 2600, 'city'),
(1, 'Portland', 'City of roses.', 2300, 'city, mountains'),
(1, 'Philadelphia', 'City of brotherly love.', 2500, 'city, historicSites'),
(1, 'Atlanta', 'Southern charm.', 2600, 'city'),
(1, 'Houston', 'Space city.', 2500, 'city'),
(1, 'Dallas', 'Big D.', 2400, 'city'),
(1, 'Phoenix', 'Valley of the Sun.', 2500, 'city, mountains'),
(1, 'Detroit', 'Motor City.', 2200, 'city, historicSites'),
(1, 'San Antonio', 'Alamo city.', 2600, 'city'),
(1, 'Minneapolis', 'City of Lakes.', 2300, 'city'),
(1, 'Salt Lake City', 'Ski city.', 2300, 'city, mountains'),
(1, 'Tampa', 'Cigar city.', 2600, 'city, beach'),
(1, 'Charlotte', 'Queen City.', 2500, 'city'),
(1, 'Raleigh', 'City of Oaks.', 2400, 'city, countryside'),
(1, 'Indianapolis', 'Crossroads of America.', 2400, 'city, historicSites'),
(1, 'Columbus', 'Discovery city.', 2400, 'city'),
(1, 'Kansas City', 'City of Fountains.', 2300, 'city'),
(1, 'St. Louis', 'Gateway to the West.', 2400, 'city, historicSites'),
(1, 'Pittsburgh', 'Steel city.', 2300, 'city, historicSites'),
(1, 'Cleveland', 'Rock and Roll capital.', 2300, 'city, historicSites'),
(1, 'Cincinnati', 'Queen City of the West.', 2300, 'city, historicSites'),
(1, 'Milwaukee', 'Brew City.', 2300, 'city'),
(1, 'Memphis', 'Home of the Blues.', 2500, 'city'),
(1, 'Baltimore', 'Charm City.', 2500, 'city, historicSites'),
(1, 'Newark', 'Gateway city.', 2400, 'city'),
(1, 'Buffalo', 'City of good neighbors.', 2300, 'city'),
(1, 'Fort Worth', 'Cowtown.', 2400, 'city'),
(1, 'Austin', 'Live music capital.', 2400, 'city'),
(1, 'Oakland', 'Bay Area city.', 2600, 'city'),
(1, 'Albuquerque', 'Duke City.', 2300, 'city, mountains'),
(1, 'Tucson', 'Old Pueblo.', 2400, 'city, mountains'),
(1, 'Fresno', 'Gateway to the Sierras.', 2300, 'city, mountains'),
(1, 'Long Beach', 'Aquatic capital.', 2500, 'city, beach'),
(1, 'Virginia Beach', 'Resort city.', 2600, 'city, beach'),
(1, 'Honolulu', 'Paradise city.', 3000, 'city, beach'),
(1, 'Wichita', 'Air capital.', 2300, 'city'),
(1, 'Riverside', 'City of Arts.', 2400, 'city'),
(1, 'Bakersfield', 'Country music city.', 2300, 'city'),
(1, 'Arlington', 'Sports city.', 2400, 'city'),
(1, 'Anaheim', 'Home of Disneyland.', 2700, 'city'),
(1, 'Lexington', 'Horse capital of the world.', 2400, 'city, countryside'),
(1, 'Santa Ana', 'Orange County city.', 2600, 'city'),
(1, 'Corpus Christi', 'Sparkling city by the sea.', 2400, 'city, beach'),
(1, 'Anchorage', 'Northern Lights city.', 2800, 'city, mountains'),
(1, 'Stockton', 'Asparagus capital.', 2300, 'city'),
(1, 'Plano', 'City of excellence.', 2400, 'city'),
(1, 'Henderson', 'Emerald city.', 2500, 'city'),
(1, 'Lincoln', 'Star City.', 2400, 'city, countryside'),
(1, 'Greensboro', 'Gate City.', 2400, 'city'),
(1, 'Baton Rouge', 'Red Stick.', 2400, 'city'),
(1, 'El Paso', 'Sun City.', 2300, 'city, mountains'),
(1, 'Madison', 'City of four lakes.', 2400, 'city'),
(1, 'Lubbock', 'Hub City.', 2300, 'city'),
(1, 'Jersey City', 'Sixth borough.', 1500, 'city'),
(1, 'Fort Wayne', 'Summit City.', 1300, 'city'),
(1, 'Durham', 'City of Medicine.', 1400, 'city'),
(1, 'St. Petersburg', 'Sunshine City.', 1500, 'city, beach'),
(1, 'Laredo', 'Gateway to Mexico.', 1400, 'city'),
(1, 'Buffalo', 'City of good neighbors.', 1300, 'city'),
(1, 'Chula Vista', 'Lemon Capital of the World.', 1500, 'city, beach'),
(1, 'Norfolk', 'Naval Station city.', 1400, 'city, beach'),
(1, 'Reno', 'Biggest Little City in the World.', 1500, 'city, mountains'),
(1, 'Gilbert', 'Hay Shipping Capital of the World.', 1400, 'city'),
(1, 'Winston-Salem', 'Twin City.', 1400, 'city'),
(1, 'North Las Vegas', 'Bright Lights city.', 1500, 'city'),
(1, 'Irving', 'City of Arts.', 1200, 'city'),
(1, 'Glendale', 'Jewel City.', 1300, 'city'),
(1, 'Garland', 'Flower city.', 1100, 'city'),
(1, 'Hialeah', 'City of Progress.', 1400, 'city'),
(1, 'Richmond', 'River City.', 1400, 'city'),
(1, 'Boise', 'City of Trees.', 1400, 'city, mountains'),
(1, 'Spokane', 'Lilac City.', 1400, 'city, mountains'),
(1, 'Birmingham', 'Magic City.', 1200, 'city'),
(1, 'Modesto', 'City of Water.', 1300, 'city'),
(1, 'Des Moines', 'Hartford of the West.', 1000, 'city'),
(1, 'San Bernardino', 'Gateway City.', 1100, 'city'),
(1, 'Tacoma', 'City of Destiny.', 1300, 'city'),
(1, 'Fontana', 'City of Action.', 1400, 'city'),
(1, 'Santa Clarita', 'Hollywood North.', 1700, 'city'),
(1, 'Baton Rouge', 'Red Stick.', 1600, 'city'),
(1, 'Oxnard', 'City of Strawberries.', 1400, 'city'),
(1, 'Moreno Valley', 'City of Angels.', 1400, 'city'),
(1, 'Fayetteville', 'City of Flowers.', 1000, 'city'),
(1, 'Huntington Beach', 'Surf City.', 1700, 'city, beach'),
(1, 'Yonkers', 'City of Vision.', 1500, 'city'),
(1, 'Aurora', 'City of Lights.', 1400, 'city');

INSERT INTO events (cityid, event_name, event_date, event_time, event_desc, cost) VALUES
(1, 'New Years Eve Celebration', '2024-12-31', '21:00', 'Fireworks and festivities.', 0),
(1, 'Broadway Musical Premiere', '2024-07-15', '19:30', 'Exciting theater experience.', 50),
(2, 'Canada Day Parade', '2024-07-01', '12:00', 'Celebrating Canadian pride.', 0),
(2, 'Toronto International Film Festival', '2024-09-05', '10:00', 'Showcasing global cinema.', 25),
(3, 'London Fashion Week', '2024-09-14', '09:00', 'Showcasing latest fashion trends.', 100),
(3, 'Shakespearean Play Performance', '2024-04-23', '19:00', 'Classic theater experience.', 75),
(4, 'Sydney New Years Fireworks', '2024-12-31', '21:00', 'Iconic fireworks display.', 0),
(4, 'Sydney Harbour Cruise', '2024-06-20', '14:00', 'Scenic boat tour.', 50),
(5, 'Berlin International Film Festival', '2024-02-20', '10:00', 'Celebrating global cinema.', 25),
(5, 'Berlin Beer Festival', '2024-08-05', '16:00', 'Taste of German brews.', 30),
(6, 'Paris Fashion Week', '2024-02-25', '09:00', 'Glamorous runway shows.', 100),
(6, 'Louvre Museum Guided Tour', '2024-05-10', '11:00', 'Artistic masterpiece tour.', 20),
(7, 'Rome International Film Festival', '2024-10-17', '10:00', 'Showcasing cinematic excellence.', 25),
(7, 'Vatican City Tour', '2024-03-15', '14:00', 'Historical Vatican exploration.', 40),
(8, 'Tokyo Marathon', '2024-03-01', '08:00', 'Annual long-distance running event.', 0),
(8, 'Sumo Wrestling Tournament', '2024-07-10', '12:00', 'Traditional Japanese sport.', 50),
(9, 'Forbidden City Concert', '2024-06-15', '19:00', 'Classical music performance.', 75),
(9, 'Great Wall Hiking Adventure', '2024-09-08', '08:00', 'Scenic hike along the wall.', 30),
(10, 'Mumbai Film Festival', '2024-10-20', '10:00', 'Celebrating Indian cinema.', 25),
(10, 'Elephanta Caves Tour', '2024-12-10', '13:00', 'Historical cave exploration.', 35),
(11, 'Rio Carnival Parade', '2024-02-09', '20:00', 'Spectacular samba parade.', 0),
(11, 'Hang Gliding Adventure', '2024-05-25', '09:00', 'Aerial view of Rio.', 100),
(12, 'Day of the Dead Festival', '2024-11-02', '18:00', 'Honoring deceased ancestors.', 0),
(12, 'Tequila Tasting Experience', '2024-06-30', '17:00', 'Authentic Mexican flavors.', 40),
(13, 'Seoul Lantern Festival', '2024-11-11', '17:00', 'Colorful lantern displays.', 0),
(13, 'Korean BBQ Cooking Class', '2024-04-05', '15:00', 'Learn to grill like a local.', 50),
(14, 'Moscow International Ballet Competition', '2024-06-22', '15:00', 'World-class ballet performances.', 50),
(14, 'Red Square Tour', '2024-09-20', '11:00', 'Historical landmark exploration.', 30),
(15, 'Barcelona Jazz Festival', '2024-10-10', '19:00', 'Celebrating jazz music.', 25),
(15, 'Sagrada Familia Tour', '2024-03-15', '13:00', 'Architectural wonder exploration.', 20),
(16, 'Amsterdam Dance Event', '2024-10-16', '22:00', 'Electronic music extravaganza.', 50),
(16, 'Van Gogh Museum Visit', '2024-04-20', '10:00', 'Artistic masterpiece experience.', 25),
(17, 'Buenos Aires Tango Festival', '2024-08-20', '20:00', 'Passionate tango performances.', 0),
(17, 'Pampas Horseback Riding Tour', '2024-05-02', '09:00', 'Traditional Argentine experience.', 75),
(18, 'Zurich Street Parade', '2024-08-10', '14:00', 'Electronic music street parade.', 0),
(18, 'Chocolate Making Workshop', '2024-02-14', '16:00', 'Indulge in chocolate creations.', 35),
(19, 'Stockholm Pride Parade', '2024-07-30', '12:00', 'Celebrating LGBTQ+ rights.', 0),
(19, 'Vasa Museum Tour', '2024-04-05', '11:00', 'Maritime history exploration.', 20),
(20, 'Oslo Music Festival', '2024-06-05', '16:00', 'Diverse music performances.', 25),
(20, 'Viking Ship Museum Visit', '2024-09-15', '10:00', 'Historical maritime adventure.', 30),
(21, 'Copenhagen Beer Festival', '2024-05-15', '17:00', 'Craft beer tasting event.', 0),
(21, 'Tivoli Gardens Visit', '2024-07-12', '10:00', 'Amusement park fun.', 40),
(22, 'Helsinki Design Week', '2024-09-01', '09:00', 'Showcasing Finnish design.', 75),
(22, 'Suomenlinna Fortress Tour', '2024-04-30', '14:00', 'Historical fortress exploration.', 25),
(23, 'Lisbon Food Festival', '2024-07-20', '18:00', 'Culinary delights from Portugal.', 50),
(23, 'Belem Tower Visit', '2024-03-10', '11:00', 'Historical landmark exploration.', 20),
(24, 'Brussels Chocolate Festival', '2024-02-14', '11:00', 'Indulge in chocolate creations.', 0),
(24, 'Atomium Museum Visit', '2024-09-25', '12:00', 'Unique architectural experience.', 30),
(25, 'Vienna Opera Ball', '2024-02-08', '20:00', 'Elegant ballroom dancing.', 100),
(25, 'Schönbrunn Palace Tour', '2024-05-15', '14:00', 'Historical palace exploration.', 35),
(26, 'São Paulo Carnival', '2024-02-10', '21:00', 'Colorful carnival celebrations.', 0),
(26, 'Mercado Municipal Visit', '2024-06-20', '09:00', 'Marketplace exploration.', 20),
(27, 'Guadalajara International Book Fair', '2024-11-30', '10:00', 'Literary event.', 50),
(27, 'Tlaquepaque Arts and Crafts Tour', '2024-04-15', '15:00', 'Artistic exploration.', 25),
(28, 'Incheon K-Pop Concert', '2024-07-25', '18:00', 'K-pop music extravaganza.', 0),
(28, 'Bukhansan National Park Hike', '2024-09-02', '07:00', 'Nature trekking adventure.', 30),
(29, 'Saint Petersburg White Nights Festival', '2024-06-01', '22:00', 'Cultural events.', 0),
(29, 'Hermitage Museum Visit', '2024-08-20', '11:00', 'Artistic masterpiece experience.', 40),
(30, 'Valencia Fallas Festival', '2024-03-15', '12:00', 'Traditional celebration.', 0),
(30, 'City of Arts and Sciences Visit', '2024-09-10', '10:00', 'Architectural marvel exploration.', 20),
(31, 'Rotterdam International Film Festival', '2024-01-24', '09:00', 'Cinematic excellence.', 25),
(31, 'Euromast Tower Climb', '2024-07-05', '15:00', 'Panoramic city views.', 15),
(32, 'Mendoza Grape Harvest Festival', '2024-03-05', '14:00', 'Wine and grape celebration.', 0),
(32, 'Aconcagua Mountain Trek', '2024-08-01', '06:00', 'Mountain hiking adventure.', 100),
(33, 'Geneva Motor Show', '2024-03-10', '10:00', 'Automotive industry showcase.', 50),
(33, 'Jet dEau Boat Tour', '2024-06-20', '16:00', 'Scenic boat tour.', 25),
(34, 'Gothenburg Film Festival', '2024-01-27', '18:00', 'Celebrating global cinema.', 0),
(34, 'Liseberg Amusement Park Visit', '2024-07-10', '10:00', 'Amusement park fun.', 40),
(35, 'Bergen International Festival', '2024-05-22', '16:00', 'Diverse cultural events.', 50),
(35, 'Fjord Cruise Experience', '2024-08-30', '13:00', 'Scenic boat tour.', 30),
(36, 'Hans Christian Andersen Festival', '2024-08-02', '10:00', 'Celebrating Andersens works.', 0),
(36, 'Odense Zoo Visit', '2024-06-15', '11:00', 'Animal kingdom exploration.', 20),
(37, 'Tampere Film Festival', '2024-03-04', '19:00', 'Independent cinema showcase.', 25),
(37, 'Särkänniemi Amusement Park Visit', '2024-07-25', '10:00', 'Amusement park fun.', 35),
(38, 'Faro International Sardine Festival', '2024-06-20', '20:00', 'Culinary festival.', 0),
(38, 'Ria Formosa Boat Tour', '2024-09-10', '09:00', 'Scenic boat tour.', 30),
(39, 'Ghent Festival of Flanders', '2024-09-15', '11:00', 'Music and performing arts.', 0),
(39, 'Ghent Altarpiece Viewing', '2024-04-10', '10:00', 'Artistic masterpiece experience.', 25),
(40, 'Salzburg Festival', '2024-07-21', '19:00', 'Classical music performances.', 50),
(40, 'Mozart Residence Tour', '2024-04-27', '15:00', 'Historical exploration.', 20),
(41, 'Chicago Blues Festival', '2024-06-07', '17:00', 'Celebrating blues music.', 0),
(41, 'Navy Pier Ferris Wheel Ride', '2024-08-15', '12:00', 'Panoramic city views.', 15),
(42, 'Montreal Jazz Festival', '2024-07-04', '20:00', 'World-class jazz performances.', 50),
(42, 'Mont Royal Park Hike', '2024-09-20', '08:00', 'Nature trekking adventure.', 25),
(43, 'Edinburgh Fringe Festival', '2024-08-02', '12:00', 'Theater and arts.', 0),
(43, 'Edinburgh Castle Tour', '2024-04-10', '10:00', 'Historical landmark exploration.', 20),
(44, 'Brisbane Festival', '2024-09-07', '18:00', 'Cultural celebration.', 50),
(44, 'Lone Pine Koala Sanctuary Visit', '2024-05-15', '10:00', 'Wildlife encounter.', 30),
(45, 'Hamburg Fish Market', '2024-05-05', '05:00', 'Fresh seafood market.', 0),
(45, 'Miniatur Wunderland Visit', '2024-10-12', '09:00', 'Model railway attraction.', 20),
(46, 'Marseille International Film Festival', '2024-07-10', '10:00', 'Cinematic excellence.', 25),
(46, 'Calanques National Park Hike', '2024-09-15', '08:00', 'Nature trekking adventure.', 35),
(47, 'Venice Biennale', '2024-05-11', '09:00', 'Art exhibition.', 50),
(47, 'Gondola Ride on Grand Canal', '2024-08-25', '14:00', 'Iconic Venetian experience.', 70),
(48, 'Osaka Cherry Blossom Festival', '2024-04-01', '12:00', 'Cherry blossom viewing.', 0),
(48, 'Osaka Aquarium Kaiyukan Visit', '2024-10-20', '10:00', 'Marine life exploration.', 30),
(49, 'Guangzhou International Food Festival', '2024-11-20', '16:00', 'Culinary delights.', 50),
(49, 'Chimelong Safari Park Visit', '2024-07-05', '09:00', 'Wildlife safari adventure.', 40),
(50, 'Delhi International Film Festival', '2024-12-05', '10:00', 'Celebrating global cinema.', 0),
(50, 'Lotus Temple Visit', '2024-09-15', '13:00', 'Architectural marvel exploration.', 20);

INSERT INTO images (eventid, image_link, image_desc) VALUES
(1, 'https://example.com/fireworks.jpg', 'Vibrant fireworks display.'),
(2, 'https://example.com/musical.jpg', 'Theater performance poster.'),
(3, 'https://example.com/fashion.jpg', 'Runway fashion showcase.'),
(4, 'https://example.com/sydney.jpg', 'Sydney Harbour view.'),
(5, 'https://example.com/film.jpg', 'Film festival poster.'),
(6, 'https://example.com/paris.jpg', 'Paris fashion show.'),
(7, 'https://example.com/rome.jpg', 'Roman ruins backdrop.'),
(8, 'https://example.com/tokyo.jpg', 'Marathon runners in Tokyo.'),
(9, 'https://example.com/forbidden.jpg', 'Classical concert venue.'),
(10, 'https://example.com/bollywood.jpg', 'Indian film festival poster.'),
(11, 'https://example.com/carnival.jpg', 'Rio carnival dancers.'),
(12, 'https://example.com/day_of_dead.jpg', 'Day of the Dead celebration.'),
(13, 'https://example.com/seoul_lantern.jpg', 'Colorful lanterns in Seoul.'),
(14, 'https://example.com/ballet.jpg', 'Ballet performance.'),
(15, 'https://example.com/jazz.jpg', 'Jazz band performing.'),
(16, 'https://example.com/dance_event.jpg', 'Dance event poster.'),
(17, 'https://example.com/tango.jpg', 'Tango dancers in Buenos Aires.'),
(18, 'https://example.com/street_parade.jpg', 'Street parade in Zurich.'),
(19, 'https://example.com/pride.jpg', 'Pride parade in Stockholm.'),
(20, 'https://example.com/oslo_festival.jpg', 'Music festival in Oslo.'),
(21, 'https://example.com/beer_festival.jpg', 'Beer festival in Copenhagen.'),
(22, 'https://example.com/helsinki_design.jpg', 'Design exhibition in Helsinki.'),
(23, 'https://example.com/food_festival.jpg', 'Food festival in Lisbon.'),
(24, 'https://example.com/chocolate.jpg', 'Chocolate festival in Brussels.'),
(25, 'https://example.com/opera.jpg', 'Opera ball in Vienna.'),
(26, 'https://example.com/carnival2.jpg', 'São Paulo carnival.'),
(27, 'https://example.com/book_fair.jpg', 'Book fair in Guadalajara.'),
(28, 'https://example.com/kpop_concert.jpg', 'K-pop concert in Incheon.'),
(29, 'https://example.com/white_nights.jpg', 'White Nights Festival in St. Petersburg.'),
(30, 'https://example.com/fallas.jpg', 'Fallas festival in Valencia.'),
(31, 'https://example.com/film_festival.jpg', 'Film festival in Rotterdam.'),
(32, 'https://example.com/grape_festival.jpg', 'Grape festival in Mendoza.'),
(33, 'https://example.com/motor_show.jpg', 'Motor show in Geneva.'),
(34, 'https://example.com/film_festival2.jpg', 'Film festival in Gothenburg.'),
(35, 'https://example.com/bergen_festival.jpg', 'International festival in Bergen.'),
(36, 'https://example.com/andersen.jpg', 'Andersen festival in Odense.'),
(37, 'https://example.com/tampere_film.jpg', 'Tampere film festival.'),
(38, 'https://example.com/sardine_festival.jpg', 'Sardine festival in Faro.'),
(39, 'https://example.com/festival_of_flanders.jpg', 'Festival of Flanders in Ghent.'),
(40, 'https://example.com/salzburg_festival.jpg', 'Salzburg festival poster.'),
(41, 'https://example.com/blues_festival.jpg', 'Blues festival in Chicago.'),
(42, 'https://example.com/jazz_festival.jpg', 'Jazz festival in Montreal.'),
(43, 'https://example.com/fringe_festival.jpg', 'Edinburgh Fringe Festival.'),
(44, 'https://example.com/brisbane_festival.jpg', 'Brisbane festival poster.'),
(45, 'https://example.com/fish_market.jpg', 'Fish market in Hamburg.'),
(46, 'https://example.com/film_festival3.jpg', 'Film festival in Marseille.'),
(47, 'https://example.com/biennale.jpg', 'Venice Biennale poster.'),
(48, 'https://example.com/cherry_blossom.jpg', 'Cherry blossom festival in Osaka.'),
(49, 'https://example.com/food_festival2.jpg', 'Food festival in Guangzhou.'),
(50, 'https://example.com/film_festival4.jpg', 'Film festival in Delhi.'),
(51, 'https://example.com/fireworks.jpg', 'Vibrant fireworks display.'),
(52, 'https://example.com/musical.jpg', 'Theater performance poster.'),
(53, 'https://example.com/fashion.jpg', 'Runway fashion showcase.'),
(54, 'https://example.com/sydney.jpg', 'Sydney Harbour view.'),
(55, 'https://example.com/film.jpg', 'Film festival poster.'),
(56, 'https://example.com/paris.jpg', 'Paris fashion show.'),
(57, 'https://example.com/rome.jpg', 'Roman ruins backdrop.'),
(58, 'https://example.com/tokyo.jpg', 'Marathon runners in Tokyo.'),
(59, 'https://example.com/forbidden.jpg', 'Classical concert venue.'),
(60, 'https://example.com/bollywood.jpg', 'Indian film festival poster.'),
(61, 'https://example.com/carnival.jpg', 'Rio carnival dancers.'),
(62, 'https://example.com/day_of_dead.jpg', 'Day of the Dead celebration.'),
(63, 'https://example.com/seoul_lantern.jpg', 'Colorful lanterns in Seoul.'),
(64, 'https://example.com/ballet.jpg', 'Ballet performance.'),
(65, 'https://example.com/jazz.jpg', 'Jazz band performing.'),
(66, 'https://example.com/dance_event.jpg', 'Dance event poster.'),
(67, 'https://example.com/tango.jpg', 'Tango dancers in Buenos Aires.'),
(68, 'https://example.com/street_parade.jpg', 'Street parade in Zurich.'),
(69, 'https://example.com/pride.jpg', 'Pride parade in Stockholm.'),
(70, 'https://example.com/oslo_festival.jpg', 'Music festival in Oslo.'),
(71, 'https://example.com/beer_festival.jpg', 'Beer festival in Copenhagen.'),
(72, 'https://example.com/helsinki_design.jpg', 'Design exhibition in Helsinki.'),
(73, 'https://example.com/food_festival.jpg', 'Food festival in Lisbon.'),
(74, 'https://example.com/chocolate.jpg', 'Chocolate festival in Brussels.'),
(75, 'https://example.com/opera.jpg', 'Opera ball in Vienna.'),
(76, 'https://example.com/carnival2.jpg', 'São Paulo carnival.'),
(77, 'https://example.com/book_fair.jpg', 'Book fair in Guadalajara.'),
(78, 'https://example.com/kpop_concert.jpg', 'K-pop concert in Incheon.'),
(79, 'https://example.com/white_nights.jpg', 'White Nights Festival in St. Petersburg.'),
(80, 'https://example.com/fallas.jpg', 'Fallas festival in Valencia.'),
(81, 'https://example.com/film_festival.jpg', 'Film festival in Rotterdam.'),
(82, 'https://example.com/grape_festival.jpg', 'Grape festival in Mendoza.'),
(83, 'https://example.com/motor_show.jpg', 'Motor show in Geneva.'),
(84, 'https://example.com/film_festival2.jpg', 'Film festival in Gothenburg.'),
(85, 'https://example.com/bergen_festival.jpg', 'International festival in Bergen.'),
(86, 'https://example.com/andersen.jpg', 'Andersen festival in Odense.'),
(87, 'https://example.com/tampere_film.jpg', 'Tampere film festival.'),
(88, 'https://example.com/sardine_festival.jpg', 'Sardine festival in Faro.'),
(89, 'https://example.com/festival_of_flanders.jpg', 'Festival of Flanders in Ghent.'),
(80, 'https://example.com/salzburg_festival.jpg', 'Salzburg festival poster.'),
(91, 'https://example.com/blues_festival.jpg', 'Blues festival in Chicago.'),
(92, 'https://example.com/jazz_festival.jpg', 'Jazz festival in Montreal.'),
(93, 'https://example.com/fringe_festival.jpg', 'Edinburgh Fringe Festival.'),
(94, 'https://example.com/brisbane_festival.jpg', 'Brisbane festival poster.'),
(95, 'https://example.com/fish_market.jpg', 'Fish market in Hamburg.'),
(96, 'https://example.com/film_festival3.jpg', 'Film festival in Marseille.'),
(97, 'https://example.com/biennale.jpg', 'Venice Biennale poster.'),
(98, 'https://example.com/cherry_blossom.jpg', 'Cherry blossom festival in Osaka.'),
(99, 'https://example.com/food_festival2.jpg', 'Food festival in Guangzhou.'),
(100, 'https://example.com/film_festival4.jpg', 'Film festival in Delhi.');

--Temp table to get recommendation page working
INSERT INTO locations (name, budget_max, preferences) VALUES 
('Cape Town', 3000, 'beach,mountains,city'),
('Boulder', 3000, 'mountains,city'),
('a', 3000, 'beach,mountains'),
('b', 4000, 'city'),
('c', 2000, 'mountains'),
('d', 1000, 'beach'),
('e', 1000, 'historicSites'),
('f', 1000, 'countryside');


