$(window).on('scroll', function() {
    if($(window).scrollTop()) {
        $('#description').css('padding-top','105px');
    }else {
        $('#description').css('padding-top','0px');
    }
})