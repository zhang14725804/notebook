function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var n = e[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, a, n) {
        return a && t(e.prototype, a), n && t(e, n), e;
    };
}(), a = function() {
    function a(e) {
        t(this, a), this.dataObj = {
            loadingVisible: !1
        }, e && (this.setDataFunc = e.setDataFunc);
    }
    return e(a, [ {
        key: "show",
        value: function() {
            this.dataObj.loadingVisible = !0, this.setDataFunc && this.setDataFunc(this.dataObj);
        }
    }, {
        key: "hide",
        value: function() {
            this.dataObj.loadingVisible = !1, this.setDataFunc && this.setDataFunc(this.dataObj);
        }
    } ]), a;
}();

exports.default = a;