(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b, c, d = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, e = require("../../utils/ppdog"), f = a(e), g = require("../../utils/regenerator-runtime"), h = a(g), i = require("../../utils/RequestApi");
    Page({
        components: {
            failureTip: {}
        },
        data: {
            upPriceInvalid: !1,
            downPriceInvalid: !1,
            inputFocus: [ !1, !1 ],
            alert: {
                upPrice: [ !1, "", !1 ],
                downPrice: [ !1, "", !1 ],
                chgRatio: [ !1, "", !1 ]
            },
            modal: {
                hidden: !0,
                info: ""
            },
            formid: 0,
            qq: ""
        },
        isSubmit: !1,
        onLoad: function(a) {
            var b = getApp(), c = b.Event;
            c.on("qtDataUpdate", this, this.updateData);
            var d = a.name, e = a.symbol, f = a.high, g = a.price, h = a.low, i = a.updown, j = a.chgRatio;
            j += "%";
            var k = getApp(), l = this.getNameSize(d), m = "";
            9999 < g ? m = "smaller" : 999 < g && (m = "small");
            var n = 0 <= j.indexOf("+") ? "up" : "down", o = {
                upPrice: !1,
                downPrice: !1,
                chgRatio: !1
            }, p = {
                upPrice: "",
                downPrice: "",
                chgRatio: ""
            };
            0 < f && (p.upPrice = f, o.upPrice = !0), 0 < h && (p.downPrice = h, o.downPrice = !0), 
            0 < i && (p.chgRatio = i, o.chgRatio = !0), this.setData({
                symbol: e,
                name: d,
                nameSize: l,
                price: g,
                psmaller: m,
                chgRatio: j,
                rateUpdown: n,
                inputVal: p,
                switchChecked: o
            });
        },
        onShow: function() {
            console.log("onShow");
            var a = getApp().settings.colorType;
            this.data.colorType != a && this.setData({
                colorType: a
            });
        },
        onHide: function() {
            console.log("onHide");
        },
        updateData: function(a) {
            var b = "", c = a.Price, d = a.ChgRatio;
            9999 < c ? b = "smaller" : 999 < c && (b = "small");
            var e = 0 <= d.indexOf("+") ? "up" : "down";
            this.setData({
                price: c,
                psmaller: b,
                chgRatio: d,
                rateUpdown: e
            });
        },
        getNameSize: function(a) {
            var b = a ? this.strLen(a) : 0, c = "";
            return 7 == b ? c = "--small" : 8 == b || 9 == b ? c = "--smaller" : 10 <= b && (c = "--smallest"), 
            c;
        },
        strLen: function(a) {
            var b, c;
            for (c = 0, b = 0; b < a.length; b++) 0 <= a.charCodeAt(b) && 255 >= a.charCodeAt(b) ? 0 == b % 2 && ++c : ++c;
            return b == 2 * c && (c += 1), c;
        },
        bindSwitchChange: function(a) {
            var b = a.currentTarget.dataset.type, c = a.detail.value, d = this.data, e = {};
            e["switchChecked." + b] = c, this.setData(e);
        },
        bindfocusInput: function(a) {
            var d = a.currentTarget.dataset.type, e = +this.data.inputVal["" + d], f = {}, g = this.data.price;
            "upPrice" == d && e < g && "" != a.detail.value && (b = !0, f["alert." + d] = [ !0, "上涨目标低于最新价", !0 ]), 
            "downPrice" == d && e > g && (c = !0, f["alert." + d] = [ !0, "下跌目标高于最新价", !0 ]), 
            f["switchChecked." + d] = !0, !(0 < e) || b || c || this.calculateVal(d), this.setData(f);
        },
        bindblurInput: function(a) {
            var b = a.currentTarget.dataset.type, c = "chgRatio" == b && "" == this.data.inputVal["" + b] ? -1 : +this.data.inputVal["" + b], d = {};
            d["switchChecked." + b] = "chgRatio" == b ? 0 <= c : 0 < c, d["alert." + b] = [ !1, "" ], 
            this.setData(d);
        },
        bindKeyInputUpPrice: function(a) {
            var c = a.detail.value, d = +c, e = {};
            if (1e6 > d && "00" != c) {
                var f = this.data.price;
                b = d < f && "" != c;
                var g = c.split(".")[1];
                g && 3 < g.length && (c = c.substr(0, c.indexOf(".") + 4)), b ? (e["alert.upPrice"] = [ !0, "上涨目标低于最新价", !0 ], 
                e["inputVal.upPrice"] = c, e.upPriceInvalid = !0, this.setData(e)) : (e["inputVal.upPrice"] = c, 
                e.upPriceInvalid = !1, this.setData(e), this.calculateVal("upPrice"));
            } else e["inputVal.upPrice"] = this.data.inputVal.upPrice, this.setData(e);
        },
        bindKeyInputDownPrice: function(a) {
            var b = a.detail.value, d = +b, e = {};
            if (1e6 > d && "00" != b) {
                var f = b.split(".")[1];
                f && 3 < f.length && (b = b.substr(0, b.indexOf(".") + 4));
                var g = this.data.price;
                c = !!(d > g), c ? (e["alert.downPrice"] = [ !0, "下跌目标高于最新价", !0 ], e["inputVal.downPrice"] = b, 
                e.downPriceInvalid = !0, this.setData(e)) : (e["inputVal.downPrice"] = b, e.downPriceInvalid = !1, 
                this.setData(e), this.calculateVal("downPrice"));
            } else e["inputVal.downPrice"] = this.data.inputVal.downPrice, this.setData(e);
        },
        bindKeyInputChgRatio: function(a) {
            var b = a.detail.value, c = +b, d = {};
            if (1e6 > c && "00" != b) {
                var e = b.split(".")[1];
                e && 3 < e.length && (b = b.substr(0, b.indexOf(".") + 4)), d["inputVal.chgRatio"] = b, 
                this.setData(d);
            } else d["inputVal.chgRatio"] = this.data.inputVal.chgRatio, this.setData(d);
        },
        calculateVal: function(a) {
            var b = this.data.price, c = this.data.inputVal["" + a], d = 0;
            if (0 < +b) {
                d = "downPrice" === a ? 100 * (1 - +c / +b) : 100 * (+c / +b - 1);
                var e = {};
                if (0 < d && 0 < c) {
                    e["alert." + a + "[0]"] = !0;
                    var f = "upPrice" == a ? "涨" : "跌";
                    e["alert." + a + "[1]"] = "较当前价" + f + " " + d.toFixed(2) + "%", e["alert." + a + "[2]"] = !1;
                    var g = 9999 < d ? "small" : "";
                    g = 99999 < d ? "smaller" : g, g = 999999 < d ? "smallest" : g, e["alert." + a + "[3]"] = g;
                } else e["alert." + a + "[0]"] = !1;
                this.setData(e);
            }
        },
        handleCache: function() {
            var a = this, b = a.data.symbol;
            f.default.wx.getStorage({
                key: "remindList"
            }).then(function(a) {
                var c = a.data;
                if (c && c.list) {
                    var e = c.list.some(function(a) {
                        return a == b;
                    }), g = c.dList.some(function(a) {
                        return a == b;
                    });
                    if (e || c.list.push(b), g) {
                        var h = c.dList.indexOf(b);
                        0 <= h && c.dList.splice(h, 1);
                    }
                    f.default.wx.setStorage({
                        key: "remindList",
                        data: d({}, c)
                    });
                }
            }).catch(function(a) {
                console.log("handleCache error", a);
            });
        },
        remindFormSubmit: function(a) {
            var b = this, c = a.detail.formId, d = getApp(), e = this.childrens.failureTip, f = function() {
                e.showTip("保存失败，请重新提交设置");
            };
            if (!1 === this.isSubmit) {
                var g = this.data, h = g.upPriceInvalid, j = g.downPriceInvalid, l = g.switchChecked, m = g.price, n = this.data, o = n.inputVal, p = n.symbol;
                if (h = !!l.upPrice && +o.upPrice < m, j = !!l.downPrice && +o.downPrice > m, h || j) {
                    var q = h && j ? "目标价输入有误" : h ? "上涨目标低于最新价" : "下跌目标高于最新价";
                    var r = function() {
                        var a = h ? [ !0, !1 ] : [ !1, !0 ];
                        b.setData({
                            inputFocus: a
                        });
                    };
                    return void wx.showModal({
                        content: q,
                        showCancel: !1,
                        confirmColor: "#3083e3",
                        success: function(a) {
                            a.confirm && r();
                        }
                    });
                }
                for (var s in l) !1 === l[s] ? o[s] = "chgRatio" == s ? -1 : 0 : o.chgRatio = "" == o.chgRatio ? -1 : o.chgRatio;
                c = 0 <= c.indexOf("mock") ? "37a71edb01c15728238df2261150c7ba" : c, i.Request.setRemind(p, this.data.inputVal, c).then(function(a) {
                    console.log("setremind success", a);
                    var c = b.data.inputVal, e = {
                        price: {
                            updatetime: new Date(),
                            high: c.upPrice,
                            low: c.downPrice,
                            updown: c.chgRatio,
                            exceeded: 0
                        }
                    };
                    0 == c.upPrice && 0 == c.downPrice && -1 == c.chgRatio ? e.price.close = !0 : b.handleCache(), 
                    d.Event.emit("addRemind", e), b.isSubmit = !0, wx.navigateBack();
                }).catch(function(a) {
                    console.log("setremind fail", a), f();
                });
            }
        }
    });
})();