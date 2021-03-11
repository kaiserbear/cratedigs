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

function shopify() {
    if ($("#collection-component-1615475004886").is(':empty')) {
        (function() {
            var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
            if (window.ShopifyBuy) {
                if (window.ShopifyBuy.UI) {
                    ShopifyBuyInit();
                } else {
                    loadScript();
                }
            } else {
                loadScript();
            }

            function loadScript() {
                var script = document.createElement('script');
                script.async = true;
                script.src = scriptURL;
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
                script.onload = ShopifyBuyInit;
            }

            function ShopifyBuyInit() {
                var client = ShopifyBuy.buildClient({
                    domain: 'crate-digs.myshopify.com',
                    storefrontAccessToken: 'ce5d77bf1153bea9075d193cc706bd8e',
                });
                ShopifyBuy.UI.onReady(client).then(function(ui) {
                    ui.createComponent('collection', {
                        id: '214744170648',
                        node: document.getElementById('collection-component-1615475004886'),
                        moneyFormat: '%C2%A3%7B%7Bamount%7D%7D',
                        options: {
                            "product": {
                                "styles": {
                                    "product": {
                                        "@media (min-width: 601px)": {
                                            "max-width": "calc(25% - 20px)",
                                            "margin-left": "20px",
                                            "margin-bottom": "50px",
                                            "width": "calc(25% - 20px)"
                                        },
                                        "img": {
                                            "height": "calc(100% - 15px)",
                                            "position": "absolute",
                                            "left": "0",
                                            "right": "0",
                                            "top": "0"
                                        },
                                        "imgWrapper": {
                                            "padding-top": "calc(75% + 15px)",
                                            "position": "relative",
                                            "height": "0"
                                        }
                                    },
                                    "button": {
                                        ":hover": {
                                            "background-color": "#000000"
                                        },
                                        "background-color": "#000000",
                                        ":focus": {
                                            "background-color": "#000000"
                                        },
                                        "border-radius": "7px",
                                        "padding-left": "30px",
                                        "padding-right": "30px"
                                    }
                                },
                                "text": {
                                    "button": "Add to cart"
                                }
                            },
                            "productSet": {
                                "styles": {
                                    "products": {
                                        "@media (min-width: 601px)": {
                                            "margin-left": "-20px"
                                        }
                                    }
                                }
                            },
                            "modalProduct": {
                                "contents": {
                                    "img": false,
                                    "imgWithCarousel": true,
                                    "button": false,
                                    "buttonWithQuantity": true
                                },
                                "styles": {
                                    "product": {
                                        "@media (min-width: 601px)": {
                                            "max-width": "100%",
                                            "margin-left": "0px",
                                            "margin-bottom": "0px"
                                        }
                                    },
                                    "button": {
                                        ":hover": {
                                            "background-color": "#000000"
                                        },
                                        "background-color": "#000000",
                                        ":focus": {
                                            "background-color": "#000000"
                                        },
                                        "border-radius": "7px",
                                        "padding-left": "30px",
                                        "padding-right": "30px"
                                    }
                                },
                                "text": {
                                    "button": "Add to cart"
                                }
                            },
                            "option": {},
                            "cart": {
                                "styles": {
                                    "button": {
                                        ":hover": {
                                            "background-color": "#000000"
                                        },
                                        "background-color": "#000000",
                                        ":focus": {
                                            "background-color": "#000000"
                                        },
                                        "border-radius": "7px"
                                    }
                                },
                                "text": {
                                    "total": "Subtotal",
                                    "button": "Checkout"
                                }
                            },
                            "toggle": {
                                "styles": {
                                    "toggle": {
                                        "background-color": "#000000",
                                        ":hover": {
                                            "background-color": "#000000"
                                        },
                                        ":focus": {
                                            "background-color": "#000000"
                                        }
                                    }
                                }
                            }
                        },
                    });
                });
            }
        })();
    }

}