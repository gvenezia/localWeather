;
(function IIFE(){
  'use strict';
  
    // =============== Variables ================
    let userLatitude  = 0,
        userLongitude = 0,
        degreesC      = 0,
        degreesF      = 0;
        
    const unitsButton = document.getElementById('units-button'),
          tempDisplay = document.getElementById('temp-display'),
          cityName    = document.getElementById('city-name');
        
  // =============== Page Load ================
  // 
  $(document).ready(function getLocationAndWeatherInformation(){
    // Get location 
    navigator.geolocation.getCurrentPosition(function assignCurrentPosition(position){
        userLatitude  = position.coords.latitude;
        userLongitude = position.coords.longitude;
        
        // Get the weather info    
        getWeather();
      });
  
  });
    
  // ============= Click Events ==============
    unitsButton.addEventListener('click', function addChangeUnitsListener(){
        // change the display
        tempDisplay.innerHTML = `${degreesF}° F`;
    });
  
  // ============== Functions ================
  // Get quote from Quotes on Design API
  function getWeather(){
        var xhttp = new XMLHttpRequest();
      
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
              let apiResponse = JSON.parse(this.responseText);
              
              console.log(apiResponse);
            //   console.log(response);
              
              degreesC = apiResponse.main.temp;
              cToF();
              
              tempDisplay.innerHTML = `${degreesC}° C`;
              
              cityName.innerHTML = apiResponse.name;
            }
        };
      
        // Get the JSON data from the url
        xhttp.open('GET', `https://fcc-weather-api.glitch.me/api/current?lat=${userLatitude}&lon=${userLongitude}`, true);
        xhttp.send();
  };
  
  //   Convert from degrees Celsius to degrees Farenheit
  function cToF(){
    // temperature in Celsius times 9/5, plus 32.
    degreesF = Math.round( (degreesC * (9/5)) + 32 );
    
  };
  
})();

/*
    get the current position
    
    display to html <p> element
    
    button to change from C to F
        include the conversion formula in a function
*/