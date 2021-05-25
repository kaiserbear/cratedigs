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
            getStreamOne(myCallbackOne);


            function updateSteamOneDetails(artistName, showname, showtime, image) {
                $('.artistNameOne').text(artistName);

                if (image !== null) {
                    $('.imageOne').attr({
                        "src": image
                    });
                } else if (image == null) {
                    $('.imageOne').attr({
                        "src": "/assets/img/image-player.png"
                    });
                }
                $('.showtimeOne').text(showtime);
                // $('.showtimeOne').text(showtime);
                if (showname !== "Off Air") {
                    $('.shownameOne').text(showname);
                } else {
                    if (showtime === null) {
                        $('.shownameOne').text('');
                        $('.showtimeOne').html("<span>Next live DJ: </span>" + nextLiveEvent.join(""));
                    }
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
        }, 2000);
    }
}