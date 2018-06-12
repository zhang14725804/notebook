function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../utils/api.js")), t(require("../../libs/lodash.core.min.js"));

var e = require("../../libs/bmap-wx.min.js"), a = require("../../libs/qqmap-wx-jssdk.min.js");

Date.prototype.pattern = function(t) {
    var e = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    }, a = {
        0: "日",
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六"
    };
    /(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))), 
    /(E+)/.test(t) && (t = t.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "星期" : "周" : "") + a[this.getDay() + ""]));
    for (var s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
    return t;
};

var s = getApp(), i = (new e.BMapWX({
    ak: "sOuCQ5I64gNb30I85YDvWjCqBpFDRXCz"
}), new a({
    key: "YIRBZ-YINCK-VF6JG-AQIFP-RQYNJ-ICFWN"
}));

Page({
    data: {
        piwikSource: "",
        sugData: "",
        results: [],
        location: "",
        city: {
            data: {
                id: "1",
                name: "上海"
            }
        },
        userStreet: "",
        tracking: {
            scene: "",
            from: ""
        }
    },
    pageData: {},
    onLoad: function(t) {
        var e = "";
        t && t.from && (e = t.from), this.setData({
            "tracking.scene": getApp().globalData.scene,
            "tracking.from": e
        });
        var a = this;
        a.setData({
            "city.data.name": t.currentCity,
            userStreet: t.currentStreet
        });
        i.getSuggestion({
            keyword: "" == a.data.userStreet ? a.data.city.data.name : a.data.userStreet,
            region: a.data.city.data.name,
            region_fix: 1,
            success: function(t) {
                a.setData({
                    results: t.data
                });
            },
            fail: function(t) {}
        });
    },
    bindKeyInput: function(t) {
        var e = this;
        i.getSuggestion({
            keyword: t.detail.value,
            region: e.data.city.data.name,
            region_fix: 1,
            success: function(t) {
                t.data.length > 0 && e.setData({
                    results: t.data
                });
            },
            fail: function(t) {}
        });
    },
    bindNavigateBackClick: function(t) {
        wx.navigateBack({
            delta: 1
        });
    },
    bindChooseResult: function(t) {
        var e = this, a = t.target.dataset.index;
        s.saveCache("userSelectOndoorMapInfo", e.data.results[a]), wx.navigateBack({
            delta: 1
        });
    },
    bindClearInput: function() {
        this.setData({
            userStreet: ""
        });
    }
});