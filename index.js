function getWeather(){
    //$('.weatherResponse').html('');
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
        //var main = weatherData.weather[0].main;
        var description = weatherData.weather[0].description;

        var temperature = Math.round((weatherData.main.temp - 273.15) * 100) / 100;
        var temperature_min = Math.round((weatherData.main.temp_min - 273.15) * 100) / 100;
        var temperature_max = Math.round((weatherData.main.temp_max - 273.15) * 100) / 100;
        var perceived_temperature = Math.round((weatherData.main.feels_like - 273.15) * 100) / 100;

        var pressure = weatherData.main.pressure;
        var humidity = weatherData.main.humidity;
        var wind_speed = weatherData.wind.speed;
        var clouds = weatherData.clouds.all;
        
        var info = new Array("city", "description","temperature","perceived","temperatureMax","temperatureMin","pressure","humidity","windSpeed","clouds");

        for(let i = 0; i < info.length ; i++){
            $('.'+info[i]).html('');
        }

        $('.city').append(cityName + " " + country);
        $('.description').append(description);
        $('.description').css('textTransform', 'capitalize');
        $('.temperature').append("Temperature: " + temperature + " °C");
        $('.perceived').append("T. perceived: " + perceived_temperature + " °C");
        $('.temperatureMax').append("T. Max: " + temperature_max + " °C");
        $('.temperatureMin').append("T. Min: " + temperature_min + " °C");
        $('.pressure').append("Pressure: " + pressure + " hPa");
        $('.humidity').append("Humidity " + humidity + " %");
        $('.windSpeed').append("Wind Speed: " + wind_speed + " m/s");
        $('.clouds').append("Clouds: " + clouds + " %");
       
    }


}

function nome(){
    var lat = $('#lat');
    var lon = $('#lon');

    lat.val("");
    lon.val("");

    lat.prop("disabled", true);
    lon.prop("disabled", true);

    $('#button-coord').html('use me');
    lat.attr("placeholder", "----------");
    lon.attr("placeholder", "----------");
}

function coordinates(){
    var name = $('#cityName');

    name.val("");

    name.prop("disabled", true);
}

