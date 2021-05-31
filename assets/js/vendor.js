$(window).on('scroll',function(){
    if($(window).scrollTop()) {
        $('#vendor-profile').css("padding-top","90px");
    }else {
        $('#vendor-profile').css("padding-top","0px");
    }
})
{
    let createProfile = function() {

        let infoForm = $('.info-form-container form');

        infoForm.submit(function(e) {
            e.preventDefault();
            let postForm = new FormData(this);
            $.ajax({
                type: 'post',
                url: 'createProfile',
                data: postForm,
                success: function(data) {
                    let image_description = showImageDescription(data.data.info);
                    let Profile = showProfileDOM(data.data.info);
                    $('.profile-board').append(image_description);
                    $('.main-container').append(Profile);
                    editProfile();
                    // $('.display-firstname').text(`${data.data.info.firstname}`);
                    // $('.display-lastname').text(`${data.data.info.lastname}`);
                    // $('.display-contactname').text(`${data.data.info.contact}`);
                    // $('.display-bakeryname').text(`${data.data.info.bakeryname}`);
                    // $('.display-instaid').text(`${data.data.info.instaid}`);
                    // $('.display-fbid').text(`${data.data.info.fbid}`);
                    // $('.display-area').text(`${data.data.info.areacovered}`);
                    // $('.display-description').text(`${data.data.info.description}`);
                    // $('.display-speciality').text(`${data.data.info.speciality}`);
                },
                contentType: false,
                processData: false
            })

            $('.inputbox input').val('')
            $('.textarea textarea').val('');
            $('.info-container').css('display','none');
            $('.profile-details').css('display','initial');
        })
    }

    let showImageDescription = function(info) {
        return $(`
            <div class="profile-description">
                    
                <div class="profile-image">
                    <img src="${info.profileimage}" alt="${info.firstname} + ' ' + ${info.lastname}">
                </div>

                <div class="profile-name-description">
                    <h2>${info.bakeryname}</h2>
                    <p>${info.description}</p>
                </div>
            </div>
        `)
    }

    let showProfileDOM = function(info) {
        return $(`
            <div class="profile-details" style="display: initial;">
                    
                <div class="profile-heading">
                    <h1 class="info-heading"><i class="fas fa-user"></i>My Profile</h1>   
                </div>
                    
                <div class="profile-container">

                    <div class="profile-info">
                        <span class="info-title"><b>First Name</b></span>
                        <i class="fas fa-pencil-alt edit-firstname"></i>
                        <i class="fas fa-save save firstname"></i>
                        <br>
                        <span contenteditable="false" class="info-data display-firstname">${info.firstname}</span>
                    </div>

                    <div class="profile-info">
                        <span class="info-title"><b>Last Name</b></span>
                        <i class="fas fa-pencil-alt edit-lastname"></i>
                        <i class="fas fa-save save lastname"></i>
                        <br>
                        <span contenteditable="false" class="info-data display-lastname">${info.lastname}</span>
                    </div>

                    <div class="profile-info">
                        <span class="info-title"><b>Contact Number</b></span>
                        <i class="fas fa-pencil-alt edit-contactname"></i>
                        <i class="fas fa-save save contactname"></i>
                        <br>
                        <span contenteditable="false" class="info-data display-contactname">${info.contact}</span>
                    </div>
                    
                    <div class="profile-info">
                        <span class="info-title"><b>Bakery Name</b></span>
                        <i class="fas fa-pencil-alt edit-bakeryname"></i>
                        <i class="fas fa-save save bakeryname"></i>
                        <br>
                        <span contenteditable="false" class="info-data display-bakeryname">${info.bakeryname}</span>
                    </div>

                    <div class="profile-info">
                        <span class="info-title"><b>INSTAGRAM ID</b></span>
                        <i class="fas fa-pencil-alt edit-instaid"></i>
                        <i class="fas fa-save save instaid"></i>
                        <br>
                        <span contenteditable="false" class="info-data display-instaid"><a href="${info.instaid}" target="_blank">${info.instaid}</a></span>
                    </div>

                    <div class="profile-info">
                        <span class="info-title"><b>FACEBOOK ID</b></span>
                        <i class="fas fa-pencil-alt edit-fbid"></i>
                        <i class="fas fa-save save fbid"></i>
                        <br>
                        <span contenteditable="false" class="info-data display-fbid"><a href="${info.fbid}" target="_blank">${info.fbid}</a></span>
                    </div>

                    <div class="textarea-container">
                        <div class="textarea-paragraph">
                            <span class="info-title"><b>AREA COVERED</b></span>
                            <i class="fas fa-pencil-alt edit-area"></i>
                            <i class="fas fa-save save area"></i>
                            <p contenteditable="false" class="display-area">${info.areacovered}</p>
                        </div>
                        <div class="textarea-paragraph">
                            <span class="info-title"><b>Description</b></span>
                            <i class="fas fa-pencil-alt edit-description"></i>
                            <i class="fas fa-save save description"></i>
                            <p contenteditable="false" class="display-description">${info.description}</p>
                        </div>
                        
                        <div class="textarea-paragraph">
                            <span class="info-title"><b>Speciality</b></span>
                            <i class="fas fa-pencil-alt edit-speciality"></i>
                            <i class="fas fa-save save speciality"></i>
                            <p contenteditable="false" class="display-speciality">${info.speciality}</p>
                        </div>
                    </div>

                    <div class="profile-info">
                        <span class="info-title"><b>EXPERIENCE</b></span>
                        <i class="fas fa-pencil-alt edit-exp"></i>
                        <i class="fas fa-save save exp"></i>
                        <br>
                        <span contenteditable="false" class="info-data display-exp">${info.experience}</span>
                    </div>
                </div>
            </div> 
        `)
    }

    let editProfile = function() {
        $('.edit-firstname').on('click', function() {
            $('.display-firstname').attr('contenteditable','true');
            $('.display-firstname').focus();
            $('.edit-firstname').css('display','none');
            $('.firstname').css('display','initial');
        });
        $('.firstname').on('click', function() {
            $('.display-firstname').attr('contenteditable','false');
            $('.edit-firstname').css('display','initial');
            $('.firstname').css('display','none');
        });
        $('.edit-lastname').on('click', function() {
            $('.display-lastname').attr('contenteditable','true');
            $('.display-lastname').focus();
            $('.edit-lastname').css('display','none');
            $('.lastname').css('display','initial');
        });
        $('.lastname').on('click', function() {
            $('.display-lastname').attr('contenteditable','false');
            $('.edit-lastname').css('display','initial');
            $('.lastname').css('display','none');
        });
        $('.edit-contact').on('click', function() {
            $('.display-contact').attr('contenteditable','true');
            $('.display-contact').focus();
            $('.edit-contact').css('display','none');
            $('.contact').css('display','initial');
        });
        $('.contact').on('click', function() {
            $('.display-contact').attr('contenteditable','false');
            $('.edit-contact').css('display','initial');
            $('.contact').css('display','none');
        });
        $('.edit-bakeryname').on('click', function() {
            $('.display-bakeryname').attr('contenteditable','true');
            $('.display-bakeryname').focus();
            $('.edit-bakeryname').css('display','none');
            $('.bakeryname').css('display','initial');
        });
        $('.bakeryname').on('click', function() {
            $('.display-bakeryname').attr('contenteditable','false');
            $('.edit-bakeryname').css('display','initial');
            $('.bakeryname').css('display','none');
        });
        $('.edit-instaid').on('click', function() {
            $('.display-instaid').attr('contenteditable','true');
            $('.display-instaid').focus();
            $('.edit-instaid').css('display','none');
            $('.instaid').css('display','initial');
        });
        $('.instaid').on('click', function() {
            $('.display-instaid').attr('contenteditable','false');
            $('.edit-instaid').css('display','initial');
            $('.instaid').css('display','none');
        });
        $('.edit-fbid').on('click', function() {
            $('.display-fbid').attr('contenteditable','true');
            $('.display-fbid').focus();
            $('.edit-fbid').css('display','none');
            $('.fbid').css('display','initial');
        });
        $('.fbid').on('click', function() {
            $('.display-fbid').attr('contenteditable','false');
            $('.edit-fbid').css('display','initial');
            $('.fbid').css('display','none');
        });
        $('.edit-area').on('click', function() {
            $('.display-area').attr('contenteditable','true');
            $('.display-area').focus();
            $('.edit-area').css('display','none');
            $('.areacovered').css('display','initial');
        });
        $('.areacovered').on('click', function() {
            $('.display-area').attr('contenteditable','false');
            $('.edit-area').css('display','initial');
            $('.areacovered').css('display','none');
        });
        $('.edit-description').on('click', function() {
            $('.display-description').attr('contenteditable','true');
            $('.display-description').focus();
            $('.edit-description').css('display','none');
            $('.description').css('display','initial');
        });
        $('.description').on('click', function() {
            $('.display-description').attr('contenteditable','false');
            $('.edit-description').css('display','initial');
            $('.description').css('display','none');
        });
        $('.edit-speciality').on('click', function() {
            $('.display-speciality').attr('contenteditable','true');
            $('.display-speciality').focus();
            $('.edit-speciality').css('display','none');
            $('.speciality').css('display','initial');
        });
        $('.speciality').on('click', function() {
            $('.display-speciality').attr('contenteditable','false');
            $('.edit-speciality').css('display','initial');
            $('.speciality').css('display','none');
        });
        $('.edit-exp').on('click', function() {
            $('.display-exp').attr('contenteditable','true');
            $('.display-exp').focus();
            $('.edit-exp').css('display','none');
            $('.experience').css('display','initial');
        });
        $('.experience').on('click', function() {
            $('.display-exp').attr('contenteditable','false');
            $('.edit-exp').css('display','initial');
            $('.experience').css('display','none');
        });
    }

    let myProducts = function() {
        $('.my-products').on('click', function(e) {
            e.preventDefault();
            $('.products-container').css('display','initial');
            $('.profile-details').css('display','none');    
            history.replaceState(null, ' ', 'product');
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

    

    $('.delete-product-button').on('click', function(e) {
        e.preventDefault();
        let self = $(this);
        $.ajax({
            type: 'get',
            url: self.attr('href'),
            success: function(data) {
                console.log(data);
                $(`#product-${data.data.productId}`).remove();
            }
        })        
    })

    $('.save').on('click', function(e) {
        e.preventDefault();
        var self = $(this);
        var prop=self[0].classList[1];
        var value = $(this).siblings('.display').text();
        var data = {"value": value,"prop": prop};
        $.ajax({
            type: 'POST',
            url: self.attr('href'),
            data: {info: JSON.stringify(data)},
        })
    })

    createProfile();
    editProfile();
    myProducts();
    deleteProducts();
}
