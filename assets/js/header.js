$(window).on('scroll',function(){
    if($(window).scrollTop()){
        $('nav').addClass('black');
    }
    else{
        $('nav').removeClass('black');
    }
})
const searchFocus = document.getElementById('search-focus');
const keys = [
    { keyCode: 'AltLeft', isTriggered: false },
    { keyCode: 'ControlLeft', isTriggered: false },
];

window.addEventListener('keydown', (e) => {
    keys.forEach((obj) => {
        if (obj.keyCode === e.code) {
            obj.isTriggered = true;
        }
    });

    const shortcutTriggered = keys.filter((obj) => obj.isTriggered).length === keys.length;

    if (shortcutTriggered) {
        searchFocus.focus();
    }
});

window.addEventListener('keyup', (e) => {
    keys.forEach((obj) => {
        if (obj.keyCode === e.code) {
            obj.isTriggered = false;
        }
    });
});

$(function() {
    $('#searchText').autocomplete({
        source: function(req,res) {
            $.ajax({
                url: '/autocomplete',
                dataType: 'json',
                type: 'GET',
                data: req,
                success: function(data) {
                    res(data);
                },
                error: function(err) {
                    console.log('error',err);
                }
            })
        },
        minLength: 1,
        select: function(event,ui) {
            if(ui.item) {
                $('#searchText').text(ui.item.label);
            }
        }
    })
});

function search(e) {
    if(e.which == 13) {
        $('#search-form').submit();
    }
}