$(window).on('load', function() {
    for(var i=0; i<window.localStorage.length; i++) {
        var prodId = window.localStorage.key(i);
        $(`#${prodId} i`).addClass('like');
    }
})

$(".btn-small a").click(function(e){
    e.preventDefault(); 
    let productId = $(this).attr('id');
    var count = $(`#${productId} .like-count`).text();
    let value = localStorage.getItem(productId);
    if(value==null){
        localStorage.setItem(productId, 'true');
        $(`#${productId} i`).addClass('like');
        count++;
        $(`#${productId} .like-count`).text(count);
    }else{
        localStorage.removeItem(productId);
        $(`#${productId} i`).removeClass('like');
        count--;
        $(`#${productId} .like-count`).text(count);
    }
    $.ajax({
        type: 'POST',
        url: $(`#${productId}`).attr('href'),
        data: {info: count}
    })
});
