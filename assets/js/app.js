$(function () {
  function getWeather(city, callback) {
    var url = 'http://api.openweathermap.org/data/2.5/weather';
    $.ajax({
      dataType: "jsonp",
      url: url,
      jsonCallback: 'jsonp',
      data: { q: city },
      cache: false,
      success: function (data) {
          data.city = city;
          callback(data);
          console.log('sucess', data);
      }
    });
  }

});
