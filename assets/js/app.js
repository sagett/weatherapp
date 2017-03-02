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
    success: function (data) {
      _fetchData(data);
      console.log('sucess', data);
      console.log('URL: ', this.url);
    },
    error: function(jqXHR, exception) {
            if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404) {
                alert('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                alert('Time out error.');
            } else if (exception === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error.\n' + jqXHR.responseText);
            }
        },
    statusCode: {
    404: function() {
      alert('page not found');
    },
    400: function() {
      alert('bad request');
    },
    500: function() {
      alert('no connection to server');
    },
    502: function() {
      alert('bad gateway');
    },
    503: function() {
      alert('no internet connection');
    }
  },
  }).fail(function(error) {
    console.error("Error", JSON.strigify(error));
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
