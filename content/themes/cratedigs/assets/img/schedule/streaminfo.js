void 0 === window.centovacast && (window.centovacast = {});
void 0 === window.centovacast.options && (window.centovacast.options = {});
void 0 === window.centovacast.loader &&
    ((window.centovacast.loader = {
        attempts: 0,
        external_jquery: !1,
        loaded: !1,
        ready: !1,
        widget_definitions: {},
        url: "",
        load_script: function (a) {
            var b = document.createElement("script");
            void 0 !== b && (b.setAttribute("type", "text/javascript"), b.setAttribute("src", a), void 0 !== b && document.getElementsByTagName("head")[0].appendChild(b));
        },
        load_widget: function (a) {
            a = this.widget_definitions[a];
            null === a.ref && (a.ref = a.define(jQuery));
        },
        jq_loaded: function () {
            this.external_jquery || jQuery.noConflict();
            jQuery.getJSONP = this.jq_get_jsonp;
            for (var a in this.widget_definitions) "string" === typeof a && this.load_widget(a);
            this.loaded = !0;
            var b = this;
            jQuery(document).ready(function () {
                b.ready = !0;
                for (var a in b.widget_definitions) "function" === typeof b.widget_definitions[a].init && b.widget_definitions[a].init(jQuery);
            });
        },
        check: function () {
            if ("undefined" === typeof jQuery) {
                var a = this;
                setTimeout(function () {
                    a.check();
                }, 100);
                this.attempts++;
            } else this.jq_loaded();
        },
        process_widget_element: function (a, b, c, e) {
            a = jQuery(a);
            var d = !1,
                f = {},
                g,
                h,
                k;
            for (k in b) b.hasOwnProperty(k) && ((g = b[k]), (h = a.data(g)), "undefined" !== typeof h ? ((f[g] = h), (d = !0)) : (f[g] = ""));
            h = a.prop("id");
            if (d) f.type = a.data("type");
            else {
                if ("string" !== typeof h || h.substr(0, c.length + 1) !== c + "_") return null;
                f.fromid = !0;
                f.originalid = h;
                c = h.substr(c.length + 1);
                if (e) {
                    e = /^([a-z0-9]+)_/;
                    d = e.exec(c);
                    if (!d) return null;
                    f.type = d[1];
                    c = c.replace(e, "");
                }
                var l = null;
                for (k in b) b.hasOwnProperty(k) && ((g = b[k]), null === l && (l = g), (e = new RegExp("_" + k + "-([^_]+)")), (d = e.exec(c))) && ((f[g] = d[1]), (c = c.replace(e, "")));
                f[l] = c;
                "string" === typeof f.mount && (f.mount = f.mount.replace(/-/, "/"));
            }
            f.id = h;
            f.$el = a;
            return f;
        },
        process_widget_elements: function (a, b, c, e) {
            var d = {},
                f = this;
            a.each(function () {
                var g = f.process_widget_element(this, b, c, e),
                    a = "" + g.username + g.mount;
                d[a] || ((d[a] = jQuery.extend({}, g)), e && (d[a].type = void 0), (d[a].hastype = e), (d[a].$el = e ? {} : null));
                e ? (d[a].$el[g.type] = d[a].$el[g.type] ? d[a].$el[g.type].add(g.$el[0]) : g.$el) : (d[a].$el = d[a].$el ? d[a].$el.add(g.$el[0]) : g.$el);
            });
            return {
                widget_data: d,
                get: function (a) {
                    return this.widget_data[a] ? this.widget_data[a] : void 0;
                },
                get_property: function (a, b) {
                    return this.widget_data[a] && this.widget_data[a][b] ? this.widget_data[a][b] : void 0;
                },
                get_element: function (a, b) {
                    return this.widget_data[a] ? (this.widget_data[a].hastype ? (this.widget_data[a].$el[b] ? this.widget_data[a].$el[b] : jQuery()) : this.widget_data[a].$el ? this.widget_data[a].$el : jQuery()) : void 0;
                },
                set_element: function (a, b, c) {
                    this.widget_data[a].hastype ? b && b.length && (this.widget_data[a].$el[b] = c) : (this.widget_data[a].$el = c);
                },
                set_property: function (a, b, c) {
                    if (!this.widget_data[a]) return !1;
                    this.widget_data[a][b] = c;
                    return !0;
                },
                each: function (a) {
                    for (var b in this.widget_data) "string" === typeof b && a(b, this.widget_data[b]);
                },
                each_element: function (a, b) {
                    if (this.widget_data[a].hastype) for (var c in this.widget_data[a].$el) ("string" !== typeof c && void 0 !== c) || b(this.widget_data[a].$el[c], c);
                    else b(this.widget_data[a].$el);
                },
            };
        },
        init: function () {
            var a = document.getElementsByTagName("script"),
                a = a[a.length - 1],
                a = void 0 !== a.getAttribute.length ? a.getAttribute("src") : a.getAttribute("src", 2);
            a.match(/^https?:\/\//i) || (a = window.location.href);
            this.url = a.replace(/(\.(?:[a-z]{2,}|[0-9]+)(\:[0-9]+)?\/).*$/i, "$1");
            (this.external_jquery = "undefined" !== typeof jQuery) || this.load_script(this.url + "system/jquery.min.js");
            this.check();
        },
        add: function (a, b, c) {
            this.widget_definitions[a] || (this.widget_definitions[a] = { define: c, init: b, ref: null });
            this.loaded && this.load_widget(a);
            this.ready && b(jQuery);
        },
        jq_get_jsonp: function (a, b, c) {
            return jQuery.ajax({ type: "GET", url: a, data: b, success: c, dataType: "jsonp" });
        },
    }),
    window.centovacast.loader.init());
window.centovacast.loader.add(
    "streaminfo",
    function (a) {
        a.extend(window.centovacast.streaminfo.settings, window.centovacast.options.streaminfo);
        window.centovacast.streaminfo.settings.manual || window.centovacast.streaminfo.run();
    },
    function (a) {
        window.centovacast.options.streaminfo = a.extend({}, window.centovacast.options.streaminfo, window.centovacast.streaminfo ? window.centovacast.streaminfo.config : null);
        return (window.centovacast.streaminfo = {
            pollcount: 0,
            settings: { poll_limit: 60, poll_frequency: 6e4 },
            widgets: {},
            element_class: ".cc_streaminfo",
            handle_json: function (b, c) {
                c || (c = b.rid);
                var e = this.widgets.get(c);
                if (e)
                    if ("error" === b.type) {
                        if (((e = b ? b.error : "No JSON object"), this.widgets.get_element(c, "song").html('<span title="' + e + '">Unavailable</span>'), "function" === typeof this.settings.on_error_callback))
                            this.settings.on_error_callback(e, c);
                    } else {
                        var d = b.data[0];
                        b.data[0].songchanged = d.song !== e.current_song;
                        "function" === typeof this.settings.before_change_callback && this.settings.before_change_callback(b, c);
                        this.widgets.each_element(c, function (a, b) {
                            var c, e;
                            if ("song" !== b && "track" !== b) {
                                if (b.match(/^track[a-z]+/))
                                    if ("object" === typeof d.track)
                                        switch (b) {
                                            case "trackbuyurl":
                                                a.attr("href", d.track.buyurl ? d.track.buyurl : "javascript:void(0)");
                                                break;
                                            case "trackimageurl":
                                                a.attr("src", d.track.imageurl);
                                                return;
                                            case "trackplaylist":
                                            case "playlist":
                                                a.html("object" === typeof d.track.playlist ? d.track.playlist.title : "");
                                                return;
                                            default:
                                                e = d.track[b.replace(/^track/, "")];
                                        }
                                    else e = null;
                                else e = d[b];
                                c = typeof e;
                                ("string" !== c && "number" !== c) || a.html(e);
                            }
                        });
                        "function" === typeof this.settings.after_change_callback && this.settings.after_change_callback(b, c);
                        var f = d.song;
                        f &&
                            f !== e.current_song &&
                            (this.widgets.get_element(c, "song").fadeOut("fast", function () {
                                a(this).html(f).fadeIn("fast");
                            }),
                            this.widgets.set_property(c, "current_song", f));
                    }
            },
            poll: function (b) {
                var c = this.widgets.get(b),
                    e = this;
                a.getJSONP((this.settings.local ? "/" : window.centovacast.loader.url) + "external/rpc.php", { m: "streaminfo.get", username: c.username, charset: c.charset, mountpoint: c.mount, rid: b }, function (a) {
                    a && e.handle_json(a, b);
                });
                console.log('POLL');
            },
            poll_username: function (a) {
                var c = this;
                this.widgets.each(function (e, d) {
                    d.username === a && c.poll(e);
                });
            },
            poll_all: function () {
                var a = this;
                this.widgets.each(function (c) {
                    a.poll(c);
                });
                (0 === this.settings.poll_limit || this.pollcount++ < this.settings.poll_limit) &&
                    setTimeout(function () {
                        a.poll_all();
                    }, this.settings.poll_frequency);
            },
            run: function () {
                this.widgets = window.centovacast.loader.process_widget_elements(a(this.element_class), { username: "username", cs: "charset", mp: "mount" }, "cc_strinfo", !0);
                this.poll_all();
            },
        });
    }
);
