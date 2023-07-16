// jQuery "document ready function" 
// Code is executed once the DOM is fully loaded and
// is now ready for manipulation
$(function () {
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
    // Using dayjs to retrieve current hour
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
    // Setting value retrieved from localStroage as the value of the '.description' element within the current 'time-block'
    $(this).find('.description').val(description);
  });

  // Utilizing dayjs to retrieve/format time and date elements
  // Get current date using dayjs and formatting it 
  var currentDate = dayjs().format('dddd, MMMM D, YYYY');
  // Set formatted date as the text content for the element with 'currentDay'
  $('#currentDay').text(currentDate);

  // Display updating current time using dayjs
  setInterval(function () {
    // Set formatted tine as the text content for the element with 'currentTime'
    var currentTime = dayjs().format('h:mm:ss A');
    $('#currentTime').text(currentTime)
  }, 1000); // Function executes every 1000ms (1sec)
});