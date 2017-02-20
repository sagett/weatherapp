$(function () {
  console.log('ready');
  function getWeather(city, callback) {
    var url = 'http://api.openweathermap.org/data/2.5/weather';
    $.ajax({
      dataType: "jsonp",
      url: url,
      jsonCallback: 'jsonp',
      data: { q: city, APPID:'4846f8ae0e168b5a24906e0c47ff92b5' },
      cache: true,
      success: function (data) {
          data.city = city;
          callback(data);
          console.log('sucess', data);
          var widget = showCity(data);
          $('.weatherData').html(widget);
      }
    });
  }

  var cities = ['London', 'Berlin', 'New York', 'Tokyo', 'New Dehli', 'Moskau', 'Sydney'];

  $('.submit').click(function() {
    var rCities = cities[Math.floor(Math.random()*cities.length)];
		console.log(rCities);
    getWeather(rCities, function(returnedData) {
    	console.log(returnedData)
    })

  });

  function showCity() {
    return "<h3>Weather: "+ data.weather[0].main  +"</h3>" +
           "<h3>Weather: "+ data.weather[0].description  +"</h3>";
  }

});
