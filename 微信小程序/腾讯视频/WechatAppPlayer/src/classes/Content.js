function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, i = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), n = require("../lib/message"), r = 1;

module.exports = function() {
    function o(e) {
        var i = this;
        t(this, o), this.mockUpdate = 0, this._urlIndex = 0, Object.defineProperties(this, {
            _url: {
                value: e.url instanceof Array ? e.url : [ e.url ]
            },
            _id: {
                value: r++
            },
            _duration: {
                value: e.duration
            },
            _filesize: {
                value: e.filesize
            },
            _charged: {
                value: e.charged
            },
            _preview: {
                value: e.preview
            },
            isad: {
                value: e.isad
            }
        }), new n().assign(this);
        var u = null, a = null;
        this.on("play", function() {
            u = setTimeout(function() {
                i.emit("timeout", 1e4);
            }, 1e4), a = setTimeout(function() {
                i.emit("timeout", 2e4);
            }, 2e4);
        }, !0), this.on("start", function() {
            clearTimeout(u), clearTimeout(a);
        }, !0);
    }
    return i(o, [ {
        key: "url",
        get: function() {
            return this._url[this._urlIndex];
        }
    }, {
        key: "id",
        get: function() {
            return this._id;
        }
    }, {
        key: "duration",
        get: function() {
            return this._duration;
        }
    }, {
        key: "filesize",
        get: function() {
            return this._filesize;
        }
    }, {
        key: "preview",
        get: function() {
            return this._preview;
        }
    }, {
        key: "charged",
        get: function() {
            return this._charged;
        }
    } ]), i(o, [ {
        key: "onContentEnd",
        value: function() {
            this.emit("end");
        }
    }, {
        key: "onContentPlay",
        value: function() {
            this.emittedPlay = !0, this.emit("play");
        }
    }, {
        key: "onContentPause",
        value: function() {}
    }, {
        key: "onContentTimeupdate",
        value: function(t) {
            this.emittedPlay && (t && t.target && (t = t.detail.currentTime), !this.emittedStart && ((void 0 === t ? "undefined" : e(t)) == e(void 0) ? this.mockUpdate++ > 5 : t > 0) && (this.emit("start"), 
            this.emittedStart = !0), this.emit.apply(this, [ "timeupdate", t ]));
        }
    }, {
        key: "onContentError",
        value: function() {
            if (this._url.length > this._urlIndex + 1) return this._urlIndex++, void this.emit("change", this.url);
            this.emit.apply(this, [ "error" ].concat([].slice.call(arguments, 0)));
        }
    }, {
        key: "onContentSkip",
        value: function() {
            this.isad && this.emit("skip");
        }
    } ]), o;
}();