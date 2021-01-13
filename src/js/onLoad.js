window.onload = function(){
    var lat = $('#lat');
    var lon = $('#lon');
    var cityName = $('#cityName');

    if(window.innerWidth <= 700){
        $(".header").css('font-size', "7vw" );
    }else if(window.innerWidth > 700){
        $(".header").css( 'font-size', "50px" );
    }
    if(window.innerWidth <= 500){
        $("input.search-box").css('font-size', "5vw" );
        $(".button").css('font-size', "4vw" );
        $(".main").css('font-size', "5vw" );
        $(".secondary").css('font-size', "4vw" );
        $("#icon").css('width', "24vw");
        $("#icon").css('height', "24vw");
    }else if(window.innerWidth > 500){
        $("input.search-box").css( 'font-size', "25px" );
        $(".button").css('font-size', "19px" );
        $(".main").css('font-size', '25px' );
        $(".secondary").css('font-size', "20px" );
        $("#icon").css('width', "125px");
        $("#icon").css('height', "125px");
    }

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
    $('#cityName').attr("placeholder", "City - City, country");
    $('.div-icon').css('visibility', 'hidden');
}

$(window).resize(function() {
    if(window.innerWidth <= 700){
        $(".header").css('font-size', "7vw" );
    }else if(window.innerWidth >= 700){
        $(".header").css( 'font-size', "50px" );
    }
    if(window.innerWidth <= 500){
        $("input.search-box").css('font-size', "5vw" );
        $(".button").css('font-size', "4vw" );
        $(".main").css('font-size', "5vw" );
        $(".secondary").css('font-size', "4vw" );
        $("#icon").css('width', "24vw");
        $("#icon").css('height', "24vw");
    }else if(window.innerWidth > 500){
        $("input.search-box").css( 'font-size', "25px" );
        $(".button").css('font-size', "19px" );
        $(".main").css('font-size', '25px' );
        $(".secondary").css('font-size', "20px" );
        $("#icon").css('width', "125px");
        $("#icon").css('height', "125px");
    }
});