$(window).on('scroll', function() {
    if($(window).scrollTop()) {
        $('#description').css('padding-top','105px');
    }else {
        $('#description').css('padding-top','0px');
    }
})

var modal = document.getElementById("imgModal");
var img = document.getElementById("productimg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}
var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
}

function clickEvent(first,last){
    if(first.value.length){
        document.getElementById(last).focus();
    }
}

{
    let createProduct = function() {
        let placeOrderForm = $('#placeOrderModal form');
        placeOrderForm.submit(function(e) {
            e.preventDefault();
            let url = $(this).prop('action');
            let info = {};
            info.name = $('.placeorder-form .name input').val();
            info.phone = $('.placeorder-form .phone input').val();
            info.email = $('.placeorder-form .email input').val();
            info.address = $('.placeorder-form .address input').val();
            info.date = $('.placeorder-form .delivery-date input').val();
            info.additional_instructions = $('.placeorder-form .instructions textarea').val();
            $.ajax({
                type: 'post',
                url: url,
                data: info,
                success: function(data) {
                    console.log(data);
                }
            })
        })
    }
    createProduct();
}
