const _ = require('lodash');
import { getData } from './service.js'

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

function changeUsage(currentUsage){
    var lat = $('#lat');
    var lon = $('#lon');
    var cityName = $('#cityName');

    // Clear input value
    lat.val(""); lon.val(""); cityName.val("");

    // Disable input
    if (currentUsage === "byName")      { lat.prop("disabled", false); lon.prop("disabled", false); cityName.prop("disabled", true ); }
    if (currentUsage === "byCoords")    { lat.prop("disabled", true ); lon.prop("disabled", true ); cityName.prop("disabled", false); }

    // Change button name
    if (currentUsage === "byName")      { $('#button-coord').html('Search'); $('#button-byName').html('use'); }
    if (currentUsage === "byCoords")    { $('#button-byName').html('Search'); $('#button-coord').html('use'); }

    // Change placeholder's name (same for both)
    lat.attr("placeholder", "latitude"); lon.attr("placeholder", "longitude"); cityName.attr("placeholder", "City - City, country");

    // CSS animation
    if (currentUsage === "byName")      { lat.fadeTo("slow", 1); lon.fadeTo("slow", 1); cityName.fadeTo("slow", 0.7); $('#SearchBarCoordinates').css("box-shadow", "0 0 7px #ffffffab"); $('#SearchBarCity').css("box-shadow", "none"); lat.focus();}
    if (currentUsage === "byCoords")    { lat.fadeTo("slow", 0.7); lon.fadeTo("slow", 0.7); cityName.fadeTo("slow", 1); $('#SearchBarCity').css("box-shadow", "0 0 7px #ffffffab"); $('#SearchBarCoordinates').css("box-shadow", "none"); cityName.focus(); }
    
}

function check(usage){

    var lat = $('#lat');
    var cityName = $('#cityName');

    if(usage === "byName" && cityName.prop("disabled") === false){
        getWeather(usage);
    }else if (usage === "coordinates" && lat.prop("disabled") === false){
        getWeather(usage);
    }else if (usage === "byName" && cityName.prop("disabled") === true){
        changeUsage("byCoords");
    }else if (usage === "coordinates" && lat.prop("disabled") === true){
        changeUsage("byName");
    }
}

function getWeather(usage){
    var cityName = $('#cityName').val();
    var lat = parseFloat($('#lat').val()); 
    var lon = parseFloat($('#lon').val());
    
    if(usage === "byName" && cityName === ""){
        // inserimento nome cittá vuoto.
        $('#SearchBarCity').css("animation", "shake 0.5s");
        $('#cityName').focus();
        setTimeout(() => { $('#SearchBarCity').css("animation", "none");}, 500);
    }else if(usage === "coordinates" && (lat === "" || lon === "")){
        // inserimento una delle due coordinate vuote.
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
        getData(usage, data => weatherCallback(data, usage));
    }
}

function weatherCallback(weatherData, usage){

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