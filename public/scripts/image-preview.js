const imageInputElement = document.querySelector("#image-preview input");
const imageElement = document.querySelector("#image-preview img");

function imagePreview() {
    const files = imageInputElement.files;
    if (!files || files.length==0) {
        imageElement.style.display = 'none';
        return ;
    }
    const file = files[0];
    const imgUrl = URL.createObjectURL(file);
    imageElement.src = imgUrl;
    imageElement.style.display = 'block';
}

imageInputElement.addEventListener('change',imagePreview);