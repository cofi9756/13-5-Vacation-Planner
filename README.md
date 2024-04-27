# 13-5-Vacation-Planner
CSCI 3308 SPRING 2024

# Description
The Purpose of this project is to make finding and saving events for a vacation itinerary much easier. 
Nomad allows users to search for events in a variety of ways including: location, preference, budget, and travel type.
Users can search for events based purely off of location and budget if the User already knows where they wish to go,
or a User can have the website recommend a location based off of preferences and budget. 
Once a location is selected, Nomad will take the User to their personal calendar for their trip, from this calendar the user can doa variety of things.
The user can create their own event to add to the calendar if it is something the user simply needs to remeber or an event not present within out database.
The user can also search for events from this location, time, and day and book those events and then save them to their calendar.
This calendar is saved to the User's profile, and is accessible at any time!

# Instructions to run the project
simply clone the github to the local machine 
ensure the file 'package-lock.json' and the directory 'node_modules' were not cloned
then open docker open the containers
then run 'docker compose up' to begin the projects specific container
then, when done, make sure to run 'docker compose down -v' to make sure the containers close and the database closes along with it

# Directory Structure
```bash
├── MilestoneSubmissions
│   ├── lab_11_UAT_doc.pdf
│   ├── Lab13.docx
│   ├── Lab 9.pdf
├── ProjectSourceCode
│   ├── docker-compose.yaml
│   ├── package.json
│   ├── package-lock.json
│   ├── ProjectSourceCode
│   │   └── init_data
│   ├── src
│   │   ├── index.js
│   │   ├── init_data
│   │   │   ├── create.sql
│   │   │   └── insert.sql
│   │   ├── resources
│   │   │   ├── css
│   │   │   │   └── style.css
│   │   │   ├── img
│   │   │   │   └── home.png
│   │   │   └── js
│   │   │       └── script.js
│   │   └── views
│   │       ├── layouts
│   │       │   └── main.hbs
│   │       └── pages
│   │           ├── calendar.hbs
│   │           ├── events.hbs
│   │           ├── home.hbs
│   │           ├── login.hbs
│   │           ├── partials
│   │           │   ├── body.hbs
│   │           │   ├── footer.hbs
│   │           │   ├── head.hbs
│   │           │   ├── message.hbs
│   │           │   ├── nav.hbs
│   │           │   ├── sidebar.hbs
│   │           │   └── title.hbs
│   │           ├── recommend.hbs
│   │           ├── register.hbs
│   │           ├── saved_events.hbs
│   │           ├── search.hbs
│   │           └── user.hbs
│   └── test
│       └── server.spec.js
├── README.md
└── TeamMeetingLogs
    ├── MeetingLog(3_20_2024).docx
    ├── MeetingLog(4_1_2024).docx
    ├── MeetingLog(4_15_2024).docx
    ├── MeetingLog(4_22_2024).docx
    ├── MeetingLog(4_8_2024).docx
```
