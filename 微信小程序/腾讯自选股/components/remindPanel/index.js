(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, c = require("../../utils/ppdog"), d = a(c), e = require("../../utils/regenerator-runtime"), f = a(e), g = require("../../utils/RequestApi");
    module.exports = {
        data: {
            remindShow: !1
        },
        symbol: "",
        onLoad: function() {
            var a = getApp(), b = a.Event;
            b.on("addRemind", this, this.remindUpdate);
        },
        onUnload: function() {
            var a = getApp(), b = a.Event;
            b.remove("addRemind", this);
        },
        methods: {
            getRemind: function(a) {
                var b = this;
                this.symbol = a;
                var c = function(c, d) {
                    var e = c && c.some(function(b) {
                        return b == a;
                    }), f = d && d.some(function(b) {
                        return b == a;
                    });
                    g.Request.getRemind(a).then(function(a) {
                        a.inDList = f, b.remindUpdate(a);
                    });
                };
                d.default.wx.getStorage({
                    key: "remindList"
                }).then(function(a) {
                    c(a.data.list, a.data.dList);
                }).catch(function() {
                    g.Request.getRemindList().then(function(a) {
                        c(a, []), d.default.wx.setStorage({
                            key: "remindList",
                            data: {
                                list: a,
                                dList: []
                            }
                        });
                    });
                });
            },
            remindUpdate: function(a) {
                var c = b(a, {}), d = this.symbol, e = "";
                if (a && c.price && !c.inDList) {
                    var f, g = c.price.updatetime, h = !!+c.exceeded;
                    "string" == typeof g ? (g = g.trim().replace(" ", "T") + "+08:00", f = new Date(g)) : f = g;
                    var i = new Date(f.setDate(f.getDate() + 7)), j = new Date(f.setDate(f.getDate() + 7)), k = new Date(), l = c.price, m = l.high, n = l.low, o = l.updown, p = l.close;
                    if (k > j || p) this.catchCloseRemind(); else if (k > i || h) e = "您设置的股价提醒已失效，如需再次提醒点此更新"; else {
                        m = +m, n = +n, o = +o;
                        var q = !h && 0 != m, r = !h && 0 != n, s = !h && -1 != o, t = i.getMonth() + 1;
                        i = i.getDate(), q && r && s ? e = t + "月" + i + "日前上涨达到" + m + "元或触发其他条件时提醒你" : q && !r && s ? e = t + "月" + i + "日前上涨达到" + m + "元，或涨跌达到" + o + "%时提醒你" : q && r && !s ? e = t + "月" + i + "日前上涨达到" + m + "元，或下跌达到" + n + "元时提醒你" : !q || r || s ? !q && r && s ? e = t + "月" + i + "日前下跌达到" + n + "元，或涨跌达到" + o + "%时提醒你" : q || r || !s ? !q && r && !s && (e = t + "月" + i + "日前下跌达到" + n + "元时提醒你") : e = t + "月" + i + "日前涨跌达到" + o + "%时提醒你" : e = t + "月" + i + "日前上涨达到" + m + "元时提醒你", 
                        29 < e.length && (e = t + "月" + i + "日前满足设置的条件时提醒你");
                    }
                }
                this.setData({
                    remindTip: e,
                    remindShow: !!e,
                    remindData: c
                });
            },
            catchCloseRemind: function() {
                var a = this;
                d.default.wx.getStorage({
                    key: "remindList"
                }).then(function(b) {
                    var c = b.data;
                    c.dList.push(a.symbol), d.default.wx.setStorage({
                        key: "remindList",
                        data: {
                            list: c.list,
                            dList: c.dList
                        }
                    }), a.setData({
                        remindShow: !1
                    });
                }).catch(function(a) {
                    console.log(a);
                });
            },
            removeRemind: function() {
                if (this.data.remindData && this.data.remindData.price) {
                    this.setData({
                        remindTip: "",
                        remindShow: !1,
                        remindData: {
                            price: {
                                high: 0,
                                low: 0,
                                updown: -1
                            }
                        }
                    });
                }
            }
        }
    };
})();