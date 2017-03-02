$(function () {


  //Randomize cities
  var cities = ['London', 'Berlin', 'New York', 'Tokyo', 'New Dehli', 'Moskau', 'Sydney', 'Oakland', 'Los Angeles', 'Boston', 'Rome'];

  $('.random').click(function() {
    var rCities = cities[Math.floor(Math.random()*cities.length)];
    getWeather(url, rCities, apiKey, fetchData);
  });

  $('.btn-primary').click(function() {
    var cityName = $('.cityname').val();
    getWeather(url, cityName, apiKey, fetchData);
  })

});


var url = 'http://api.openweathermap.org/data/2.5/weather';
var apiKey = '4846f8ae0e168b5a24906e0c47ff92b5';
var unit = 'metric';

//Ajax call
function getWeather(url, cityName, apiKey, _fetchData) {
  $.ajax({
    dataType: "jsonp",
    url: url,
    data: { q: cityName, units: unit, APPID: apiKey },
    cache: true,
    success: function (data, status, xhr) {
      _fetchData(data);
      console.log('sucess', xhr.status, data);
      console.log('URL: ', this.url);
    },
    error: function(data, status, xhr) {
      console.log('error: ', xhr.status)

      switch (xhr.status) {
        case 404:
        alert ('not found');
        break;

        case 400:
        alert('bad request');
        break;

        case 500:
        alert('no connection to server');
        break;

        case 502:
        alert('Please enter valid city name');
        break;

        case 503:
        alert('no internet connection');
      }
    },

  /*  statusCode: {
    200: function(xhr) {
      console.log('200-ok');
    },
    404: function(xhr) {
      alert('page not found');
    },
    400: function(xhr) {
      alert('bad request');
    },
    500: function(xhr) {
      alert('no connection to server');
    },
    502: function(xhr) {
      alert('bad gateway');
    },
    503: function(xhr) {
      console.log('503');
      alert('no internet connection');
    }
  },*/
  });


}


function fetchData (forecast) {
  var html = '',
  cityName = forecast.name,
  country = forecast.sys.country;
  temp = forecast.main.temp;

  html += '<h3> Weather Forecast for ' + cityName + ', ' + country + ' is ' + temp + ' Celsius</h3>'
  $('.weatherData').html(html);
};

function erroremessage(){
   alert('a problem occured');
  }
