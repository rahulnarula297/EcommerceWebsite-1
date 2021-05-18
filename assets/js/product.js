$(window).on('scroll', function() {
    if($(window).scrollTop()) {
        $('.section-bg').css('padding-top','110px');
    }else {
        $('.section-bg').css('padding-top','30px');
    }
})

