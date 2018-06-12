function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var o = t[a];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, a, o) {
        return a && e(t.prototype, a), o && e(t, o), t;
    };
}(), RouteParams = function() {
    function e() {
        _classCallCheck(this, e), this._backFromRoute = "", this._backFromData = "", this._openFromRoute = "", 
        this._openFromData = "";
    }
    return _createClass(e, [ {
        key: "setBackFromData",
        value: function(e, t) {
            var a = getCurrentPages(), o = a[a.length - 1];
            this._backFromRoute = o.route || t, this._backFromData = e;
        }
    }, {
        key: "getBackFromRoute",
        value: function() {
            return this._backFromRoute;
        }
    }, {
        key: "getBackFromData",
        value: function() {
            return this._backFromData;
        }
    }, {
        key: "clearBackFrom",
        value: function() {
            this._backFromRoute = "", this._backFromData = "";
        }
    }, {
        key: "setOpenFromData",
        value: function(e, t) {
            var a = getCurrentPages(), o = a[a.length - 1];
            this._openFromRoute = o.route || t, this._openFromData = e;
        }
    }, {
        key: "getOpenFromRoute",
        value: function() {
            return this._openFromRoute;
        }
    }, {
        key: "getOpenFromData",
        value: function() {
            return this._openFromData;
        }
    }, {
        key: "clearOpenFrom",
        value: function() {
            this._openFromRoute = "", this._openFromData = "";
        }
    } ]), e;
}();

exports.default = new RouteParams();