!function(t) {
    function e(a) {
        if (n[a]) return n[a].exports;
        var i = global.installedModules[a] = n[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return t[a].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
    }
    var n = {};
    n = global.installedModules = global.installedModules || {}, e.m = t, e.c = n, e.d = function(t, n, a) {
        e.o(t, n) || Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: a
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(n, "a", n), n;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 103);
}({
    103: function(t, e, n) {
        function a(t, e) {
            for (var n = ""; n.length < e; ) n += "0";
            return (n + t).slice(-e);
        }
        function i(t, e, n) {
            for (var i = []; t <= e; ) i.push(a(t, n)), t++;
            return i;
        }
        var s = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var a = e[n];
                    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
                    Object.defineProperty(t, a.key, a);
                }
            }
            return function(e, n, a) {
                return n && t(e.prototype, n), a && t(e, a), e;
            };
        }(), r = function(t, e) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return function(t, e) {
                var n = [], a = !0, i = !1, s = void 0;
                try {
                    for (var r, o = t[Symbol.iterator](); !(a = (r = o.next()).done) && (n.push(r.value), 
                    !e || n.length !== e); a = !0) ;
                } catch (t) {
                    i = !0, s = t;
                } finally {
                    try {
                        !a && o.return && o.return();
                    } finally {
                        if (i) throw s;
                    }
                }
                return n;
            }(t, e);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }, o = function() {
            function t(e) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date(), a = arguments[2];
                !function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, t), this.types = [ "year", "month", "day", "hour", "minute", "second" ], 
                this.months = i(1, 12, 2), this.hours = i(0, 23, 2), this.seconds = i(0, 59, 2), 
                this.minutes = i(0, 59, 2), this.init(n, a);
            }
            return s(t, [ {
                key: "getYears",
                value: function(t) {
                    var e = Math.floor(25);
                    return i(t - e, t + (50 - e), 4);
                }
            }, {
                key: "lastDay",
                value: function(t, e) {
                    return 12 !== e ? new Date(new Date(t + "/" + (e + 1) + "/1").getTime() - 864e5).getDate() : 31;
                }
            }, {
                key: "init",
                value: function(t, e) {
                    var n = new Date(t), a = n.getFullYear(), s = n.getMonth() + 1, r = this.getYears(a), o = i(1, this.lastDay(a, s), 2);
                    this._years = r, this._dataList = [ r, this.months, o, this.hours, this.minutes, this.seconds ], 
                    this._indexs = [ 25, s - 1, n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds() ], 
                    e && e({
                        dataList: this._dataList,
                        indexs: this._indexs
                    });
                }
            }, {
                key: "update",
                value: function(t, e, n) {
                    switch (this.types[t]) {
                      case "year":
                        this._updateYear(t, e, n);
                        break;

                      case "month":
                        this._updateMonth(t, e, n);
                        break;

                      default:
                        this._indexs[t] = e, n && n({
                            dataList: this._dataList,
                            indexs: this._indexs,
                            updateColumn: t,
                            updateIndex: e
                        });
                    }
                }
            }, {
                key: "_updateYear",
                value: function(t, e, n) {
                    var a = this._dataList[t][e];
                    this._dataList[t] = this.getYears(+a), this._indexs[t] = Math.floor(25), n && n({
                        dataList: this._dataList,
                        indexs: this._indexs,
                        updateColumn: t
                    });
                }
            }, {
                key: "_updateMonth",
                value: function(t, e, n) {
                    var a = this._dataList[t][e], s = this._dataList[0][this._indexs[0]], r = this.lastDay(+s, +a);
                    this._indexs[t] = e, this._dataList[2] = i(1, r, 2), this._indexs[2] = this._indexs[2] >= this._dataList[2].length ? this._dataList[2].length - 1 : this._indexs[2], 
                    n && n({
                        dataList: this._dataList,
                        indexs: this._indexs,
                        updateColumn: 2,
                        updateIndex: this._indexs[2]
                    }), n && n({
                        dataList: this._dataList,
                        indexs: this._indexs,
                        updateColumn: 1,
                        updateIndex: e
                    });
                }
            } ]), t;
        }(), u = [];
        Component({
            properties: {
                placeholder: {
                    type: String,
                    value: "请选择时间"
                },
                format: {
                    type: String,
                    value: "YYYY-MM-DD HH:mm:ss"
                },
                native: {
                    type: Boolean
                },
                date: {
                    type: String,
                    value: new Date()
                },
                notUse: {
                    type: Array
                }
            },
            externalClasses: [ "placeholder-class" ],
            data: {
                transPos: [ 0, 0, 0, 0, 0, 0 ]
            },
            attached: function() {
                var t = this;
                this.use = {}, [ "years", "months", "days", "hours", "minutes", "seconds" ].forEach(function(e) {
                    -1 === (t.data.notUse || []).indexOf(e) && (t.use[e] = !0);
                }), this.setData({
                    use: this.use
                });
            },
            ready: function() {
                this.picker = new o(this.data.format, this.data.date, this.updatePicker.bind(this));
            },
            methods: {
                updatePicker: function(t) {
                    var e = t.dataList, n = t.indexs, a = t.updateColumn, i = t.updateIndex, s = {};
                    u = n, a && (s["transPos[" + a + "]"] = -36 * u[a], s["dataList[" + a + "]"] = e[a]), 
                    void 0 !== i && (s["transPos[" + a + "]"] = -36 * u[a], s["selected[" + a + "]"] = n[a]), 
                    a || void 0 !== i || (s = {
                        dataList: e,
                        selected: n
                    }, u.forEach(function(t, e) {
                        s["transPos[" + e + "]"] = 36 * -t;
                    })), this.setData(s);
                },
                touchmove: function(t) {
                    var e = t.changedTouches, n = t.target.dataset.col, a = e[0].clientY;
                    if (n) {
                        var i = {}, s = this.data.dataList[n].length;
                        i["transPos[" + n + "]"] = this.startTransPos + (a - this.startY), i["transPos[" + n + "]"] >= 0 ? i["transPos[" + n + "]"] = 0 : 36 * -(s - 1) >= i["transPos[" + n + "]"] && (i["transPos[" + n + "]"] = 36 * -(s - 1)), 
                        this.setData(i);
                    }
                },
                touchStart: function(t) {
                    var e = t.target, n = t.changedTouches, a = e.dataset.col, i = n[0];
                    a && (this.startY = i.clientY, this.startTime = t.timeStamp, this.startTransPos = this.data.transPos[a]);
                },
                touchEnd: function(t) {
                    var e = t.target.dataset.col;
                    if (e) {
                        var n = this.data.transPos[e], a = Math.round(n / 36);
                        this.columnchange({
                            detail: {
                                column: +e,
                                value: -a
                            }
                        });
                    }
                },
                columnchange: function(t) {
                    var e = t.detail, n = e.column, a = e.value;
                    u[n] = a, this.setData({
                        text: this.getFormatStr()
                    }), this.picker.update(n, a, this.updatePicker.bind(this));
                },
                getFormatStr: function() {
                    var t = this, e = new Date();
                    return [ "FullYear", "Month", "Date", "Hours", "Minutes", "Seconds" ].forEach(function(n, a) {
                        var i = t.data.dataList[a][u[a]];
                        "Month" === n && (i = +t.data.dataList[a][u[a]] - 1), e["set" + n](+i);
                    }), function(t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "YYYY:MM:DD";
                        if (t || 0 === t || (t = new Date()), "Invalid Date" === (t = new Date(t)).toString()) throw new Error("Invalid Date");
                        var n = function(e, n) {
                            return n ? n(t["get" + e]()) : t["get" + e]();
                        }, i = new Map();
                        i.set(/(Y+)/i, function() {
                            return n("FullYear", function(t) {
                                return (t + "").substr(4 - RegExp.$1.length);
                            });
                        }), i.set(/(M+)/, function() {
                            return n("Month", function(t) {
                                return a(t + 1, RegExp.$1.length);
                            });
                        }), i.set(/(D+)/i, function() {
                            return n("Date", function(t) {
                                return a(t, RegExp.$1.length);
                            });
                        }), i.set(/(H+)/i, function() {
                            return n("Hours", function(t) {
                                return a(t, RegExp.$1.length);
                            });
                        }), i.set(/(m+)/, function() {
                            return n("Minutes", function(t) {
                                return a(t, RegExp.$1.length);
                            });
                        }), i.set(/(s+)/, function() {
                            return n("Seconds", function(t) {
                                return a(t, RegExp.$1.length);
                            });
                        });
                        var s = !0, o = !1, u = void 0;
                        try {
                            for (var h, d = i[Symbol.iterator](); !(s = (h = d.next()).done); s = !0) {
                                var c = h.value, l = r(c, 2), f = l[0], v = l[1];
                                f.test(e) && (e = e.replace(RegExp.$1, v.call(null)));
                            }
                        } catch (t) {
                            o = !0, u = t;
                        } finally {
                            try {
                                !s && d.return && d.return();
                            } finally {
                                if (o) throw u;
                            }
                        }
                        return e;
                    }(e, this.data.format);
                },
                showPicker: function() {
                    this.setData({
                        show: !0
                    });
                },
                hidePicker: function(t) {
                    var e = t.currentTarget.dataset.action;
                    this.setData({
                        show: !1
                    }), "cancel" === e ? this.cancel({
                        detail: {}
                    }) : this.change({
                        detail: {
                            value: u
                        }
                    });
                },
                change: function(t) {
                    var e = t.detail.value, n = this.data.dataList.map(function(t, n) {
                        return +t[e[n]];
                    });
                    this.triggerEvent("change", {
                        value: n
                    }), this.setData({
                        text: this.getFormatStr()
                    });
                },
                cancel: function(t) {
                    this.triggerEvent("cancel", t.detail);
                }
            }
        });
    }
});