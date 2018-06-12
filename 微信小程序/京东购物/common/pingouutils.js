function e(e, t, n) {
    var o = "", r = "", i = void 0;
    return (i = -1 !== e.indexOf("#")) && (o = e.substring(i), e = e.substring(0, i)), 
    -1 !== (i = e.indexOf("?")) && (r = e.substring(i + 1), e = e.substring(0, i)), 
    (r = r.split("&").filter(function(e) {
        return e && decodeURIComponent(e.split("=")[0]).toLowerCase() !== t.toLowerCase();
    })).push(encodeURIComponent(t) + "=" + encodeURIComponent(n)), r = r.join("&"), 
    e + "?" + r + o;
}

function t(e) {
    try {
        var t = e.eventId || "", n = new MPing.inputs.Click(t);
        n.event_param = e.eventParam || "", n.event_level = e.eventLevel || "", n.updateEventSeries(), 
        new MPing().send(n);
    } catch (e) {}
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = "jdm" == wx.JD.device.scene || "mobile" == wx.JD.device.scene, o = "jdapp" == wx.JD.device.scene;

exports.default = {
    IS_MOBILE: n,
    IS_JDAPP: o,
    getGoodImg: function(e, t) {
        return e ? (/.*wx\.qlogo\.cn.*\/0$/.test(e) && (e = e.replace("/0", "/64")), /^(http(s)?:)?\/\//.test(e) ? wx.JD.performance.getScaleImg(e.replace(/^(http(s)?:)/, "")) : (t ? isNaN(t) || (t = "s" + t + "x" + t + "_") : t = "s240x240_", 
        e.indexOf("jfs"), wx.JD.performance.getScaleImg("//img1" + ~~(5 * Math.random()) + ".360buyimg.com/evalpic/" + t + e))) : "";
    },
    getPingouurl: function(e, t) {
        var n = wx.JD.url.getUrlParam("sku", e), o = wx.JD.url.getUrlParam("pps", e), r = "//wqs.jd.com/pingou/item.shtml?sku=" + n + (o ? "&pps=" + o : "");
        return t && (r += "&ptag=" + t), r;
    },
    openAppWebview: function(r, i) {
        n && (r = e(r, "sceneval", "2")), o ? (r = 'openapp.jdmobile://virtual?params={"des":"m","category":"jump","url":"https:' + wx.JD.url.addUrlParam(r, {
            jdshwkon: "1"
        }) + '"}', i ? (t(i), setTimeout(function() {
            window.location.href = r;
        }, 200)) : window.location.href = r) : setTimeout(function() {
            window.location.href = r;
        }, 0);
    }
};