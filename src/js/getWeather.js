const axios = require('axios');
const _ = require('lodash');

$(document).ready(function(){
    $("#form-byName").submit(function(){
        check('byName'); 
        return false;
    });
    $("#form-byCoords").submit(function(){
        check('coordinates');
        return false;
    });

    setTimeout(() => { $('html, body').animate({scrollTop:0}, 'slow'); }, 500);
});


function check(usage){

    var lat = $('#lat');
    var lon = $('#lon');
    var cityName = $('#cityName');

    if(usage === "byName" && cityName.prop("disabled") === false){
        getWeather(usage);
    }else if (usage === "coordinates" && lat.prop("disabled") === false){
        getWeather(usage);
    }else if (usage === "byName" && cityName.prop("disabled") === true){
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
        cityName.attr("placeholder", "City / City, country");
        lat.fadeTo("slow", 0.7);
        lon.fadeTo("slow", 0.7);
        cityName.fadeTo("slow", 1);
        $('#SearchBarCoordinates').css("box-shadow", "none");
        $('#SearchBarCity').css("box-shadow", "0 0 7px #ffffffab");
        cityName.focus();

    }else if (usage === "coordinates" && lat.prop("disabled") === true){
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
        lat.focus();
    }
}

function getWeather(usage){
    var cityName = $('#cityName').val();
    var lat = parseFloat($('#lat').val()); 
    var lon = parseFloat($('#lon').val());
    
    if(usage === "byName" && cityName === ""){
        $('#SearchBarCity').css("animation", "shake 0.5s");
        $('#cityName').focus();
        setTimeout(() => { $('#SearchBarCity').css("animation", "none");}, 500);
    }else if(usage === "coordinates" && (lat === "" || lon === "")){
        $('#SearchBarCoordinates').css("animation", "shake 0.5s");
        if(lat === "" && lon === ""){
            $('#lat').focus();
        }else if (lat !== "" && lon === ""){
            $('#lon').focus();
        }else if(lat === "" && lon !== ""){
            $('#lat').focus();
        }
        setTimeout(() => { $('#SearchBarCoordinates').css("animation", "none");}, 500);
    }else{
        if(usage === "byName"){
            var options = {
                method: 'GET',
                url: 'http://api.openweathermap.org/data/2.5/weather',
                params: {
                q: cityName,
                units: 'metric',
                appid: '84fa0ddce2495b1f04851902133c2e3b'
                }
            };
        }else{
            var options = {
                method: 'GET',
                url: 'http://api.openweathermap.org/data/2.5/weather',
                params: {
                    lat: lat,
                    lon: lon,
                    units: 'metric',
                    appid: '84fa0ddce2495b1f04851902133c2e3b'
                }
            };
        }
        (async () => {
            try {
                let response = await axios.request(options);
                weatherCallback(response.data);
            }catch (error) {
                if(usage === "byName"){
                    $('#SearchBarCity').css("animation", "shake 0.5s");
                    setTimeout(() => { $('#SearchBarCity').css("animation", "none");}, 500);
                    $('#cityName').attr("placeholder","not found, retry...");
                    $('#cityName').val("");
                }else{
                    $('#SearchBarCoordinates').css("animation", "shake 0.5s");
                    setTimeout(() => { $('#SearchBarCoordinates').css("animation", "none");}, 500);
                    $('#lat').attr("placeholder","not");
                    $('#lon').attr("placeholder","found");
                    $('#lat').val("");
                    $('#lon').val("");
                }
                console.error(error);
            }
        })()
    }
    
    function weatherCallback(weatherData){

        var cityName = _.get(weatherData, 'name' , 'Error get city');
        var country = _.get(weatherData, 'sys.country' , ' - ');
        var description = _.get(weatherData, 'weather[0].description' , 'Error get weather');
        var lat = _.get(weatherData, 'coord.lat' , '0');
        var lon = _.get(weatherData, 'coord.lon' , '0');

        var icon = _.get(weatherData, 'weather[0].icon' , '03n');
        var temperature = _.get(weatherData, 'main.temp' , ' - ');
        var temperature_min = _.get(weatherData, 'main.temp_min' , ' - ');
        var temperature_max = _.get(weatherData, 'main.temp_max' , ' - ');
        var perceived_temperature = _.get(weatherData, 'main.feels_like' , ' - ');

        var pressure = _.get(weatherData, 'main.pressure' , ' - ');
        var humidity = _.get(weatherData, 'main.humidity' , ' - ');
        var wind_speed = _.get(weatherData, 'wind.speed' , ' - ');
        var clouds = _.get(weatherData, 'clouds.all' , ' - ');
        
        var info = new Array("city", "description","temperature","perceived","temperatureMax","temperatureMin","pressure","humidity","windSpeed","clouds");

        for(let i = 0; i < info.length ; i++){
            $('#'+info[i]).html('');
        }

        if(usage === "byName"){
            $('#lat').attr("placeholder", "Lat: " + lat);
            $('#lon').attr("placeholder", "Lon: " + lon);
            $('#city').append("City: " + cityName + " " + country);
        }else if ( cityName != "" ){
            $('#cityName').attr("placeholder", "City: " + cityName);
            $('#city').append("City: " + cityName + " " + country);
        }else{
            $('#cityName').attr("placeholder", "No city");
            $('#city').append("City: no city");
        }
        $('.div-icon').css('visibility', 'visible');
        $("#icon").attr( "src", "http://openweathermap.org/img/wn/" + icon + "@4x.png" );
        $("#icon").attr( "alt", "Error load image... " );
        $('#description').append(description);
        $('#description').css('textTransform', 'capitalize');
        $('#temperature').append("Temperature: " + temperature + "°C");
        $('#perceived').append("T. perceived: " + perceived_temperature + "°C");
        $('#temperatureMax').append("T. Max: " + temperature_max + "°C");
        $('#temperatureMin').append("T. Min: " + temperature_min + "°C");
        $('#pressure').append("Pressure: " + pressure + "hPa");
        $('#humidity').append("Humidity: " + humidity + "%");
        $('#windSpeed').append("Wind Speed: " + wind_speed + "m/s");
        $('#clouds').append("Clouds: " + clouds + "%");
        $('#cityName').blur();
        $('#lat').blur();
        $('#lon').blur();
        setTimeout(() => { 
            $('html,body').animate({scrollTop: $('#offsetTop').offset().top},'slow');
            $('html,body').animate({scrollTop: $('#offsetTop').offset().top},'slow');
        }, 800);  
   }
}