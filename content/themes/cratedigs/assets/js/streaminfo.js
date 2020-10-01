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

function activeDay() {
    if ($(".calendar").length > 0) {
        setTimeout(function() {
            $('html, body').animate({
                scrollTop: $('.active-day').offset().top
            }, 'slow');
        }, 500);
    }
}