var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var o = global.installedModules[r] = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
    }
    e = Object.assign(require("../../commons.js").modules, e);
    var n = {};
    n = global.installedModules = global.installedModules || {}, t.m = e, t.c = n, t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(n, "a", n), n;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 98);
}({
    97: function(e, t, n) {
        e.exports = {
            STYLE_MAP: {
                p: "margin: 0 0 1em;",
                div: "margin: 0; padding: 0;",
                h1: "font-size: 2em; margin: .67em 0; font-weight: bolder;",
                h2: "font-size: 18px; line-height: 22px; font-weight: bolder;",
                h3: "font-size: 15px; line-height: 18px; font-weight: bolder;",
                h4: "font-size: 15px;",
                h5: "font-size: 15px;",
                i: "font-style: italic;",
                cite: "font-style: italic;",
                em: "font-style: italic;",
                var: "font-style: italic;",
                address: "font-style: italic;",
                pre: "font-family: monospace; white-space: pre;",
                tt: "font-family: monospace;",
                code: "font-family: monospace; display: inline; background:#f5f5f5;",
                kbd: "font-family: monospace;",
                samp: "font-family: monospace;",
                big: "font-size: 1.17em;",
                small: "font-size: .83em;",
                sub: "font-size: .83em; vertical-align: sub;",
                sup: "font-size: .83em; vertical-align: super;",
                s: "text-decoration: line-through; display: inline;",
                strike: "text-decoration: line-through;",
                del: "text-decoration: line-through; display: inline;",
                strong: "display: inilne;",
                a: "color: deepskyblue; word-break: break-all; overflow: auto;",
                video: "text-align: center; margin: 10px 0;",
                img: "overflow: hidden; vertical-align: bottom; max-width: 100% !important;",
                blockquote: 'margin: 0 0 18px; padding: 0 0 0 15px; font-family:Courier, Calibri,"宋体"; border-left: 5px solid #eee;',
                ul: "margin: 20rpx 10rpx;",
                ol: "margin: 20rpx 10rpx;",
                li: "align-items: baseline; margin: 10rpx 0;",
                u: "text-decoration: underline;",
                hide: "display: none;",
                tr: "display: table-row;",
                th: "display: table-cell; vertical-align: middle; padding:5px 10px; font-size:28rpx; border:1px solid #ddd; word-break: break-all; background:#f0f0f0;",
                td: "display: table-cell; vertical-align: middle; padding:5px 10px; font-size:28rpx; border:1px solid #ddd; word-break: break-all;",
                figure: "overflow: hidden;",
                table: "table-layout: fixed; border-collapse: collapse; width: auto !important; display: table;",
                tbody: "display: table-row-group;"
            },
            POLYFILL_MAP: {
                section: "div",
                header: "div",
                footer: "div",
                article: "div",
                nav: "div",
                figure: "div",
                figcaption: "div",
                detail: "div",
                hgroup: "div",
                summary: "div",
                aside: "div"
            }
        };
    },
    98: function(t, n, r) {
        function o(e) {
            var t = c[e.tag] || e.tag;
            return i({}, e, {
                tag: t,
                nodes: (e.nodes || []).map(o)
            });
        }
        var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
        }, a = function(e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return function(e, t) {
                var n = [], r = !0, o = !1, i = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), 
                    !t || n.length !== t); r = !0) ;
                } catch (e) {
                    o = !0, i = e;
                } finally {
                    try {
                        !r && s.return && s.return();
                    } finally {
                        if (o) throw i;
                    }
                }
                return n;
            }(e, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }, s = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : e(t);
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
        }, l = r(97), d = l.STYLE_MAP, c = l.POLYFILL_MAP, u = r(43).html2json, f = [], p = parseInt(1e5 * Math.random(), 10);
        Component({
            properties: {
                html: {
                    type: String,
                    value: "",
                    observer: "htmlHandler"
                },
                canvasId: {
                    type: String,
                    value: "rich-text-" + p
                }
            },
            data: {
                nodes: [],
                showCanvas: !1
            },
            methods: {
                htmlHandler: function(e) {
                    var t = this, n = [], r = e.replace(/<a class="video-link".*?\/a>/g, "").replace(/(<svg .*?\/svg>)/g, function(e) {
                        return '<svg src="' + encodeURI(e) + '"></svg>';
                    }).replace(/<(canvas|audio|iframe) .*?\/\1>/g, ""), s = (u(r, this.data.canvasId).nodes || []).map(o).map(function(e) {
                        return function e(t, n) {
                            var r = t.attr, o = void 0 === r ? {} : r, s = t.index;
                            if ("element" === t.node) {
                                if ("svg" === t.tag) {
                                    var l = function(e) {
                                        var t = "", n = "";
                                        t = (t = e.indexOf("http://www.w3.org") < 0 ? e.replace(/<svg(.*?)>/, function(e, t) {
                                            return '<svg xmlns="http://www.w3.org/2000/svg" ' + t + ">";
                                        }) : e.replace(/\s+.*?http:\/\/www\.w3\.org.*?\s+/, ' xmlns="http://www.w3.org/2000/svg" ')).replace(/<svg(.*?)\s+style=('|")(.*?)\2/g, function(e, t, r, o) {
                                            return n = o, "<svg " + t + " ";
                                        });
                                        var r = "data:image/svg+xml;utf8," + encodeURI(t), o = {};
                                        t.replace(/<svg(.*?)\s+viewbox=('|")(.*?)\2/g, function(e, t, n, i) {
                                            var s = i.split(" "), l = a(s, 4), d = l[2], c = l[3];
                                            o = {
                                                src: r,
                                                width: d,
                                                height: c
                                            };
                                        });
                                        var i = o.width && "number" == typeof +o && o.height && "number" == typeof +o.height;
                                        return {
                                            src: i ? "" : r,
                                            svgItem: i ? o : null,
                                            style: n
                                        };
                                    }(decodeURI(o.src)), c = l.src, u = l.style, f = l.svgItem;
                                    return Array.isArray(n) && n.push(i({}, f, {
                                        index: s
                                    })), {
                                        type: "node",
                                        name: "img",
                                        attrs: i({}, o, {
                                            src: c,
                                            style: u
                                        })
                                    };
                                }
                                return {
                                    type: "node",
                                    name: t.tag,
                                    attrs: i({}, o, {
                                        class: (p = t.tag, g = o.class, (m = Array.isArray(g) ? g : [ g || "" ]).push(p), 
                                        m.join(" ")),
                                        style: function(e, t) {
                                            return (d[e] || "") + (t || "");
                                        }(t.tag, t.styleStr || "")
                                    }),
                                    children: (t.nodes || []).map(function(t) {
                                        return e(t, n);
                                    })
                                };
                            }
                            if ("text" === t.node) return {
                                type: "text",
                                text: t.text
                            };
                            var p, g, m;
                            return {};
                        }(e, n);
                    });
                    this.setData({
                        nodes: s,
                        showCanvas: !!n.length
                    }, function() {
                        n.length && t.drawSvgImages(n);
                    });
                },
                drawSvgImages: function(e) {
                    var t = this;
                    e.reduce(function(e, n) {
                        return e.then(t.svgDrawerPromise.bind(t, n));
                    }, Promise.resolve()).then(function() {
                        t.setSvgImages(function() {
                            t.setData({
                                showCanvas: !1
                            });
                        });
                    }).catch(function(e) {
                        console.warn("---ERROR---", e);
                    });
                },
                svgDrawerPromise: function(e) {
                    var t = this, n = e.width, r = e.height, o = e.src;
                    return new Promise(function(i, a) {
                        var s = wx.createCanvasContext(t.data.canvasId, t);
                        s.drawImage(o, 0, 0, n, r), s.draw(!1, function() {
                            wx.canvasToTempFilePath({
                                x: 0,
                                y: 0,
                                width: n,
                                height: r,
                                canvasId: t.data.canvasId,
                                success: function(t) {
                                    f.push({
                                        src: t.tempFilePath,
                                        index: e.index
                                    }), i();
                                },
                                fail: a
                            }, t);
                        });
                    });
                },
                setSvgImages: function(e) {
                    var t = this.data.nodes;
                    f.forEach(function(e) {
                        var n = e.index, r = e.src, o = n.split(".").reduce(function(e, t) {
                            return "object" === (void 0 === e ? "undefined" : s(e)) && Array.isArray(e.children) ? e.children[t] : e[t];
                        }, t);
                        "object" === (void 0 === o ? "undefined" : s(o)) && "object" === s(o.attrs) && (o.attrs.src = r);
                    }), this.setData({
                        nodes: t
                    }, e);
                },
                canvasErrorCallback: function(e) {
                    console.warn("CanvasError: ", e.detail.errMsg);
                }
            }
        });
    }
});