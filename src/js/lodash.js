
const _ = require('lodash');
export function lodashCheck(weatherData){ 
    var data = { // ALL API DATA NEEDED
        cityName:               _.get(weatherData, 'name' , 'Error get city'),
        country:                _.get(weatherData, 'sys.country' , ' - '),
        description:            _.get(weatherData, 'weather[0].description' , 'Error get weather'),
        lat:                    _.get(weatherData, 'coord.lat' , '0'),
        lon:                    _.get(weatherData, 'coord.lon' , '0'),
        icon:                   _.get(weatherData, 'weather[0].icon' , '03n'),
        temperature:            _.get(weatherData, 'main.temp' , ' - '),
        temperature_min:        _.get(weatherData, 'main.temp_min' , ' - '),
        temperature_max:        _.get(weatherData, 'main.temp_max' , ' - '),
        perceived_temperature:  _.get(weatherData, 'main.feels_like' , ' - '),
        pressure:               _.get(weatherData, 'main.pressure' , ' - '),
        humidity:               _.get(weatherData, 'main.humidity' , ' - '),
        wind_speed:             _.get(weatherData, 'wind.speed' , ' - '),
        clouds:                 _.get(weatherData, 'clouds.all' , ' - ')
    };
    return data
}


