// jQuery "document ready function" 
// Code is executed once the DOM is fully loaded and
// is now ready for manipulation
$(function () {
  // User-created function to dynamically add time-blocks using jQuery
  // Seemed much more efficient than hardcoding time-blocks using HTML
  // Note: All attributes were provided in the assignment starter code
  function createAndAppendTimeBlock(hour, amPm) {
    // Creating div element to represent each time-block
    var timeBlockDiv = $('<div>', {
      // Setting the id attribute
      id: 'hour-' + hour,
      // Setting the class attributes
      class: 'row time-block',
    });

    // Creating inner div element, used to label each time-block with corresponding hour
    var hourDiv = $('<div>', {
      // Setting the class attributes
      class: 'col-2 col-md-1 hour text-center py-3',
      // Setting the text content
      text: hour + amPm,
    });

    // Creating another inner div element, used to allow for user input
    var descriptionTextarea = $('<textarea>', {
      // Setting the class attributes
      class: 'col-8 col-md-10 description',
      // Setting number of rows for text area
      rows: '3',
    });

    // Creating button element, used to save user input to localStorage
    var saveBtn = $('<button>', {
      // Setting the class attributes
      class: 'btn saveBtn col-2 col-md-1',
      // Setting accessibility label
      'aria-label': 'save',
    });

    // Creating new i element, used for the save button's icon
    var saveIcon = $('<i>', {
      // Setting the class attributes
      class: 'fas fa-save',
      // Setting accessibility label
      'aria-hidden': 'true',
    });

    // Appending the icon to each saveBtn
    saveBtn.append(saveIcon);
    // Appending elements to each time-block div
    timeBlockDiv.append(hourDiv, descriptionTextarea, saveBtn);
    // Appending the time-block div to the container
    $('.container-lg').append(timeBlockDiv);
  }

  // Dynamically adding time-blocks to work day scheduler
  // For-loop that iterates from hours 9-17 (9am - 5pm)
  for (var hour = 9; hour <= 17; hour++) {
    // Determine if hour is AM or PM
    var amPm;
    if (hour >= 12) {
      amPm = 'PM';
    } else {
      amPm = 'AM';
    }
    // Generate and append time-blocks to work day scheduler
    createAndAppendTimeBlock(hour > 12 ? hour - 12 : hour, amPm);
  }

  // Adding a listener for click events on the save buttons
  $('.saveBtn').on('click', function () {
    // Retrieve user input
    var timeBlockId = $(this).parent().attr('id');
    var description = $(this).siblings('.description').val();
    // Save to localStorage
    localStorage.setItem(timeBlockId, description);

    // Display custom-made "Appointment Saved!" message to the user
    // The message will appear for 2 seconds and then fade out
    $('.save-message').fadeIn().delay(2000).fadeOut();
  });

  // Function that adds the appropriate class to each time-block
  function applyTimeBlockClass() {
    // Get the current hour using dayjs
    var currentHour = dayjs().hour();

    $('.time-block').each(function () {
      // Retrieve the hour value for each time-block
      var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);

      // Using an if-loop to add/remove appropriate classes to each time-block div
      if (timeBlockHour < currentHour) {
        $(this).addClass('past').removeClass('present future');
      } else if (timeBlockHour > currentHour) {
        $(this).addClass('future').removeClass('past present');
      } else {
        $(this).addClass('present').removeClass('past future');
      }
    });
  }

  // Call to function - applying appropriate classes to time-blocks
  applyTimeBlockClass();

  // Using the jQuery function .each() to loop through each element with the 'time-block' class
  $('.time-block').each(function () {
    // For each time-block element, retrieve the 'id' attribute and store it in a variable
    var iD = $(this).attr('id');
    // Using .getItem() method to retrieve the value associated with the given key 'iD' from localStorage
    var description = localStorage.getItem(iD);
    // Setting value retrieved from localStorage as the value of the '.description' element within the current 'time-block'
    $(this).find('.description').val(description);
  });

  // Utilizing dayjs to retrieve/format time and date elements
  // Get current date using dayjs and formatting it
  var currentDate = dayjs().format('dddd, MMMM D, YYYY');
  // Set formatted date as the text content for the element with 'currentDay'
  $('#currentDay').text(currentDate);

  // Display updating current time using dayjs
  setInterval(function () {
    // Set formatted time as the text content for the element with 'currentTime'
    var currentTime = dayjs().format('h:mm:ss A');
    $('#currentTime').text(currentTime)
  }, 1000); // Function executes every 1000ms (1sec)
});