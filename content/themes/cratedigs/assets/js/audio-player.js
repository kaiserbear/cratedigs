const audioPlayer = document.querySelector(".audio-player");
const audio = new Audio(
    // "http://cratedigs.radioca.st/stream"
    "https://visual.shoutca.st/stream/cratedigstemp"
);

//toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector(".controls .toggle-play");
playBtn.addEventListener(
    "click",
    () => {
        if (audio.paused) {
            playBtn.classList.remove("play");
            playBtn.classList.add("pause");
            audio.play();
        } else {
            playBtn.classList.remove("pause");
            playBtn.classList.add("play");
            audio.pause();
        }
    },
    false
);

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