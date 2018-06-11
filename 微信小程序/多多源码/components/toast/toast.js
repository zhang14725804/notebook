function t(t, n) {
    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function t(t, n) {
        for (var e = 0; e < n.length; e++) {
            var i = n[e];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(n, e, i) {
        return e && t(n.prototype, e), i && t(n, i), n;
    };
}(), e = 2e3, i = function() {
    function i(n) {
        t(this, i), this.dataObj = {
            toastMessage: "",
            visible: null
        }, this.setDataFunc = null, this.hideToastFunc = null, void 0 === n.showCenterInWindow && (n.showCenterInWindow = !0), 
        this.showCenterInWindow = !!n.showCenterInWindow, this.showDuration = n.showDuration || e, 
        this.topValueInFixedPositon = n.topValueInFixedPositon, this.dataObj.showCenterInWindow = this.showCenterInWindow, 
        this.dataObj.topValueInFixedPositon = this.topValueInFixedPositon, n && (this.setDataFunc = n.setDataFunc);
    }
    return n(i, [ {
        key: "setText",
        value: function(t) {
            return t && (this.dataObj.toastMessage = t.toString(), this.setDataFunc && this.setDataFunc(this.dataObj)), 
            this;
        }
    }, {
        key: "show",
        value: function(t) {
            var n = this;
            t = t || {}, this.hideToastFunc = t.hideToastFunc;
            var e = t.showDuration || this.showDuration;
            this.dataObj.visible = !0, void 0 !== t.showCenterInWindow && (this.dataObj.showCenterInWindow = t.showCenterInWindow), 
            t.topValueInFixedPositon ? (this.topValueInFixedPositon = t.topValueInFixedPositon, 
            this.dataObj.topValueInFixedPositon = t.topValueInFixedPositon) : (this.topValueInFixedPositon = null, 
            this.dataObj.topValueInFixedPositon = null), this.setDataFunc && this.setDataFunc(this.dataObj), 
            setTimeout(function() {
                return n.hide();
            }, e);
        }
    }, {
        key: "hide",
        value: function() {
            this.dataObj.showCenterInWindow = this.showCenterInWindow, this.dataObj.visible = !1, 
            this.setDataFunc && this.setDataFunc(this.dataObj), "function" == typeof this.hideToastFunc && (this.hideToastFunc(), 
            this.hideToastFunc = null);
        }
    } ]), i;
}();

exports.default = i;