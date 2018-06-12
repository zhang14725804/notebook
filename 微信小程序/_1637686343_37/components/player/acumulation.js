function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var r = e[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, i, r) {
        return i && t(e.prototype, i), r && t(e, r), e;
    };
}(), i = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}(require("../../pages/specialSubject/service/integralService")), r = function() {
    function r() {
        t(this, r), this.init();
    }
    return e(r, [ {
        key: "init",
        value: function() {
            this.playing = !1, this.duration = 0, this.lastTime = 0, this.currentTime = 0, this.lastDuration = 0, 
            this.addIntergral = !1, this.dragtoTime = -1;
        }
    }, {
        key: "calcAcumulateTime",
        value: function(t, e, r) {
            if (this.currentTime = Math.round(t), Math.abs(this.currentTime - this.lastTime) > 1 ? (this.dragtoTime = this.currentTime, 
            this.lastDuration = this.duration) : this.duration = this.dragtoTime > 0 ? this.lastDuration + (this.currentTime - this.dragtoTime) : this.currentTime, 
            this.duration >= 180 && !this.addIntergral) {
                this.addIntergral = !0;
                var n = e.scoreAddParams("view_minutes");
                i.integralApi("score/add", n).then(function(t) {
                    e.refreshIntegral(t, "view_minutes");
                });
            }
            this.lastTime = this.currentTime;
        }
    } ]), r;
}();

exports.default = new r();