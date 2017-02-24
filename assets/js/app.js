$(function () {

  //Randomize cities
  var cities = ['London', 'Berlin', 'New York', 'Tokyo', 'New Dehli', 'Moskau', 'Sydney', 'Oakland', 'Los Angeles', 'Boston', 'Rome'];

  $('.random').click(function() {
    var rCities = cities[Math.floor(Math.random()*cities.length)];
    console.log("Cities length: " + Math.floor(Math.random()*cities.length));
    console.log("Random city: ", rCities);
    getWeather(url, rCities, apiKey, fetchData);
  });

  $('.btn-primary').click(function() {
    console.log('click');
    var cityName = $('.cityname').val();
    console.log('cityname', cityName);
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
    }
  }).fail(function(error) {
    console.error("Error", JSON.strigify(error));
  });
}


function fetchData (forecast) {
  console.log('forecast', forecast);
  var html = '',
  cityName = forecast.name,
  country = forecast.sys.country;
  temp = forecast.main.temp;

  html += '<h3> Weather Forecast for ' + cityName + ', ' + country + ' is ' + temp + ' Celsius</h3>'
  $('.weatherData').html(html);
};
