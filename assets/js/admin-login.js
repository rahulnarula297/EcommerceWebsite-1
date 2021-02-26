$(window).on('scroll', function() {
    if($(window).scrollTop()) {
        $('#login-page').css('padding-top','105px');
    }else {
        $('#login-page').css('padding-top','0px');
    }
})