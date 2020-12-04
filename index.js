function getWeather(){
    $('.weatherResponse').html('');
    var cityName = $('#cityName').val();
    var lat = $('#lat').val();
    var lon = $('#lon').val();

    //identificazione se ricerca tramite coordinate o nome cittá.
    
    if(cityName !== ""){
        var apiCall = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=84fa0ddce2495b1f04851902133c2e3b';
    }else{
        var apiCall = 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ lon +'&appid=84fa0ddce2495b1f04851902133c2e3b';
    }
    

    $.getJSON(apiCall, weatherCallback);

    function weatherCallback(weatherData){

        var cityName = weatherData.name;
        var country = weatherData.sys.country;
        // var main = weatherData.weather[0].main;
        var description = weatherData.weather[0].description;

        var temperature = weatherData.main.temp;
        var temperature_min = weatherData.main.temp_min;
        var temperature_max = weatherData.main.temp_max;
        var perceived_temperature = weatherData.main.feels_like;

        var pressure = weatherData.main.pressure;
        var humidity = weatherData.main.humidity;
        var wind_speed = weatherData.wind.speed;
        var clouds = weatherData.clouds.all;



        $('.weatherResponse').append("The weather in " + cityName + " " + country + " is currently " + description);
        $('.weatherResponse').append("The temperature is: " + temperature + " K");
        
    }


}