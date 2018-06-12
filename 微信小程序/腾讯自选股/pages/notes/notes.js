(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d), f = require("../../libs/sqtRequest"), g = a(f), h = require("../../utils/Tool"), i = a(h);
    Page({
        data: {
            name: "--",
            price: "--",
            chgRatio: "--",
            color: ""
        },
        onLoad: function(a) {
            var b = this, c = a.symbol;
            g.default.get({
                symbol: [ c ],
                key: [ "Name", "Price", "Chg", "ChgRatio" ]
            }).then(function(a) {
                var d = a[c];
                b.setData({
                    name: d.Name,
                    price: i.default.fmPrice(d.Price),
                    chgRatio: i.default.fmChgRatio(d.ChgRatio),
                    color: i.default.ColorSet(d.Chg)
                });
            });
            var d = getApp(), e = d.Event;
            e.on("qtDataUpdate", this, this.updateData);
        },
        onUnload: function() {
            var a = getApp(), b = a.Event;
            b.remove("qtDataUpdate", this);
        },
        updateData: function(a) {
            console.log(a), this.setData({
                price: a.Price,
                chgRatio: a.ChgRatio,
                color: i.default.ColorSet(a.Chg)
            });
        },
        bindSub: function() {
            console.log(1232323232);
        }
    });
})();