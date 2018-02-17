;
(function IIFE(){
  'use strict';
  
    // =============== Variables ================
    let userLatitude  = 0,
        userLongitude = 0,
        degreesC      = 0,
        degreesF      = 0;
        
    const unitsButton = document.getElementById('units-button'),
          tempDisplay = document.getElementById('temp-display');
        
  // =============== Page Load ================
  // 
  $(document).ready(function getLocationAndWeatherInformation(){
    // Get location 
    navigator.geolocation.getCurrentPosition(function assignCurrentPosition(){
        userLatitude  = position.coords.latitude;
        userLongitude = position.coords.longitude;
        
        // Get the weather info    
        getWeather();
      });
  
  });
    
  // ============= Click Events ==============
    unitsButton.addEventListener('click', function addChangeUnitsListener(){
        // change the display
        tempDisplay.innerHTML = "100°";
    });
  
  // ============== Functions ================
  // Get quote from Quotes on Design API
  function getWeather(){
        var xhttp = new XMLHttpRequest();
      
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
              // convert the response to JSON
              var response = JSON.parse(this);
              
              console.log(response);
              
              degreesC = response.main.temp;
              degreesF = cToF();
            }
        };
      
        // Get the JSON data from the url
        xhttp.open('GET', `https://fcc-weather-api.glitch.me/api/current?lat=${userLatitude}&lon=${userLongitude}`, true);
        xhttp.send();
  };
  
  //   Convert from degrees Celsius to degrees Farenheit
  function cToF(){
    // temperature in Celsius times 9/5, plus 32.
    degreesF = (degreesC * (9/5)) + 32;
  };
  
})();

/*
    get the current position
    
    display to html <p> element
    
    button to change from C to F
        include the conversion formula in a function
*/