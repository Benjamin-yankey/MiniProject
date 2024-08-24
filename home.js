document.addEventListener("DOMContentLoaded", function () {
    const imageList = document.querySelector('.image-list');
    const images = document.querySelectorAll('.image-container');
    const totalImages = images.length;
    let currentIndex = 0;

    function showNextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        const offset = -currentIndex * 1000; 
        imageList.style.transform = `translateX(${offset}px)`;
    }

    setInterval(showNextImage, 10000); 
});


// sign in
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


const position ={lat:5, lng:0}
const {Map} = await google.maps.importLibrary("maps")

new Map(document.getElementById("map"), {
    center: position,
    zoom: 3,
    maoId: "DEMO_MAPS_ID"
})

// linking pages
function goBack() {
    window.location.href = 'signin.html';
}

function goHome(){
    window.location.href = 'home.html';
}



// disappearing search icon
function toggleIconVisibility() {
    var inputField = document.getElementById("searchInput");
    var icon = inputField.parentElement.querySelector("i.fa-search"); 
    if (inputField.value.trim() !== "") {
        icon.style.display = "none"; 
    } else {
        icon.style.display = "inline-block"; 
    }}