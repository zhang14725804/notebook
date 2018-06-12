require("../../../util/conf.js");

var t = require("../../../util/util.js"), e = require("../../../util/tracker.js"), n = getApp();

Page({
    data: {
        showCanvasDraft: !0,
        drawFinished: !1,
        canvasWid: 300
    },
    canvasHeight: 0,
    onLoad: function(t) {},
    onReady: function() {},
    shareInfo: {},
    onShow: function() {
        var t = this;
        this.shareInfo = wx.getStorageSync("sharePicInfo"), console.log(this.shareInfo), 
        n.getUserInfo(function(e) {
            t.getSystemInfo().then(function(n) {
                t.setData({
                    canvasWid: 580 * n.windowWidth / 750
                }), t.init(e, n);
            });
        }), e.push();
    },
    getSystemInfo: function() {
        return new Promise(function(t, e) {
            wx.getSystemInfo({
                success: function(e) {
                    t(e);
                }
            });
        });
    },
    init: function(e, n) {
        var i = this, o = this, a = n.pixelRatio, r = o.formatImgUrl(o.shareInfo.user_avatar || e.avatarUrl) || "";
        console.log(r);
        var l = o.formatImgUrl(o.shareInfo.img_url) || "", s = o.formatImgUrl(o.shareInfo.qr_url) || "", c = 0, f = [ {
            text: o.shareInfo.guide_title,
            lineHeight: 26,
            fontSize: 18,
            lineWordTotal: 15,
            color: "#282828",
            marginBottom: 8,
            multiLine: !0,
            algin: "center"
        } ], h = function(t, e, n, i) {
            t.setFontSize(i.size || 12), t.setFillStyle(i.color || "#000000"), t.setTextAlign(i.algin || "left"), 
            t.fillText(e, n.x, n.y);
        };
        t.showLoading(), Promise.all([ o.getImgInfo(l), o.getImgInfo(s), o.getImgInfo("https://i8.mifile.cn/webfile/h5/weixin/0314/footer.png"), o.getPriceImg(a), o.getImgInfo("https://i8.mifile.cn/webfile/h5/weixin/0317/redpack.png"), o.getImgInfo(r) ]).then(function(e) {
            console.log(e);
            var n = wx.createCanvasContext("canvasMain");
            Math.floor(290 / (e[0].width / a) * 100);
            n.setFillStyle("#ccc");
            n.fillRect(0, 0, 290, 500), n.setFillStyle("#fff");
            n.fillRect(20, 80, 250, 420), c += 135, n.save(), n.beginPath(), n.arc(145, 80, 25, 0, 2 * Math.PI), 
            n.setStrokeStyle("#f8e19a"), n.clip(), n.drawImage(e[5].path, 120, 55, 50, 50), 
            n.stroke(), n.closePath(), n.restore(), f.forEach(function(t) {
                t.multiLine && o.getTextLines(t.text, t.lineWordTotal).forEach(function(e) {
                    "a" !== e && (h(n, e, {
                        x: "center" === t.algin ? 145 : 20,
                        y: c
                    }, {
                        color: t.color,
                        size: t.fontSize,
                        algin: t.algin
                    }), c += t.lineHeight);
                }), c += t.marginBottom;
            });
            var r = 114.84 * e[0].height / e[0].width;
            n.drawImage(e[0].path, 87.58, c, 114.84, r), c += r + 30, [ {
                text: o.shareInfo.project_desc,
                lineHeight: 18,
                fontSize: 12,
                lineWordTotal: 28,
                color: "#878787",
                marginBottom: 0,
                multiLine: !0,
                algin: "center"
            } ].forEach(function(t) {
                t.multiLine && o.getTextLines(t.text, t.lineWordTotal).forEach(function(e) {
                    "a" !== e && (h(n, e, {
                        x: "center" === t.algin ? 145 : 20,
                        y: c
                    }, {
                        color: t.color,
                        size: t.fontSize,
                        algin: t.algin
                    }), c += t.lineHeight);
                }), c += t.marginBottom;
            }), c += 30, n.drawImage(e[3].path, (290 - e[3].width / a) / 2, c, e[3].width / a, e[3].height / a), 
            c += e[3].height / a + 10, n.setFillStyle("#ffffff"), n.fillRect(20, c, 250, c + 30);
            n.drawImage(e[1].path, 20, c, 70, 70), n.drawImage(e[2].path, 102, c + 17, 148, 148 * e[2].height / e[2].width), 
            i.canvasHeight = c + 148 * e[2].height / e[2].width + 30, n.setFillStyle("#ccc"), 
            n.fillRect(0, i.canvasHeight + 30, 290, 500 - i.canvasHeight + 30), n.stroke(), 
            n.draw(!1, function() {
                t.hideLoading(), o.setData({
                    drawFinished: !0
                });
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    getPriceImg: function(t) {
        var e = this, n = wx.createCanvasContext("canvasDraft"), i = [ {
            text: "¥",
            fontSize: 14,
            color: "#fa6304",
            marginRight: 3
        }, {
            text: e.shareInfo.group_price,
            fontSize: 18,
            color: "#fa6304",
            marginRight: 10
        }, {
            text: e.shareInfo.shipment ? "" : "(包邮)",
            fontSize: 12,
            color: "#fa6304",
            marginRight: 10
        }, {
            text: e.shareInfo.market_price,
            fontSize: 12,
            color: "#9f9f9f",
            marginRight: 10
        } ], o = 0, a = function(t, e, n, i) {
            t.setTextBaseline(), t.setFontSize(i.size || 12), t.setFillStyle(i.color || "#ffe4b6"), 
            t.setTextAlign(i.algin || "left"), t.fillText(e, n.x, n.y);
        };
        return new Promise(function(t, r) {
            i.forEach(function(t, e) {
                a(n, t.text, {
                    x: o,
                    y: 20
                }, {
                    color: t.color,
                    size: t.fontSize,
                    fontFamily: "Avenir"
                }), 3 === e && (n.beginPath(), n.moveTo(o, 20 - t.fontSize / 2 + 2), n.lineTo(o + n.measureText(t.text).width, 20 - t.fontSize / 2 + 2), 
                n.setStrokeStyle("#aaaaaa"), n.stroke(), n.closePath()), o += n.measureText(t.text).width + t.marginRight;
            }), n.stroke(), n.draw(!1, function() {
                e.setData({
                    showCanvasDraft: !1
                }), wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: o,
                    height: 30,
                    canvasId: "canvasDraft",
                    success: function(n) {
                        e.getImgInfo(n.tempFilePath).then(function(e) {
                            t(e);
                        });
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                });
            });
        });
    },
    getImgInfo: function(t) {
        return new Promise(function(e, n) {
            wx.getImageInfo({
                src: t,
                success: function(t) {
                    e(t);
                }
            });
        });
    },
    getTextLines: function(t, e) {
        var n = 0, i = "", o = [], a = !0, r = !1, l = void 0;
        try {
            for (var s, c = t[Symbol.iterator](); !(a = (s = c.next()).done); a = !0) {
                var f = s.value;
                "\n" === f ? (o.push(i), o.push("a"), n = 0, i = "") : n === e ? (o.push(i), n = 1, 
                i = f) : (i += f, n += 1);
            }
        } catch (t) {
            r = !0, l = t;
        } finally {
            try {
                !a && c.return && c.return();
            } finally {
                if (r) throw l;
            }
        }
        return o.push(i), o;
    },
    saveImg: function(t) {
        var e = this;
        e.data.drawFinished && wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 600,
            height: e.canvasHeight + 30,
            canvasId: "canvasMain",
            success: function(t) {
                console.log(t), wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.showToast({
                            title: "保存成功"
                        });
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                });
            }
        });
    },
    formatImgUrl: function(t) {
        if (t) {
            var e = t.replace(/https?:/, "");
            return e = "https:" + e;
        }
    }
});