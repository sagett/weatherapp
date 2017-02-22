$(function () {
  console.log('ready');
  var url = 'http://api.openweathermap.org/data/2.5/weather';
  var apiKey = '4846f8ae0e168b5a24906e0c47ff92b5';
  var unit = '&units=metric';

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

//Randomize cities
  var cities = ['London', 'Berlin', 'New York', 'Tokyo', 'New Dehli', 'Moskau', 'Sydney', 'Oakland', 'Los Angeles', 'Boston', 'Rome'];

  $('.random').click(function() {
    var rCities = cities[Math.floor(Math.random()*cities.length)];
		console.log("Cities length: " + Math.floor(Math.random()*cities.length));
    console.log("Random city: ", rCities);
    getWeather(url, rCities, apiKey, fetchData, unit);
    });
  });



/*  var prepareData = function(units) {
    var cityName = $('.cityName').val()
    if (cityName && cityName != '') {
      cityName = cityName.trim()
      getWeather()
    } else {
      alert ('Please enter a city name');
    }
  }


  $('.btn-metric').click(function() {
    prepareData('metric');
  })
*/

  function fetchData (forecast) {
    console.log('forecast', forecast);
    var html = '',
    cityName = forecast.name,
    country = forecast.sys.country;
    temp = forecast.main.temp;

      html += '<h3> Weather Forecast for ' + cityName + ', ' + country + ' is ' + temp + '</h3>'
      /*forecast.list.forEach(function(forecastEntry, index, list) {
        html += '<p>' + forecastEntry.dt_txt + ': ' + forecastEntry.main.temp + '</p>';
      }) */
      $('.weatherData').html(html);
  };
