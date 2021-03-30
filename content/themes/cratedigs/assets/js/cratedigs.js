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

nav();