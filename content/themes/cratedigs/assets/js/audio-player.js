const audioPlayer = document.querySelector(".audio-player");
const audio = new Audio(
    "https://cratedigs.radioca.st/stream"
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

function nav() {
    hamburgerMenu.onclick = function(e) {
        console.log('check');
        hamburgerMenu.classList.toggle("open");
        navigation.classList.toggle("open");

    }
}

nav();