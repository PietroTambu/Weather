window.inputClick = function inputClick(type){
    var lat = $('#lat');
    var lon = $('#lon');
    var cityName = $('#cityName');

    if(type === "coordPlaceholder"){
        lat.attr("placeholder", "latitude");
        lon.attr("placeholder", "longitude");
    }else if(type === "namePlaceholder"){
        cityName.attr("placeholder", "City / City, country");
    }
    if(type === "byName"){
        $('#cityName').val("");
    }else if(type === "lon"){
        $('#lon').val("");
    }else if(type === "lat"){
        $('#lat').val("");
    }

}