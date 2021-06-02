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


// Toggle chat window
var $chatWindow = $(".chat-window");
var $toggleChat = $(".chat-window .toggle");

$(document).ready(function() {
    $toggleChat.click();
});
$toggleChat.click(function() {
    if ($(this).hasClass('open')) {
        $(this).removeClass('open');
        $(this).addClass('closed').css({ 'transform': 'rotate(-180deg)' });
        $chatWindow.css({
            "bottom": "-170px"
        });
    } else {
        $(this).removeClass('closed');
        $(this).addClass('open').css({ 'transform': 'rotate(0)' });
        $chatWindow.css({
            "bottom": "135px"
        })
    }

});