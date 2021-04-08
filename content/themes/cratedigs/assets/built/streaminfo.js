var tday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
var tmonth = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

function GetClock() {

    var d = new Date();
    var nday = d.getDay(),
        nmonth = d.getMonth(),
        ndate = d.getDate();
    var nhour = d.getHours(),
        nmin = d.getMinutes();
    if (nmin <= 9) nmin = "0" + nmin

    var Clockbox = document.getElementById('clockbox');
    if (Clockbox) {
        Clockbox.innerHTML = "" + tday[nday] + ", " + tmonth[nmonth] + " " + ndate + " : " + nhour + ":" + nmin + "";
        document.getElementById('schedule-' + tday[nday]).classList.add("active-day");
    }
}

const playerOne = document.getElementById("player1");
const playerTwo = document.getElementById("player2");

function getStreamOne(callback) {

    var jqxhr = $.get("https://cratedigs.radioca.st/status-json.xsl", function() {

        })
        .done(function(data) {
            var dataSet = data.icestats.source
            if (dataSet.title == undefined) {
                var stationNowPlaying = dataSet[0].title
                var genre = dataSet[0].genre
            } else {
                var stationNowPlaying = dataSet.title
                var genre = dataSet.genre
            }
            callback(stationNowPlaying, genre);
        })
        .fail(function() {
            // alert("error"); // Should work on something here for when the server goes down. 
        });
}

function getStreamTwo(callback) {

    var jqxhr = $.get("https://cratedigstwo.radioca.st/stats?json=1", function() {

        })
        .done(function(data) {
            // console.log(data);

            var stationNowPlaying = data.songtitle
            var genre = data.servergenre
            callback(stationNowPlaying, genre);
        })
        .fail(function() {
            // alert("error"); // Should work on something here for when the server goes down. 
        });
}


function getDJinfo() {
    var jqxhr = $.get("/artists-directory/", function(data) {})
        .done(function(data) {

            // Get the info for stream 1

            function myCallbackOne(stationNowPlaying, genre) {

                if (data[stationNowPlaying] !== undefined) {
                    updateSteamOneDetails(data[stationNowPlaying].name, data[stationNowPlaying].showname, data[stationNowPlaying].timeslot.time, data[stationNowPlaying].images.photo);
                } else {
                    updateSteamOneDetails(stationNowPlaying, genre, null, null, null);
                }
            }

            function myCallbackTwo(stationNowPlaying, genre) {

                if (data[stationNowPlaying] !== undefined) {
                    updateSteamTwoDetails(data[stationNowPlaying].name, data[stationNowPlaying].showname, data[stationNowPlaying].timeslot.time, data[stationNowPlaying].images.photo);
                } else {
                    updateSteamTwoDetails(stationNowPlaying, genre, null, null, null);
                }
            }

            // Get stream 1 on it's own. 

            getStreamOne(myCallbackOne);
            getStreamTwo(myCallbackTwo);

            // // Get stream 2 if it's there
            // if (data.stream === 2) {

            //     playerOne.classList.add('multi');
            //     playerTwo.classList.add('show');
            // }


            function updateSteamOneDetails(artistName, showname, showtime, image) {
                $('.artistNameOne').text(artistName);
                if (showname !== "Off Air") {
                    $('.shownameOne').text(showname);
                }
                $('.showtimeOne').text(showtime);
                if (image !== null) {
                    $('.imageOne').attr({
                        "src": image
                    });
                } else if (image == null) {
                    $('.play-container-one').removeAttr("style");
                }
                if (showtime === null) {
                    $('.showtimeOne').html("<span>Next live DJ: </span>" + nextLiveEvent.join(""));
                }
            }

            function updateSteamTwoDetails(artistName, showname, showtime, image) {
                $('.artistNameTwo').text(artistName);
                $('.shownameTwo').text(showname);
                $('.showtimeTwo').text(showtime);
                if (image !== null) {
                    $('.imageTwo').attr({
                        "src": image
                    });
                } else if (image == null) {
                    $('.play-container-two').removeAttr("style");
                }
            }

        })
        .fail(function() {
            // alert("error"); // Again something here if we can't get the artists details. 
        });
}

function activeDay() {
    if ($(".calendar").length > 0) {
        setTimeout(function() {
            $('html, body').animate({
                scrollTop: $('.active-day').offset().top
            }, 'slow');
        }, 500);
    }
}