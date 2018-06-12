function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), n = require("../../module/message"), i = require("../../module/dataset/attent/index");

module.exports = function(t, e) {
    return new s(t, e);
};

var s = function() {
    function s(e, a) {
        var r = this;
        t(this, s), this._attentKey = e, this._attentPoster = a, this.message = new n();
        var o = !1;
        Object.defineProperties(this, {
            isAttent: {
                get: function() {
                    return o;
                },
                set: function(t) {
                    o = t, r.message.emit("change", t);
                }
            }
        }), i.list().then(function(t) {
            (t && t.VideoAttentInfoList || []).every(function(t) {
                return t.attentKey != r._attentKey || (r.isAttent = !0, !1);
            });
        });
    }
    return e(s, [ {
        key: "onChange",
        value: function(t) {
            return this.message.on("change", t), t(this.isAttent), this;
        }
    }, {
        key: "add",
        value: function() {
            var t = this;
            i.add({
                attentKey: this._attentKey,
                poster: this._attentPoster,
                attentState: 0
            }).then(function(e) {
                t.isAttent = !0, wx.showToast({
                    title: "已加入看单",
                    icon: "success",
                    duration: 2e3
                });
            }), this.isAttent = !0;
        }
    }, {
        key: "remove",
        value: function() {
            var t = this;
            i.del({
                attentKey: this._attentKey,
                poster: this._attentPoster,
                attentState: 1
            }).then(function(e) {
                wx.hideToast(), t.isAttent = !1;
            }), this.isAttent = !1;
        }
    } ]), s;
}();