;
(function IIFE(){
  "use strict";
  
  // =============== Variables ================
  var
  
  // =============== Page Load ================
  // 
  $(document).ready(function getLocationAndWeatherInformation(){
    // Get location 
    // Display weather info
    
  });
    
  // ============= Click Events ==============
  
  
  // ============== Functions ================
  // Get quote from Quotes on Design API
  function getQuote(){
      var xhttp = new XMLHttpRequest();
      
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          // convert the response to JSON
          // var response = JSON.parse(this.responseText);
      };
      
      // Get the JSON data from the url
      xhttp.open("GET", "https://fcc-weather-api.glitch.me/", true);
      xhttp.send();
  };
  
})();