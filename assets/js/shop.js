$(window).on('scroll', function() {
    if($(window).scrollTop()) {
        $('#shop').css('padding-top','105px');
    }else {
        $('#shop').css('padding-top','0px');
    }
})