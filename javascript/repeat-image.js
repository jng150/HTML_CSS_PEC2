document.addEventListener('DOMContentLoaded', function () {
    repeatImage();
});


function repeatImage() {
    var imageContainerLeft = document.querySelector('.image-container-left');
    var imageContainerRight = document.querySelector('.image-container-right');

    var imagePath = document.getElementsByClassName("decorationImage")[0].src;

    var imageUrl = imagePath.substring(imagePath.indexOf('/trono'));;

    for (let i = 0; i < 11; i++) {
        var imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = 'Imagen recortada con clip-path';
        imageContainerLeft.appendChild(imgElement.cloneNode(true));
        imageContainerRight.appendChild(imgElement.cloneNode(true));
    }
}