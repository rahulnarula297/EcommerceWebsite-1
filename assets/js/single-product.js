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