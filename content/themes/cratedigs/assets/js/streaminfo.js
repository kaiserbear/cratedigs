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


function getStationInfo(callback) {

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
    var jqxhr = $.get("https://cratedigs.s3.eu-west-2.amazonaws.com/artists.json", function(data) {})
        .done(function(data) {

            function myCallback(stationNowPlaying, genre) {

                if (data[stationNowPlaying] !== undefined) {
                    updateStationDetails(data[stationNowPlaying].name, data[stationNowPlaying].showname, data[stationNowPlaying].timeslot.time, data[stationNowPlaying].images.photo);
                } else {
                    updateStationDetails(stationNowPlaying, genre, null, null, null);
                }
            }
            getStationInfo(myCallback);

            function updateStationDetails(artistName, showname, showtime, image) {
                $('.artistName').text(artistName);
                $('.showname').text(showname);
                $('.showtime').text(showtime);
                if (image !== null) {
                    $('.play-container').css({
                        "background": "url(" + image + ")",
                        "background-size": "contain",
                        "background-repeat": "no-repeat"
                    });
                } else if (image == null) {
                    $('.play-container').removeAttr("style");
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