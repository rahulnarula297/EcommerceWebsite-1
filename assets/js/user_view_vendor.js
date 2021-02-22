$(window).on('scroll', function() {
    if($(window).scrollTop()) {
        $('#user_view_vendor').css('padding-top','105px');
    }else {
        $('#user_view_vendor').css('padding-top','0px');
    }
})