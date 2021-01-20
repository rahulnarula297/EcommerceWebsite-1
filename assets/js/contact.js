$(window).on('scroll',function(){
    if($(window).scrollTop()) {
        $('.contact').css("padding-top","150px");
    }else {
        $('.contact').css("padding-top","50px");
    }
})
