function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
        return r;
    }
    return Array.from(t);
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function t(t, e) {
        for (var r = 0; r < e.length; r++) {
            var a = e[r];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, r, a) {
        return r && t(e.prototype, r), a && t(e, a), e;
    };
}(), postParams = function() {
    function t() {
        _classCallCheck(this, t), this._required = [], this._optional = [], this._basicParams = [], 
        this._cateId = "";
    }
    return _createClass(t, [ {
        key: "_filterValueParams",
        value: function() {
            return this._basicParams.filter(function(t) {
                return t.valueId;
            });
        }
    }, {
        key: "clear",
        value: function() {
            this._required = [], this._optional = [], this._basicParams = [];
        }
    }, {
        key: "params",
        set: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            this._required = t[0], this._optional = t[1], this._basicParams = [].concat(_toConsumableArray(t[0]), _toConsumableArray(t[1]));
        },
        get: function() {
            var t = this._filterValueParams();
            return t.length > 0 ? t : null;
        }
    }, {
        key: "cateId",
        set: function(t) {
            this._cateId = t;
        },
        get: function() {
            return this._cateId;
        }
    }, {
        key: "required",
        get: function() {
            return this._require;
        }
    }, {
        key: "optional",
        get: function() {
            return this._optional;
        }
    } ]), t;
}();

exports.default = new postParams();