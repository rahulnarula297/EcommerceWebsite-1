$(window).on('scroll',function(){
    if($(window).scrollTop()) {
        $('#vendor-profile').css("padding-top","90px");
    }else {
        $('#vendor-profile').css("padding-top","0px");
    }
})
{
    let createProfile = function() {

        let postForm = $('.info-form-container form');

        postForm.submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: 'createProfile',
                data: postForm.serialize(),
                success: function(data) {
                    $('.display-firstname').text(`${data.data.info.firstname}`);
                    $('.display-lastname').text(`${data.data.info.lastname}`);
                    $('.display-emailid').text(`${data.data.info.emailid}`);
                    $('.display-bakeryname').text(`${data.data.info.bakeryname}`);
                    $('.display-description').text(`${data.data.info.description}`);
                    $('.display-aboutbakery').text(`${data.data.info.aboutbakery}`);
                    $('.display-speciality').text(`${data.data.info.speciality}`);
                }
            })

            $('.inputbox input').val('')
            $('.textarea textarea').val('');
            $('.info-container').css('display','none');
            $('.profile-details').css('display','initial');
        })
    }

    let editProfile = function() {
        $('.edit-firstname').on('click', function() {
            $('.display-firstname').attr('contenteditable','true');
            $('.display-firstname').focus();
            $('.edit-firstname').css('display','none');
            $('.save-firstname').css('display','initial');
        });
        $('.save-firstname').on('click', function() {
            $('.display-firstname').attr('contenteditable','false');
            $('.edit-firstname').css('display','initial');
            $('.save-firstname').css('display','none');
        });
        $('.edit-lastname').on('click', function() {
            $('.display-lastname').attr('contenteditable','true');
            $('.display-lastname').focus();
            $('.edit-lastname').css('display','none');
            $('.save-lastname').css('display','initial');
        });
        $('.save-lastname').on('click', function() {
            $('.display-lastname').attr('contenteditable','false');
            $('.edit-lastname').css('display','initial');
            $('.save-lastname').css('display','none');
        });
        $('.edit-emailid').on('click', function() {
            $('.display-emailid').attr('contenteditable','true');
            $('.display-emailid').focus();
            $('.edit-emailid').css('display','none');
            $('.save-emailid').css('display','initial');
        });
        $('.save-emailid').on('click', function() {
            $('.display-emailid').attr('contenteditable','false');
            $('.edit-emailid').css('display','initial');
            $('.save-emailid').css('display','none');
        });
        $('.edit-bakeryname').on('click', function() {
            $('.display-bakeryname').attr('contenteditable','true');
            $('.display-bakeryname').focus();
            $('.edit-bakeryname').css('display','none');
            $('.save-bakeryname').css('display','initial');
        });
        $('.save-bakeryname').on('click', function() {
            $('.display-bakeryname').attr('contenteditable','false');
            $('.edit-bakeryname').css('display','initial');
            $('.save-bakeryname').css('display','none');
        });
        $('.edit-description').on('click', function() {
            $('.display-description').attr('contenteditable','true');
            $('.display-description').focus();
            $('.edit-description').css('display','none');
            $('.save-description').css('display','initial');
        });
        $('.save-description').on('click', function() {
            $('.display-description').attr('contenteditable','false');
            $('.edit-description').css('display','initial');
            $('.save-description').css('display','none');
        });
        $('.edit-aboutbakery').on('click', function() {
            $('.display-aboutbakery').attr('contenteditable','true');
            $('.display-aboutbakery').focus();
            $('.edit-aboutbakery').css('display','none');
            $('.save-aboutbakery').css('display','initial');
        });
        $('.save-aboutbakery').on('click', function() {
            $('.display-aboutbakery').attr('contenteditable','false');
            $('.edit-aboutbakery').css('display','initial');
            $('.save-aboutbakery').css('display','none');
        });
        $('.edit-speciality').on('click', function() {
            $('.display-speciality').attr('contenteditable','true');
            $('.display-speciality').focus();
            $('.edit-speciality').css('display','none');
            $('.save-speciality').css('display','initial');
        });
        $('.save-speciality').on('click', function() {
            $('.display-speciality').attr('contenteditable','false');
            $('.edit-speciality').css('display','initial');
            $('.save-speciality').css('display','none');
        });
    }

    let myProducts = function() {
        $('.my-products').on('click', function(e) {
            e.preventDefault();
            $('.products-container').css('display','initial');
            $('.profile-details').css('display','none');
        })
    }

    let deleteProducts = function() {
        $('.remove-product').hide();
        $('.remove-cancel').hide();
        $('.remove-products').on('click', function(e) {
            e.preventDefault();
            $('.remove-product').show();
            $('.remove-products').hide();
            $('.remove-cancel').show();
        })
        $('.remove-cancel').on('click', function(e) {
            e.preventDefault();
            $('.remove-products').show();
            $('.remove-cancel').hide();
            $('.remove-product').hide();
        })
    }

    createProfile();
    editProfile();
    myProducts();
    deleteProducts();
}
