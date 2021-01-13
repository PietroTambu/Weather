const axios = require('axios');
import { lodashCheck } from './lodash.js';

function axiosRequest(usage, weatherCallback, weatherCallbackError){
    var cityName = $('#cityName').val();
    var lat = parseFloat($('#lat').val());
    var lon = parseFloat($('#lon').val());
    // creating options based on usage
    if (usage === "byName"){
        var options = {
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather',
            params: {
                q: cityName,
                units: 'metric',
                appid: String(process.env.API_KEY)
            }
        };
    }else if (usage === "byCoords") {
        var options = {
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather',
            params: {
                lat: lat,
                lon: lon,
                units: 'metric',
                appid: String(process.env.API_KEY)
            }
        };
    }
    // axios request
    (async () => {
        try {
            let response = await axios.request(options);
            weatherCallback(lodashCheck(response.data), usage); // checking input from axios using lodash _.get
        }catch (error) {
            weatherCallbackError(error, usage);
        }
    })()
}

export function getData(usage, weatherCallback, weatherCallbackError) {
    axiosRequest(usage, data => weatherCallback(data, usage), error => weatherCallbackError(error, usage));
}