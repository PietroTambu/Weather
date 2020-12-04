function getWeather(use){
    var cityName = $('#cityName').val();
    var lat = $('#lat').val();
    var lon = $('#lon').val();
    
    if(use === "byName" && cityName === ""){
        alert("inserire una cittá");
    }else if(use === "coordinates" && (lat === "" || lon === "")){
        alert("Inserire le coordinate mancanti");
    }else{
        if(cityName !== ""){
            var apiCall = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=84fa0ddce2495b1f04851902133c2e3b';
        }else{
            var apiCall = 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ lon +'&appid=84fa0ddce2495b1f04851902133c2e3b';
        }
        $.getJSON(apiCall, weatherCallback).fail( function() { alert("error");});
    }
    
    

    function weatherCallback(weatherData){

        var cityName = weatherData.name;
        var country = weatherData.sys.country;
        //var main = weatherData.weather[0].main;
        var description = weatherData.weather[0].description;
        var lat = weatherData.coord.lat;
        var lon = weatherData.coord.lon;

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

        if(use === "byName"){
            $('#lat').attr("placeholder", "Lat: " + lat);
            $('#lon').attr("placeholder", "Lon: " + lon);
            $('.city').append("City: " + cityName + " " + country);
        }else if ( cityName != "" ){
            $('#cityName').attr("placeholder", "City: " + cityName);
            $('.city').append("City: " + cityName + " " + country);
        }else{
            $('#cityName').attr("placeholder", "No city");
            $('.city').append("City: no city");
        }

        $('.description').append(description);
        $('.description').css('textTransform', 'capitalize');
        $('.temperature').append("Temperature: " + temperature + " °C");
        $('.perceived').append("T. perceived: " + perceived_temperature + " °C");
        $('.temperatureMax').append("T. Max: " + temperature_max + " °C");
        $('.temperatureMin').append("T. Min: " + temperature_min + " °C");
        $('.pressure').append("Pressure: " + pressure + " hPa");
        $('.humidity').append("Humidity: " + humidity + " %");
        $('.windSpeed').append("Wind Speed: " + wind_speed + " m/s");
        $('.clouds').append("Clouds: " + clouds + " %"); 

    }
}

function nome(){
    var lat = $('#lat');
    var lon = $('#lon');
    var cityName = $('#cityName');

    lat.val("");
    lon.val("");

    lat.prop("disabled", true);
    lon.prop("disabled", true);

    $('#button-coord').html('use');
    lat.fadeTo("slow", 0.7);
    lon.fadeTo("slow", 0.7);
    cityName.fadeTo("slow", 1);
    $('#SearchBarCity').css("box-shadow", "0 0 7px #ffffffab");
    $('#SearchBarCoordinates').css("box-shadow", "none");
}

function coordinates(){
    var cityName = $('#cityName');
    var lat = $('#lat');
    var lon = $('#lon');
    cityName.val("");
    cityName.prop("disabled", true);
    $('#button-byName').html('use');
    cityName.fadeTo("slow", 0.7);
    lat.fadeTo("slow", 1);
    lon.fadeTo("slow", 1);
    $('#SearchBarCoordinates').css("box-shadow", "0 0 7px #ffffffab");
    $('#SearchBarCity').css("box-shadow", "none");
}

function check(use){

    var lat = $('#lat');
    var lon = $('#lon');
    var cityName = $('#cityName');

    if(use === "byName" && cityName.prop("disabled") === false){
        getWeather(use);
    }else if (use === "coordinates" && lat.prop("disabled") === false){
        getWeather(use);
    }else if (use === "byName" && cityName.prop("disabled") === true){
        // cambiare da coords a byName
        lat.val("");
        lon.val("");
        cityName.val("");

        lat.prop("disabled", true);
        lon.prop("disabled", true);
        cityName.prop("disabled", false);

        $('#button-coord').html('use');
        $('#button-byName').html('Search');
        lat.attr("placeholder", "latitude");
        lon.attr("placeholder", "longitude");
        cityName.attr("placeholder", "Insert name of city");
        lat.fadeTo("slow", 0.7);
        lon.fadeTo("slow", 0.7);
        cityName.fadeTo("slow", 1);
        $('#SearchBarCoordinates').css("box-shadow", "none");
        $('#SearchBarCity').css("box-shadow", "0 0 7px #ffffffab");

    }else if (use === "coordinates" && lat.prop("disabled") === true){
        // cambiare da byName a coords
        lat.prop("disabled", false);
        lon.prop("disabled", false);
        cityName.prop("disabled", true);
        
        lat.val("");
        lon.val("");
        cityName.val("");

    
        $('#button-coord').html('Search');
        $('#button-byName').html('use');
        cityName.attr("placeholder", "city name");
        lat.attr("placeholder", "latitude");
        lon.attr("placeholder", "longitude");
        lat.fadeTo("slow", 1);
        lon.fadeTo("slow", 1);
        cityName.fadeTo("slow", 0.7);
        $('#SearchBarCoordinates').css("box-shadow", "0 0 7px #ffffffab");
        $('#SearchBarCity').css("box-shadow", "none");
    }
}
