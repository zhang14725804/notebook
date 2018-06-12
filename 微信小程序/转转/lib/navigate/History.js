function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function fullUrl() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = "/" === t[0] ? t : "/" + t, n = [];
    for (var i in e) n.push(i + "=" + e[i]);
    return r += n.length > 0 ? "?" : "", r += n.join("&");
}

function isSamePage() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    return t.split("?")[0] === e.split("?")[0];
}

function resetRoute() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return t.url = "", t.tainted = !1, t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function t(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, r, n) {
        return r && t(e.prototype, r), n && t(e, n), e;
    };
}(), History = function() {
    function t(e) {
        var r = e.correctLevel, n = void 0 === r ? 1 : r, i = e.routes, o = void 0 === i ? [] : i;
        _classCallCheck(this, t), this._routes = [], this._correctLevel = -1, this._routes = o.slice(0), 
        this._correctLevel = n;
    }
    return _createClass(t, [ {
        key: "_checkTainted",
        value: function() {
            for (var t = 0; t < this._routes.length; ++t) if (!this._routes[t].tainted) {
                for (var e = !1, r = t + 1; r < this._routes.length; ++r) if (isSamePage(this._routes[t].url, this._routes[r].url)) {
                    e = !0;
                    break;
                }
                this._routes[t].tainted = e;
            }
        }
    }, {
        key: "open",
        value: function(t) {
            this.doCorrection(), this._routes.push(Object.assign({}, t)), this._checkTainted();
        }
    }, {
        key: "replace",
        value: function(t) {
            this.doCorrection(), this._routes[this._routes.length - 1] = Object.assign({}, t), 
            this._checkTainted();
        }
    }, {
        key: "back",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.delta, r = void 0 === e ? 1 : e;
            return this.doCorrection(), this._routes.length = Math.max(this._routes.length - r, 0), 
            this.curRoute;
        }
    }, {
        key: "doCorrection",
        value: function() {
            var t = this, e = getCurrentPages();
            if ((!e[0] || e[0].route) && e.length <= this._correctLevel) {
                this._routes.length === e.length && e.every(function(e, r) {
                    return isSamePage(fullUrl(e.route, e.options), t._routes[r].url);
                }) || (this._routes = e.map(function(t) {
                    return Object.assign(resetRoute({}), {
                        url: fullUrl(t.route, t.options)
                    });
                }), this._checkTainted());
            }
        }
    }, {
        key: "length",
        get: function() {
            return this._routes.length;
        }
    }, {
        key: "curRoute",
        get: function() {
            return 0 == this._routes.length ? {} : Object.assign({}, this._routes[this._routes.length - 1]);
        }
    }, {
        key: "routes",
        get: function() {
            return this.doCorrection(), this._routes.slice(0);
        }
    } ]), t;
}();

exports.default = History;