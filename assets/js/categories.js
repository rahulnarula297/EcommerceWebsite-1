$(window).on('scroll', function() {
    if($(window).scrollTop()) {
        $('#category').css('padding-top','105px');
    }else {
        $('#category').css('padding-top','0px');
    }
})