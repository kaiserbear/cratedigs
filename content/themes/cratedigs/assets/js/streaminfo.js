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

function IsLive() {
    if ($(".cc_streaminfo:contains('LIVE')").length > 0) {
        $('.audio-player').addClass('live');
    } else if ($(".cc_streaminfo:contains('LIVE')").length == 0) {
        $('.audio-player').removeClass('live');
    }
}

// const

function getStationInfo() {
    var jqxhr = $.get("https://cratedigs.radioca.st/status-json.xsl", function(data) {
            console.log(data);
        })
        .done(function() {
            // alert("second success");
        })
        .fail(function() {
            // alert("error");
        })
        .always(function() {
            // alert("finished");
        });

    // Perform other work here ...

    // Set another completion function for the request above
    jqxhr.always(function() {
        // alert("second finished");
    });
}

function getDJinfo() {
    var jqxhr = $.get("https://cratedigs.s3.eu-west-2.amazonaws.com/artists.json", function(data) {
            console.log(data);
            console.log(data.jay_sebastian);
        })
        .done(function() {
            // alert("second success");
        })
        .fail(function() {
            // alert("error");
        })
        .always(function() {
            // alert("finished");
        });

    // Perform other work here ...

    // Set another completion function for the request above
    jqxhr.always(function() {
        // alert("second finished");
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