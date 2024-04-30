const CALENDAR_EVENTS = [
    {
      name: "Running",
      day: "wednesday",
      time: "09:00",
      modality: "In-person",
      location: "Boulder",
      url: "",
      attendees: "Alice, Jack, Ben",
    },
    {
      name: "Class",
      day: "thursday",
      time: "08:00",
      modality: "In-person",
      location: "Boulder",
      url: "",
      attendees: "Thomas, Adrian",
    },
  ];
  
  const CALENDAR_DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  let EVENT_MODAL;
  
  /* ********************** PART B: 6.2: CREATE MODAL ************************************** */
  
  function initializeEventModal() {
    // @TODO: Create a modal using JS. The id will be `event-modal`:
    // Reference: https://getbootstrap.com/docs/5.3/components/modal/#via-javascript
    EVENT_MODAL = new bootstrap.Modal(document.getElementById('event-modal'));
  }
  
  function updateEventFromModal(id) {
    if (id === undefined) {
      id = CALENDAR_EVENTS.length;
    }

    CALENDAR_EVENTS[id] = {
      name: document.querySelector('#event_name').value,
      day: document.querySelector('#event_weekday').value,
      time: document.querySelector('#event_time').value,
      modality: document.querySelector('#event_modality').value,
      location: document.querySelector('#event_modality').value === 'in-person' ? document.querySelector('#event_location').value : '',
      url: document.querySelector('#event_modality').value === 'Remote' ? document.querySelector('#event_remote_url').value : '',
      attendees: document.querySelector('#event_attendees').value
    };
  
    updateDOM();
    EVENT_MODAL.hide();
  }

  function openEventModal({id, day}) {
    const submit_button = document.querySelector("#submit_button");
    const modal_title = document.querySelector(".modal-title");
    let event = CALENDAR_EVENTS[id];

    if (!event) {
      event = {
        name: "",
        day: day,
        time: "",
        modality: "",
        location: "",
        url: "",
        attendees: "",
      };
      modal_title.innerHTML = "Create Event"; 
      submit_button.innerHTML = "Create Event"; 
      id = CALENDAR_EVENTS.length; 
    } else {
      modal_title.innerHTML = "Update Event";
      submit_button.innerHTML = "Update Event";
    }
    
    document.querySelector("#event_name").value = event.name;
    document.querySelector("#event_weekday").value = day; 
    document.querySelector("#event_time").value = event.time;
    document.querySelector("#event_modality").value = event.modality;
    document.querySelector("#event_location").value = event.location;
    document.querySelector("#event_remote_url").value = event.url;
    document.querySelector("#event_attendees").value = event.attendees;
  
    updateLocationOptions(event.modality);
    
    const form = document.querySelector("#event-modal form");
    form.setAttribute("action", `javascript:updateEventFromModal(${id})`);

    EVENT_MODAL.show();
  }
  function updateLocationOptions(modality_value) {
    var location = document.getElementById('event_location_div');
    var remoteUrl = document.getElementById('event_remote_url_div');
    if (modality_value == 'in-person') {
      location.style.display = 'block';
      remoteUrl.style.display = 'none';
    } 
    else 
    {
      location.style.display = 'none';
      remoteUrl.style.display = 'block';
    }
  }

initializeEventModal();
const calendarElement = document.getElementById('calendar');

if (calendarElement) {
  CALENDAR_DAYS.forEach(day => {
    // Create a bootstrap card for each weekday
    var card = createBootstrapCard(day);
    calendarElement.appendChild(card); // Add card to the calendarElement

    // Create title and add it to the card
    var title = createTitle(day);
    card.appendChild(title);

    // Create event icon and add it to the title
    var icon = createEventIcon(card); // Assuming this function returns an icon
    title.appendChild(icon);

    // Create event div and add it to the card
    var eventsDiv = createEventDiv(); // Assuming this function returns an events div
    card.appendChild(eventsDiv);
  });

  // Call updateDOM() after implementing it
  // updateDOM()
} else {
  console.error('Calendar element not found');
}

function createBootstrapCard(day) {
  // Create card element using Bootstrap classes
  let card = document.createElement('div');
  // This is the equivalent of <div class="col-sm m-1 bg-white rounded px-1 px-md-2"> in HTML
  card.className = 'col-sm m-1 bg-white rounded px-1 px-md-2';
  // This the equivalent of <div id="monday"> in HTML
  card.id = day.toLowerCase();
  return card;
}

function createTitle(day) {
  // Create title element
  const title = document.createElement('h5');
  title.className = 'h6 text-center position-relative py-2';
  title.innerHTML = day;

  return title;
}

function createEventIcon(card) {
  // Create icon element. This is just a placeholder example.
  let icon = document.createElement('i');
  icon.className =
  'bi bi-calendar-plus btn position-absolute translate-middle start-100  rounded p-0 btn-link';
  // adding an event listener to the click event of the icon to open the modal
  icon.setAttribute('onclick', `openEventModal({day: ${card.id}})`);

  return icon;
}

function createEventDiv() {
  // Create events div
  let eventsDiv = document.createElement('div');
  // We are adding a class for this container to be able to call it when we're populating the days
  // with the events
  eventsDiv.classList.add('event-container');
  return eventsDiv;

}

/* The function initializeCalendar() initializes the Calendar for your events and it gets called `onload` of your page.
We will complete the TODOs to render the Calendar in the next few steps. */
function initializeCalendar() {
  // You will be implementing this function in section 2: Create Modal
  initializeEventModal();
  // @TODO: Get the div of the calendar which we created using its id. Either use document.getElementById() or document.querySelector()
  const calendarElement = document.getElementById('calendar');
  // Iterating over each CALENDAR_DAYS
  CALENDAR_DAYS.forEach(day => {
    // @TODO: Create a bootstrap card for each weekday. Uncomment the below line and call createBootstrapCard(day) function.
    var card = createBootstrapCard(day);
    // @TODO: Add card to the calendarElement. Use appendChild()
    calendarElement.appendChild(card);
    // @TODO: Uncomment the below line and call createTitle(day) function.
    var title = createTitle(day);
    // @TODO: Add title to the card. Use appendChild()
    card.appendChild(title);
    // @TODO: Uncomment the below line and call createEventIcon(card) function.
    var icon = createEventIcon(card);
    // @TODO: Add icon to the title. Use appendChild()
    title.appendChild(icon);
    // @TODO: Uncomment the below line and and call createEventDiv() function.
    var eventsDiv = createEventDiv();
    // @TODO: Add eventsDiv to the card. Use appendChild()
    card.appendChild(eventsDiv);
    // @TODO: Do a console.log(card) to verify the output on your console.
    console.log(card);
    });

  // @TODO: Uncomment this after you implement the updateDOM() function
   updateDOM()
}
// end of initializeCalendar()
  
  /* *********************************************************************************** */
  
  /* ********************** PART B: 6.3: UPDATE DOM ************************************** */
  
  function createEventElement(id) {
    var eventElement = document.createElement('div');
    eventElement.classList = "event row border rounded m-1 py-1";
    eventElement.setAttribute('id', `event-${id}`);
    return eventElement;
  }
  
  
  function createTitleForEvent(event) {
    var title = document.createElement('div');
    title.classList.add('col', 'event-title');
    title.innerHTML = event.name;
    return title;
  }
  
  function updateDOM() {
  const events = CALENDAR_EVENTS;
  events.forEach((event, id) => {
    // First, let's try to update the event if it already exists.
    // @TODO: Use the `id` parameter to fetch the object if it already exists.
    // Replace <> with the appropriate variable name
    // In templated strings, you can include variables as ${var_name}.
    // For eg: let name = 'John';
    // let msg = `Welcome ${name}`;
    let eventElement = document.querySelector(`#event-${id}`);
    // if event is undefined, i.e. it doesn't exist in the CALENDAR_EVENTS array, make a new one.
    if (eventElement === null) {
      eventElement = createEventElement(id);
      const title = createTitleForEvent(event);
      eventElement.appendChild(title);
      // @TODO: Append the title to the event element. Use .append() or .appendChild()
    } else {
      // @TODO: Remove the old element while updating the event.
      // Use .remove() with the eventElement to remove the eventElement.
      eventElement.remove(); // Remove the old element while updating the event.
      eventElement = createEventElement(id);
      const title = createTitleForEvent(event);
      eventElement.appendChild(title);
    }
    // Add the event name
    const title = eventElement.querySelector('div.event-title');
    title.innerHTML = event.name;
    // Add a tooltip with more information on hover
    // @TODO: you will add code here when you are working on for Part C.
    // @TODO: On clicking the event div, it should open the modal with the fields pre-populated.
    // Replace "<>" with the triggering action.
    eventElement.setAttribute('onclick', `openEventModal({id: ${id}})`);
    // Add the event div to the parent
    document
      .querySelector(`#${event.day.toLowerCase()} .event-container`)
      .appendChild(eventElement);
  });
  updateTooltips();
  }
  
  /* ******************************* PART C: 1. Display Tooltip ********************************************* */
  
  function updateTooltips() {
    const events = document.querySelectorAll('.event');
    
    events.forEach(eventElement => {
      const id = eventElement.getAttribute('id').replace('event-', '');
      const event = CALENDAR_EVENTS[id];
      const tooltipContent = `Name: ${event.name}<br>Time: ${event.time}<br>Location: ${event.modality === 'in-person' ? 'In-Person @ ' + event.location : 'Remote'}`;

      eventElement.setAttribute('title', tooltipContent);
  
      new bootstrap.Tooltip(eventElement, {
        html: true // Allows HTML content inside the tooltip
      });
    });
  }
  
  