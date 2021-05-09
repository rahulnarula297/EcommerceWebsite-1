$(window).on('scroll', function() {
    if($(window).scrollTop()) {
        $('.section-bg').css('padding-top','110px');
    }else {
        $('.section-bg').css('padding-top','30px');
    }
})

$(window).on('load', function() {
    for(var i=0; i<window.localStorage.length; i++) {
        var prodId = window.localStorage.key(i);
        $(`#${prodId}`).addClass('like');
    }
})

$(".btn-small i").click(function(e){
    e.preventDefault(); 
    var count = $('.like-count').text();
    let productId = $(this).attr('id');
    let value = localStorage.getItem(productId);
    if(value==null){
        localStorage.setItem(productId, 'true');
        $('.btn-small i').addClass('like');
        count++;
        $('.like-count').text(count);
    }else{
        localStorage.removeItem(productId);
        $('.btn-small i').removeClass('like');
        count--;
        $('.like-count').text(count);
    }
    $.ajax({
        type: 'POST',
        url: $(`#id-${productId}`).attr('href'),
        data: {info: count}
    })
});
