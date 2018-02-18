;
(function IIFE(){
  'use strict';
  
    // =============== Variables ================
    let userLatitude  = 0,
        userLongitude = 0,
        degreesC      = 0,
        degreesF      = 0,
        apiResponse   = {},
        iconUrl       = "";        
        
    const unitsButton       = document.getElementById('units-button'),
          tempDisplay       = document.getElementById('temp-display'),
          cityName          = document.getElementById('city-name'),
          weatherIcon       = document.getElementById('weather-icon'),
          weatherDescription= document.getElementById('weather-description')
        
  // =============== Page Load ================
  // 
  document.addEventListener("DOMContentLoaded", function getLocationAndWeatherInformation(){
    // Get location 
    navigator.geolocation.getCurrentPosition(function assignCurrentPosition(position){
        userLatitude  = position.coords.latitude;
        userLongitude = position.coords.longitude;
        
        getWeatherInfoFromApiAndSetHtml();
        
    
      });
  });
    
  // ============= Click Events ==============
    unitsButton.addEventListener('click', function addChangeUnitsListener(){
        // Polyfill for endsWith (no support in IE)
        if (!String.prototype.endsWith) {
        	String.prototype.endsWith = function(search, this_len) {
        		if (this_len === undefined || this_len > this.length) {
        			this_len = this.length;
        		}
        		return this.substring(this_len - search.length, this_len) === search;
        	};
        }
        
        // change the display
        if (tempDisplay.innerHTML.endsWith('C')) {
            tempDisplay.innerHTML = `${degreesF}° F`;
        } else {
            tempDisplay.innerHTML = `${degreesC}° C`;
        }
    
    });
  
  // ============== Functions ================
  function getWeatherInfoFromApiAndSetHtml(){
        var xhttp = new XMLHttpRequest();
      
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
              apiResponse = JSON.parse(this.responseText);
              
              setHtmlDisplayWithWeatherInfo();
            }
        };
      
        // Get the JSON data from the url with user position
        xhttp.open('GET', `https://fcc-weather-api.glitch.me/api/current?lat=${userLatitude}&lon=${userLongitude}`, true);
        xhttp.send();
  };
  
  function setHtmlDisplayWithWeatherInfo() {
    //   Assign the celsius temp rounded to the tens place
      degreesC = Math.round(10 * apiResponse.main.temp)/10;
      
    //   create the degreesF with makeDegreesFfromC
      makeDegreesFfromC();
      
    //   Set the display elements
      tempDisplay.innerHTML = `${degreesF}° F`;
      weatherIcon.innerHTML = `<img id="weather-icon" src="${apiResponse.weather[0].icon}">`;
      weatherDescription.innerHTML = apiResponse.weather[0].description.toLowerCase();
      cityName.innerHTML = apiResponse.name;
      
      setTempDisplayColor()
  }
  
  //   Convert from degrees Celsius to degrees Farenheit
  function makeDegreesFfromC(){
    // temperature in Celsius times 9/5, plus 32.
    degreesF = Math.round( (degreesC * (9/5)) + 32 );
    
  };
  
  // Uses degreesF to dynamically change the display color, bluer is colder, redder is warmer
  function setTempDisplayColor() {
      if (degreesF < 0){
          tempDisplay.style.color = `hsl(250, 100%, 35%)`; // If below 0° set to dark blue
      } else if (degreesF > 100) {
          tempDisplay.style.color = `hsl(350, 100%, 35%)`; // If above 100° set to bright red
      } else {
          tempDisplay.style.color = `hsl(${degreesF + 250}, 100%, 35%)`; // Otherwise vary the hue between blue and red 
      }
  };
  
})();
