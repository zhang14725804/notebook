!function(t) {
    function a(i) {
        if (e[i]) return e[i].exports;
        var n = global.installedModules[i] = e[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(n.exports, n, n.exports, a), n.l = !0, n.exports;
    }
    var e = {};
    e = global.installedModules = global.installedModules || {}, a.m = t, a.c = e, a.d = function(t, e, i) {
        a.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: i
        });
    }, a.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, a.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return a.d(e, "a", e), e;
    }, a.o = function(t, a) {
        return Object.prototype.hasOwnProperty.call(t, a);
    }, a.p = "", a(a.s = 90);
}({
    90: function(t, a, e) {
        function i(t) {
            var a = parseInt(t / 60, 10), e = parseInt(t % 60, 10);
            return n(a) + ":" + n(e);
        }
        function n(t) {
            return t < 10 ? "0" + t : "" + t;
        }
        var o = "stop", u = "pause", d = "play", r = void 0, s = void 0, c = void 0, l = {}, h = null, f = !1;
        Component({
            properties: {
                themeClass: String,
                src: {
                    type: String,
                    value: "",
                    observer: function(t) {
                        this.createAudioContext(t);
                    }
                },
                isBackground: {
                    type: Boolean,
                    value: !1,
                    observer: function(t) {
                        this.changeAudioType(t);
                    }
                },
                title: {
                    type: String,
                    value: " "
                },
                loop: {
                    value: !1,
                    type: Boolean
                },
                disabled: {
                    value: !1,
                    type: Boolean
                },
                inactive: {
                    type: Boolean,
                    value: !1
                },
                color: {
                    type: String,
                    value: "#f44"
                },
                inactiveColor: {
                    type: String,
                    value: "#cacaca"
                },
                finishedColor: {
                    type: String,
                    value: "#f44"
                },
                pivotOffset: {
                    type: String,
                    value: "-8px"
                }
            },
            data: {
                canPlay: !1,
                isLoading: !0,
                percent: 0,
                sliderWidth: 0,
                formatedCurrentTime: "00:00",
                formatedDuration: "00:00",
                audio: null
            },
            methods: {
                onTouchStart: function(t) {
                    if (!this.data.inactive && !this.data.disabled) {
                        f = !0;
                        var a = t.changedTouches[0];
                        r = a.clientX, s = this.data.percent / 100;
                    }
                },
                onTouchMove: function(t) {
                    var a = (t.changedTouches[0].clientX - r) / this.data.sliderWidth;
                    c = s + a, this._updateCurrentValue(c);
                },
                onTouchEnd: function() {
                    var t = this;
                    f && setTimeout(function() {
                        f = !1, t._updateCurrentValue(c, !0);
                    }, 0);
                },
                changeAudioType: function(t) {},
                createAudioContext: function(t) {
                    var a = this;
                    (h = this.data.isBackground ? wx.getBackgroundAudioManager() : wx.createInnerAudioContext()).onPlay(function() {
                        a.setData({
                            status: d
                        });
                    }), h.onPause(function() {
                        a.setData({
                            status: u
                        });
                    }), h.onStop(function() {
                        a.setData({
                            status: o
                        });
                    }), h.onEnded(function() {
                        a._resetProgress(), a.triggerEvent("audio-end");
                    }), h.onTimeUpdate(function() {
                        var e = h, n = e.currentTime, o = e.duration;
                        f || a._updateAudioTime(n, o), l[t] || (l[t] = o, a.setData({
                            formatedDuration: i(o)
                        }));
                    }), h.onCanplay(function() {
                        a.setData({
                            canPlay: !0,
                            isLoading: !1
                        });
                    }), h.onWaiting(function() {
                        a.setData({
                            isLoading: !0
                        });
                    }), this.data.isBackground || (h.src = t), h.loop = this.data.loop, this.setData({
                        audio: h
                    });
                },
                _resetProgress: function(t) {
                    this.setData({
                        formatedCurrentTime: "00:00",
                        percent: 0,
                        status: t || o
                    });
                },
                _updateCurrentValue: function(t, a) {
                    t = Math.max(0, Math.min(t, 1));
                    var e = this.data.audio;
                    e && this._updateAudioTime(t * e.duration, e.duration, a);
                },
                _updateAudioTime: function(t, a, e, n) {
                    var o = this, u = t / a * 100;
                    this.setData({
                        percent: u,
                        formatedCurrentTime: i(t),
                        isLoading: !1,
                        isLoaded: !0
                    }, function() {
                        e && o.data.audio && "function" == typeof o.data.audio.seek && (o.data.audio.seek(t), 
                        o.triggerEvent("audio-time-update", {
                            percent: u,
                            currentTime: t,
                            duration: a
                        })), n && (f = !1);
                    });
                },
                _audioStart: function() {
                    if (!this.data.src) return this.triggerEvent("audio-empty");
                    this.data.audio && this.data.status !== d && (this.data.isBackground && !this.data.audio.currentTime ? (this.data.audio.title = this.data.title, 
                    this.data.audio.singer = " ", this.data.audio.src = this.data.src) : this.data.audio.play());
                },
                _audioPause: function() {
                    this.data.audio && this.data.status !== u && this.data.audio.pause();
                },
                _audioFastForward: function() {
                    if (this.data.audio) {
                        f = !0;
                        var t = this.data.audio, a = t.currentTime, e = t.duration, i = Math.min(a + 10, e);
                        this._updateAudioTime(i, e, !0, !0);
                    }
                },
                _audioRewind: function() {
                    if (this.data.audio) {
                        f = !0;
                        var t = this.data.audio, a = t.currentTime, e = t.duration, i = Math.max(a - 10, 0);
                        this._updateAudioTime(i, e, !0, !0);
                    }
                },
                _audioReset: function() {
                    this.data.audio && (this.data.audio.seek(0), this._resetProgress(d));
                }
            },
            ready: function() {
                var t = this;
                this.createSelectorQuery().select(".cap-audio__slider-bar").boundingClientRect(function(a) {
                    a && t.setData({
                        sliderWidth: a.width
                    });
                }).exec();
            },
            created: function() {
                this.data.src && this.createAudioContext(this.data.src);
            },
            detached: function() {
                this.data.audio && "function" == typeof this.data.audio.destroy && this.data.audio.destroy(), 
                this.setData({
                    audio: null
                });
            }
        });
    }
});