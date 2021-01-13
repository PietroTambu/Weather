import { getData } from './service.js';

$(document).ready(function(){
    $("#form-byName").submit(function(){
        check('byName'); 
        return false;
    });
    $("#form-byCoords").submit(function(){
        check('byCoords');
        return false;
    });
    // scroll up onload
    setTimeout(() => { $('html, body').animate({scrollTop:0}, 'slow'); }, 500);
});

function check(usage){
    
    var cityName = $('#cityName');
    var lat = $('#lat');
    // checkError
    if      (usage === "byName" && cityName.prop("disabled") === false) { checkError(usage) }
    else if (usage === "byCoords" && lat.prop("disabled") === false)    { checkError(usage) }
    // changeUsage
    else if (usage === "byName" && cityName.prop("disabled") === true)  { changeUsage(usage) }
    else if (usage === "byCoords" && lat.prop("disabled") === true)     { changeUsage(usage) }

}

function changeUsage(usage){
    var lat = $('#lat');
    var lon = $('#lon');
    var cityName = $('#cityName');
    
    // Clear input value
    lat.val(""); lon.val(""); cityName.val("");

    // Disable/enable input
    if (usage === "byName")      { lat.prop("disabled", true ); /**/ lon.prop("disabled", true ); /**/ cityName.prop("disabled", false) }
    if (usage === "byCoords")    { lat.prop("disabled", false); /**/ lon.prop("disabled", false); /**/ cityName.prop("disabled", true ) }

    // Change buttons name
    if (usage === "byName")      { $('#button-byName').html('Search'); /**/ $('#button-coord').html('use') }
    if (usage === "byCoords")    { $('#button-coord').html('Search'); /**/ $('#button-byName').html('use') }

    // Change placeholder name (same for both)
    lat.attr("placeholder", "latitude"); /**/ lon.attr("placeholder", "longitude"); /**/ cityName.attr("placeholder", "City - City, country");

    // CSS animation
    if (usage === "byName")      { lat.fadeTo("slow", 0.7); /**/ lon.fadeTo("slow", 0.7); /**/ cityName.fadeTo("slow", 1); /**/ $('#SearchBarCity').css("box-shadow", "0 0 7px #ffffffab"); /**/ $('#SearchBarCoordinates').css("box-shadow", "none"); /**/ cityName.focus() }
    if (usage === "byCoords")    { lat.fadeTo("slow", 1); /**/ lon.fadeTo("slow", 1); /**/ cityName.fadeTo("slow", 0.7); /**/ $('#SearchBarCoordinates').css("box-shadow", "0 0 7px #ffffffab"); /**/ $('#SearchBarCity').css("box-shadow", "none"); /**/ lat.focus() }
    
}

function checkError(usage){
    var cityName = $('#cityName').val();
    var lat = $('#lat').val(); 
    var lon = $('#lon').val();

    // error handling (empty fields)
    if (usage === "byName" && cityName === "") { // city input
        $('#SearchBarCity').css("animation", "shake 0.5s");
        $('#cityName').focus();
        setTimeout(() => { $('#SearchBarCity').css("animation", "none");}, 500);
    }else if (usage === "byCoords" && lat === "") { // lat input
        $('#SearchBarCoordinates').css("animation", "shake 0.5s");
        $('#lat').focus();
        setTimeout(() => { $('#SearchBarCoordinates').css("animation", "none");}, 500);
    }else if (usage === "byCoords" && lon === "") { //lon input
        $('#SearchBarCoordinates').css("animation", "shake 0.5s");
        $('#lon').focus();
        setTimeout(() => { $('#SearchBarCoordinates').css("animation", "none");}, 500);
    }else { // else getData (service.js)
        getData(usage, data => weatherCallback(data, usage), error => weatherCallbackError(error, usage)); 
    } 
}

function weatherCallbackError(error, usage){
    if (usage === "byName") {
        $('#SearchBarCity').css("animation", "shake 0.5s");
        setTimeout(() => { $('#SearchBarCity').css("animation", "none");}, 500);
        $('#cityName').attr("placeholder","not found, retry...");
        $('#cityName').val("");
    } else if (usage === "byCoords") {
        $('#SearchBarCoordinates').css("animation", "shake 0.5s");
        setTimeout(() => { $('#SearchBarCoordinates').css("animation", "none");}, 500);
        $('#lat').attr("placeholder","not");
        $('#lon').attr("placeholder","found");
        $('#lat').val("");
        $('#lon').val("");
    }
    console.clear();
    console.error("Weather not found, wrong input (" + usage + ")");
    console.log(error);
}

function weatherCallback(data, usage){
    // Clear old data
    var info = ["city","description","temperature","perceived","temperatureMax","temperatureMin","pressure","humidity","windSpeed","clouds"];

    for(let i = 0; i < info.length ; i++){
        $('#'+info[i]).html('');
    }
    // insert new data in DOM + CSS effects
    if(usage === "byName"){
        $('#lat').attr("placeholder", "Lat: " + data.lat);
        $('#lon').attr("placeholder", "Lon: " + data.lon);
        $('#city').append("City: " + data.cityName + " " + data.country);
    }else if ( data.cityName !== "" ){
        $('#cityName').attr("placeholder", "City: " + data.cityName);
        $('#city').append("City: " + data.cityName + " " + data.country);
    }else{
        $('#cityName').attr("placeholder", "No city");
        $('#city').append("City: no city");
    }
    $('.div-icon').css('visibility', 'visible');
    $("#icon").attr( "src", "http://openweathermap.org/img/wn/" + data.icon + "@4x.png" );
    $("#icon").attr( "alt", "Error load image... " );
    $('#description').append(data.description);
    $('#description').css('textTransform', 'capitalize');
    $('#temperature').append("Temperature: " + data.temperature + "°C");
    $('#perceived').append("T. perceived: " + data.perceived_temperature + "°C");
    $('#temperatureMax').append("T. Max: " + data.temperature_max + "°C");
    $('#temperatureMin').append("T. Min: " + data.temperature_min + "°C");
    $('#pressure').append("Pressure: " + data.pressure + "hPa");
    $('#humidity').append("Humidity: " + data.humidity + "%");
    $('#windSpeed').append("Wind Speed: " + data.wind_speed + "m/s");
    $('#clouds').append("Clouds: " + data.clouds + "%");
    $('#cityName').blur();
    $('#lat').blur();
    $('#lon').blur();
    setTimeout(() => { 
        $('html,body').animate({scrollTop: $('#offsetTop').offset().top},'slow');
    }, 800);  
}