const axios = require('axios');

function axiosRequest(usage, weatherCallback){
    var cityName = $('#cityName').val();
    var lat = parseFloat($('#lat').val()); 
    var lon = parseFloat($('#lon').val());

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
            weatherCallback(response.data, usage);
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

export function getData(usage, weatherCallback) {
    axiosRequest(usage, data => weatherCallback(data, usage));
}