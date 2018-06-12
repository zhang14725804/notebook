!function(e) {
    function t(n) {
        if (a[n]) return a[n].exports;
        var i = global.installedModules[n] = a[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, t), i.l = !0, i.exports;
    }
    var a = {};
    a = global.installedModules = global.installedModules || {}, t.m = e, t.c = a, t.d = function(e, a, n) {
        t.o(e, a) || Object.defineProperty(e, a, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var a = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(a, "a", a), a;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 107);
}({
    107: function(e, t, a) {
        var n = void 0, i = void 0, o = void 0;
        Component({
            properties: {
                sliderClass: String,
                disabled: {
                    value: !0,
                    type: Boolean,
                    observer: function(e) {}
                },
                value: {
                    type: Number,
                    value: 0,
                    observer: "updateInnerValue"
                },
                inactive: Boolean,
                color: {
                    type: String,
                    value: "#4b0"
                },
                inactiveColor: {
                    type: String,
                    value: "#cacaca"
                },
                finishedColor: {
                    type: String,
                    value: "#4b0"
                },
                orientation: {
                    type: String,
                    value: "X"
                },
                pivotOffset: {
                    type: String,
                    value: "-8px"
                }
            },
            data: {
                innerValue: 0,
                sliderWidth: 0,
                isDragging: !1
            },
            methods: {
                updateInnerValue: function(e) {
                    this.data.isDragging || this.updateValue(e);
                },
                updateValue: function(e, t) {
                    var a = this;
                    e = Math.max(0, Math.min(e, 100)), this.setData({
                        innerValue: e
                    }, function() {
                        t && a.triggerEvent("value-update", e);
                    });
                },
                onTouchStart: function(e) {
                    if (!this.data.inactive && !this.data.disabled) {
                        this.setData({
                            isDragging: !0
                        });
                        var t = e.changedTouches[0];
                        n = t["client" + this.data.orientation], console.warn(">>>> start >>>", t, n), i = this.data.innerValue;
                    }
                },
                onTouchMove: function(e) {
                    var t = e.changedTouches[0], a = (t["client" + this.data.orientation] - n) / this.data.sliderWidth * 100;
                    console.warn("move >>>>> ", t, t.clientX, n), o = i + a, this.updateValue(o);
                },
                onTouchEnd: function() {
                    var e = this;
                    this.data.isDragging && setTimeout(function() {
                        e.setData({
                            isDragging: !1
                        }), e.updateValue(o, !0);
                    }, 0);
                }
            },
            ready: function() {
                var e = this;
                this.createSelectorQuery().select(".cap-slider__bar").boundingClientRect(function(t) {
                    t && e.setData({
                        sliderWidth: t.width
                    });
                }).exec();
            }
        });
    }
});