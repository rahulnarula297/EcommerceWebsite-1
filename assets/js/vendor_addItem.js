{
    $(window).on('scroll',function(){
        if($(window).scrollTop()) {
            $('#addItem').css("padding-top","150px");
        }else {
            $('#addItem').css("padding-top","50px");
        }
    })

    $('#imageInput').on('change', function() {
        var src = URL.createObjectURL(this.files[0]);
        $('.item-img-container img').attr('src', src);
    })

    $('.size-container input').on('click', function() {
        if($(this).prop("checked")) {
            $(this).parents('li').css('transform','scale(1.1');
        }
        else {
            $(this).parents('li').css('transform','none');
        }
    })

    let weight = function() {
        $('input:radio[name="wt"]').change(function() {
            if (this.checked && this.value == 'kg') {
                $('#enter-kg').show();
                $('#enter-gm').hide();
                $('#enter-other').hide();
            }else if (this.checked && this.value == 'gm') {
                $('#enter-gm').show();
                $('#enter-kg').hide();
                $('#enter-other').hide();
            }else if(this.checked && this.value == 'other') {
                $('#enter-gm').hide();
                $('#enter-kg').hide();
                $('#enter-other').show();
            }
        });
    }
    weight();
}