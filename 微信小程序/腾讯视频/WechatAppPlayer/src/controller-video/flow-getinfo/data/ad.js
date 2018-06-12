function r(r) {
    u(r, {
        header: {
            Cookie: "appuser=" + d + "; Lturn=" + a
        }
    }).then(function(r) {
        console.log("上报成功"), console.log(r);
    }, function(e) {
        console.log("上报失败"), console.log(e), r = r + "&appuesr=" + d, y.emit("report", {
            reportUrl: r
        }), console.log("用message抛出上报事件");
    });
}

function e() {
    a = h.get("Lturn"), console.log("Lturn:" + a), a ? (a += 1, console.log("Lturn+1:" + a)) : (a = Math.floor(1e3 * Math.random()), 
    console.log("create Lturn:" + a)), a > 999 && (a = 0), h.set("Lturn", a, 72e5);
}

function t(r) {
    var e = [];
    return r.item.forEach(function(r, t) {
        e.push(r);
    }), e;
}

function o(r) {
    console.log("开始检查trueview贴片状态");
    for (var e = r.length, t = [], o = 0, l = 0; l < e; l++) r[l].trueviewTurn = !1, 
    1 == r[l].order_id || "FT" == r[l].type ? t[l] = 0 : (i(r[l]) && (r[l].trueviewTurn = !0), 
    t[l] = 1, o += 1);
    n = 1 == o, console.log("trueviewCheckArr内容是：" + t + ",trueviewCount值是：" + o);
}

function i(r) {
    if (console.log("开始检查trueview开关"), r.params && void 0 != r.params && "" != r.params) {
        var e = r.params;
        if (-1 != e.indexOf("richdata=")) {
            var t = e.substr(e.indexOf("richdata=") + 9);
            -1 != t.indexOf("&") && (t = t.substr(0, t.indexOf("&"))), t = decodeURIComponent(t.replace(/\+/g, " ")), 
            console.log("转换出来的richdata参数是：" + t);
            try {
                var o = JSON.parse(t);
                if (console.log("转换成json后的对象是：" + o), o.plugins && void 0 != o.plugins && o.plugins.trueview && void 0 != o.plugins.trueview && "Y" == o.plugins.trueview) return console.log("trueview开关是打开的Y！"), 
                !0;
            } catch (r) {
                console.log("richdata解析出错！");
            }
        }
    }
    return !1;
}

function l(r) {
    O = 0;
    for (var e = 0; e < r.length; e++) 1 != r[e].order_id && (O += r[e].duration / 1e3);
    console.log("广告总时长为：" + O);
}

var n, p, a, d, s, u = require("../../../../lib-inject").request, c = require("../../../lib/message"), h = require("../../../module/cache"), g = require("./adReport"), v = require("./md5"), m = "", U = 0, f = "", D = 0, w = -1, L = 1, T = -1, O = 0, S = "", K = "", y = new c();

(module.exports = function(i) {
    console.log("ad video onLoad"), console.log(i), console.log("当前rfid:" + S), i.vid && (m = i.vid), 
    i.live && (U = i.live), i.chid && (D = i.chid), i.coverid && (f = i.coverid), i.pu && (w = i.pu), 
    i.openid && (K = i.openid), console.log("openid:" + K), d = String(v(K).substr(0, 16)).toUpperCase(), 
    console.log("appuesr:" + d), e();
    var c = {};
    return p = new Date().getTime(), u("https://livew.l.qq.com/livemsg?ty=web&ad_type=WL&pf=H5&lt=wx&pt=0&live=" + U + "&pu=" + w + "&rfid=" + S + "&openid=" + K + "&v=TencentPlayerV3.2.19.358&plugin=1.0.0&speed=0&adaptor=2&musictxt=&chid=" + D + "&st=0&resp_type=json&_t=1478361546359&rfid=&vid=" + m + "&vptag=&url=&refer=&pid=&mbid=&oid=&guid=&coverid=" + f, {
        needlogin: !0,
        header: {
            Cookie: "appuser=" + d + "; Lturn=" + a
        }
    }).then(function(r) {
        s = r, r.data.adLoc && r.data.adLoc.tpid && (L = r.data.adLoc.tpid), c = {
            t: "0",
            url: "",
            vid: m,
            coverid: f,
            pf: "H5",
            vptag: "",
            pid: "",
            chid: D,
            tpid: L
        };
        var e = new Date().getTime() - p;
        console.log("livew请求完成，进行dp3上报,时间为:" + e), g.reportDp3(2, "WL", e, 1, 100, 0, K, c), 
        p = new Date().getTime();
        var i = t(r.data.adList);
        return console.log("最终adList:" + i), o(i), l(i), i;
    }, function(r) {
        console.log("livew error，再试一次");
        var e = new Date().getTime() - p;
        return console.log("livew请求失败，进行dp3上报,时间为:" + e), g.reportDp3(2, "WL", e, 1, 202, 0, K, c), 
        p = new Date().getTime(), u("https://livew.l.qq.com/livemsg?ty=web&ad_type=WL&pf=H5&lt=wx&pt=0&live=" + U + "&pu=" + w + "&rfid=" + S + "&v=TencentPlayerV3.2.19.358&plugin=1.0.0&speed=0&adaptor=2&musictxt=&chid=" + D + "&openid=" + K + "&st=0&resp_type=json&_t=1478361546359&rfid=&vid=" + m + "&vptag=&url=&refer=&pid=&mbid=&oid=&guid=&coverid=" + f, {
            needlogin: !0,
            header: {
                Cookie: "appuser=" + d + "; Lturn=" + a
            }
        }).then(function(r) {
            s = r, r.data.adLoc && r.data.adLoc.tpid && (L = r.data.adLoc.tpid), c = {
                t: "0",
                url: "",
                vid: m,
                coverid: f,
                pf: "H5",
                vptag: "",
                pid: "",
                chid: D,
                tpid: L
            };
            var e = new Date().getTime() - p;
            console.log("livew重试请求完成，进行dp3上报,时间为:" + e), g.reportDp3(2, "WL", e, 1, 100, 0, K, c), 
            p = new Date().getTime();
            var i = t(r.data.adList);
            return console.log("最终adList:" + i), o(i), l(i), i;
        }, function(r) {
            var e = new Date().getTime() - p;
            return console.log("livew error，订单获取失败，返回空数组，进行dp3上报,时间为:" + e), g.reportDp3(2, "WL", e, 1, 202, 0, K, c), 
            p = new Date().getTime(), [];
        });
    }).then(function(e) {
        return e = e.map(function(e, t) {
            return function() {
                var t = [];
                if (e.reportUrlOther.reportitem) for (i = 0; i < e.reportUrlOther.reportitem.length; i++) t[i] = {
                    url: e.reportUrlOther.reportitem[i].url,
                    time: e.reportUrlOther.reportitem[i].reporttime,
                    isReported: !1
                };
                var o = [];
                if (e.reportUrlSDK.reportitem) for (var i = 0; i < e.reportUrlSDK.reportitem.length; i++) o[i] = {
                    url: e.reportUrlSDK.reportitem[i].url,
                    time: e.reportUrlSDK.reportitem[i].reporttime,
                    isReported: !1
                };
                return console.log("当前广告的trueview开关是否打开：" + e.trueviewTurn), console.log("当前广告是否符合trueview条件：" + n), 
                n ? (console.log("allAdDuration:" + O), T = O <= 5 ? 0 : 5) : T = -1, console.log("skipable:" + T), 
                {
                    oid: e.order_id,
                    url: e.image[0].url,
                    reportUrl: {
                        url: e.reportUrl,
                        time: e.ReportTime,
                        isReported: !1
                    },
                    reportUrlOther: t,
                    reportUrlSDK: o,
                    skipable: T,
                    duration: e.duration / 1e3,
                    allDuration: O,
                    onSkip: function() {
                        console.log("当前广告被跳过了，上报智慧点10237"), g.reportWisdomPoint(10237, e.order_id, e.order_id, "");
                        var r = new Date().getTime() - p;
                        console.log("当前广告被跳过，进行dp3上报,时间为:" + r), g.reportDp3(4, "WL", r, 1, "", 0, K, c), 
                        p = new Date().getTime();
                    },
                    onTimeupdate: function(r) {},
                    onEnd: function() {
                        var r = new Date().getTime() - p;
                        console.log("当前广告播放结束，进行dp3上报,时间为:" + r), g.reportDp3(5, "WL", r, 1, "", 0, K, c), 
                        p = new Date().getTime(), s.data.adLoc && s.data.adLoc.rfid && (S = s.data.adLoc.rfid, 
                        console.log("rfid赋值成功：" + S));
                    },
                    onStart: function() {
                        console.log("当前广告开始播放" + e), console.log("当前广告的oid是：" + this.oid);
                        var t = new Date().getTime() - p;
                        if (console.log("素材加载完成，开始播放，进行dp3上报,时间为:" + t), g.reportDp3(3, "WL", t, 1, "", 0, K, c), 
                        p = new Date().getTime(), this.reportUrl.url = g.updateUrlParam(this.reportUrl.url, c), 
                        this.reportUrl.time >= 0 && !this.reportUrl.isReported) {
                            this.reportUrl.isReported = !0;
                            try {
                                r(this.reportUrl.url);
                            } catch (r) {}
                        }
                        for (o = 0; o < this.reportUrlOther.length; o++) if (this.reportUrlOther[o].url = g.updateUrlParam(this.reportUrlOther[o].url, c), 
                        this.reportUrlOther[o].time >= 0 && !this.reportUrlOther[o].isReported) {
                            this.reportUrlOther[o].isReported = !0;
                            try {
                                g.pingUrl(this.reportUrlOther[o].url);
                            } catch (r) {}
                        }
                        for (var o = 0; o < this.reportUrlSDK.length; o++) if (this.reportUrlSDK[o].url = g.updateUrlParam(this.reportUrlSDK[o].url, c), 
                        this.reportUrlSDK[o].time >= 0 && !this.reportUrlSDK[o].isReported) {
                            this.reportUrlSDK[o].isReported = !0;
                            try {
                                g.pingUrl(this.reportUrlSDK[o].url);
                            } catch (r) {}
                        }
                    },
                    onError: function() {
                        var r = new Date().getTime() - p;
                        console.log("当前广告播放出错，进行dp3上报,时间为:" + r), g.reportDp3(4, "WL", r, 1, "", 0, K, c), 
                        p = new Date().getTime();
                    },
                    onReportEmpty: function() {
                        console.log("我是空单上报，当前广告的上报地址是：" + this.reportUrl.url), this.reportUrl.url = g.updateUrlParam(this.reportUrl.url, c);
                        try {
                            r(this.reportUrl.url);
                        } catch (r) {}
                        for (e = 0; e < this.reportUrlOther.length; e++) if (this.reportUrlOther[e].url = g.updateUrlParam(this.reportUrlOther[e].url, c), 
                        this.reportUrlOther[e].time >= 0 && !this.reportUrlOther[e].isReported) {
                            this.reportUrlOther[e].isReported = !0;
                            try {
                                g.pingUrl(this.reportUrlOther[e].url);
                            } catch (r) {}
                        }
                        for (var e = 0; e < this.reportUrlSDK.length; e++) if (this.reportUrlSDK[e].url = g.updateUrlParam(this.reportUrlSDK[e].url, c), 
                        this.reportUrlSDK[e].time >= 0 && !this.reportUrlSDK[e].isReported) {
                            this.reportUrlSDK[e].isReported = !0;
                            try {
                                g.pingUrl(this.reportUrlSDK[e].url);
                            } catch (r) {}
                        }
                    }
                };
            };
        }), {
            adList: e
        };
    }).catch(function(r) {
        return {};
    });
}).reporter = g.reporter;