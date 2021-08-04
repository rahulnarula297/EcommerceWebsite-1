$(window).on('scroll', function() {
    if($(window).scrollTop()) {
        $('#description').css('padding-top','105px');
    }else {
        $('#description').css('padding-top','0px');
    }
})

var modal = document.getElementById("imgModal");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

$('#productimg').on('click',function(e) {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
})

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
                    if(data.data.verified == false) {
                        $('.placeorder-btns button').addClass('not-verified');
                        $('.otp-container').css('display','initial');
                    }
                    else if(data.data.verified == true) {
                        $('.placeorder-btns button').addClass('verified');
                        $('.placeorder-btns button').text('VERIFIED');
                        $('.placeorder-btns button').css('text-decoration','none');
                        $('.placeOrder').css('display','initial');
                    }
                }
            })
        })
    }

    let confirmOTP = async function() {
        $('#confirmOTP').on('click', function(e) {
            e.preventDefault();
            let info = {}
            let self = $(this);
            info.email = $('.email input').val();
            info.OTP = $('#first').val() + $('#sec').val() + $('#third').val() + $('#fourth').val() + $('#fifth').val();
            $.ajax({
                type: 'post',
                url: self.attr('href'),
                data: info,
                success: function(data) {
                    console.log(data.data.order);
                    if(data.data.order.isVerified == true) {
                        $('.placeorder-btns button').removeClass('not-verified');
                        $('.placeorder-btns button').addClass('verified');
                        $('.placeorder-btns button').text('VERIFIED');
                        $('.placeorder-btns button').css('text-decoration','none');
                        $('.otp-container').css('display','none');
                        $('.placeOrder').css('display','initial');
                    }else {
                        $('.otp-container .wrong-otp span').css('display','initial');
                        $('.userInput input').val('');
                    }
                }
            })
        })
    }

    let placeOrder = function() {
        $("#placingOrder").on('click', function(e) {
            e.preventDefault();
            let profileId = $("#profile-id").text();
            let productId = $("#product-id").text();
            let info = {};
            info.email = $('.email input').val();
            info.delivery_date = $('.delivery-date input').val();
            info.email = $('.placeorder-form .email input').val();
            info.address = $('.placeorder-form .address input').val();
            info.date = $('.placeorder-form .delivery-date input').val();
            info.flavour = $('.placeorder-form .variants-available input').val();
            info.weight = $('.placeorder-form .choose-weight input').val();
            info.additional_instructions = $('.placeorder-form .instructions textarea').val();
            info.productId = productId;
            let self = $(this);
            $.ajax({
                type: 'post',
                url: self.attr('href'),
                data: info,
                success: function(data) {
                    console.log(data.data);
                    $("#sending-order-details").attr('href',`https://api.whatsapp.com/send?phone=+91${data.data.profile_details.contact}&text=%20 Hi, I want to know about this product of yours%0D%0A`);
                    document.getElementById("sending-order-details").click();
                    document.getElementById("placeOrderClose").click();
                }
            })
        })
    }
    createProduct();
    confirmOTP();
    placeOrder();
}
