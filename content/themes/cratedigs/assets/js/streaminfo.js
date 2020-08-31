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

function getProductStock() {


    /*<![CDATA[*/
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
                ui.createComponent('product', {
                    id: '5693848387736',
                    node: document.getElementById('product-component-1598902090344'),
                    moneyFormat: '%C2%A3%7B%7Bamount%7D%7D',
                    options: {
                        "product": {
                            "styles": {
                                "product": {
                                    "@media (min-width: 601px)": {
                                        "max-width": "calc(25% - 20px)",
                                        "margin-left": "20px",
                                        "margin-bottom": "50px"
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
                                    "border-radius": "7px"
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
                                    "border-radius": "7px"
                                }
                            },
                            "text": {
                                "button": "Add to cart"
                            }
                        },
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
    /*]]>*/




}