const hamburgerMenu = document.getElementById("menu--btn");
const navigation = document.getElementById("nav-menu");
const $navigationItem = $('#nav-menu li a');

function nav() {

    hamburgerMenu.onclick = function(e) {
        hamburgerMenu.classList.toggle("open");
        navigation.classList.toggle("open");
    }
    $navigationItem.on("click", function() {
        navigation.classList.toggle("open");
        hamburgerMenu.classList.toggle("open");
    });

}

function iOS() {
    return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        ||
        (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

if (iOS() === true) {
    $('#volume-control').hide();
}

nav();