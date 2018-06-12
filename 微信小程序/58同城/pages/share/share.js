var e = getApp(), t = void 0, a = void 0, i = void 0, o = void 0, s = void 0, n = void 0;

e.createPage([ {
    methodOptions: {},
    data: {
        pageType: "share",
        pageName: "share-renqiwang",
        params: {},
        infoTitle: "",
        canvasShow: !1,
        canvasHeight: 560
    },
    _onLoad: function(e) {
        console.log("页面参数", e), this.setData({
            infoId: e.infoId,
            dispCateName: e.dispCateName,
            dispLocalName: e.dispLocalName,
            cateCode: e.cateCode,
            params: e
        }), this.getDetail();
    },
    getTempFilePath: function(e, a) {
        wx.downloadFile({
            url: e,
            success: function(e) {
                200 === e.statusCode && (0 === a ? s = e.tempFilePath : 1 === a ? t = e.tempFilePath : 2 === a && (n = e.tempFilePath));
            }
        });
    },
    getDetail: function() {
        var t = this;
        t.getTempFilePath("https://img.58cdn.com.cn/weixin/img/wechat-app/fingerprint.png", 1), 
        wx.request({
            url: "https://wxapp.58.com/list/detail",
            data: {
                infoId: this.data.infoId,
                dispCateName: this.data.dispCateName,
                dispLocalName: this.data.dispLocalName,
                cateCode: this.data.cateCode
            },
            header: {
                "content-type": "application/json"
            },
            success: function(s) {
                if (console.log(s.data), 0 === s.data.code) {
                    var n = s.data.data;
                    a = n.title, i = n.updateDate, o = n.content, t.getTempFilePath(n.pic[0], 0), t.setData({
                        infoTitle: n.title
                    }), console.log(66, e), console.log(66, t), wx.request({
                        url: "https://wxapp.58.com/load/code",
                        data: {
                            thirdKey: wx.getStorageSync("wxThirdKey").thirdKey,
                            appCode: 0,
                            pagePath: "pages/index/index",
                            width: 128,
                            scene: JSON.stringify({
                                infoId: t.data.infoId,
                                dispCateName: t.data.dispCateName,
                                dispLocalName: t.data.dispLocalName,
                                cateCode: t.data.cateCode
                            })
                        },
                        header: {
                            "content-type": "application/json"
                        },
                        success: function(e) {
                            console.log("二维码", e), 0 === e.data.code && t.getTempFilePath("https://pic1.58cdn.com.cn" + e.data.data, 2);
                        }
                    });
                }
            }
        });
    },
    friendsCircle: function(e) {
        this.drawCanvas(a, i, o, s, n), this.setData({
            canvasShow: !0
        });
    },
    drawCanvas: function(e, a, i, o, s) {
        function n(e) {
            return c * e / 750;
        }
        var l = wx.createCanvasContext("myCanvas"), c = wx.getSystemInfoSync().windowWidth, d = wx.getSystemInfoSync().windowHeight;
        l.setFillStyle("#fff"), l.fillRect(0, 0, n(540), d), l.setFillStyle("#000"), l.setFontSize(n(32));
        var p = n(32), g = e, r = a, f = i, m = !1;
        o && (m = !0), m && this.setDataLazy({
            canvasHeight: 755
        });
        for (var h = void 0, u = 0; u < g.length / 14; u++) u < 1 && (l.fillText(g.substring(14 * u, 14 * (u + 1)), p, n(66 + 46 * u)), 
        h = 66 + 46 * u), 1 === u && (g.length / 14 > 2 ? (l.fillText(g.substring(14 * u, 14 * (u + 1) - 1) + "...", p, n(66 + 46 * u)), 
        h = 66 + 46 * u) : (l.fillText(g.substring(14 * u, 14 * (u + 1)), p, n(66 + 46 * u)), 
        h = 66 + 46 * u));
        l.setFillStyle("#999");
        var y = h + 48;
        l.setFontSize(n(24)), l.fillText(r, p, n(y));
        var w = void 0;
        l.setFillStyle("#000");
        for (var x = y + 44, v = 0; v < f.length / 19; v++) m ? (v < 2 && (l.fillText(f.substring(19 * v, 19 * (v + 1)), p, n(x + 38 * v)), 
        w = x + 38 * v), 2 === v && (f.length / 19 > 3 ? (l.fillText(f.substring(19 * v, 19 * (v + 1) - 1) + "...", p, n(x + 38 * v)), 
        w = x + 38 * v) : (l.fillText(f.substring(19 * v, 19 * (v + 1)), p, n(x + 38 * v)), 
        w = x + 38 * v))) : (v < 4 && (l.fillText(f.substring(19 * v, 19 * (v + 1)), p, n(x + 38 * v)), 
        w = x + 38 * v), 4 === v && (f.length / 19 > 5 ? (l.fillText(f.substring(19 * v, 19 * (v + 1) - 1) + "...", p, n(x + 38 * v)), 
        w = x + 38 * v) : (l.fillText(f.substring(19 * v, 19 * (v + 1)), p, n(x + 38 * v)), 
        w = x + 38 * v)));
        var I = (w = m ? 283 : 359) + 28;
        m && (l.drawImage(o, p, n(I), n(476), n(264)), I += 264), l.setStrokeStyle("#eee"), 
        l.setLineWidth(n(1)), l.beginPath(), l.rect(p, n(I), n(476), n(146)), l.stroke(), 
        l.drawImage(t, n(72), n(I + 54), n(36), n(36)), l.setFontSize(n(28)), l.setFillStyle("#FF552E"), 
        l.fillText("长按扫码查看", n(122), n(I + 82)), l.drawImage(s, n(320), n(I + 10), n(128), n(128)), 
        l.draw();
    },
    saveImage: function() {
        var e = this;
        wx.getSetting({
            success: function(t) {
                console.log("保存到相册", t.authSetting["scope.writePhotosAlbum"]), !1 === t.authSetting["scope.writePhotosAlbum"] ? wx.openSetting({
                    success: function(t) {
                        console.log("打开授权设置界面success", t), e.saveImageRealy();
                    },
                    fail: function(e) {
                        console.log("打开授权设置界面fail", e);
                    },
                    complete: function(e) {
                        console.log("打开授权设置界面complete", e);
                    }
                }) : e.saveImageRealy();
            },
            fail: function(e) {
                console.log("获取授权信息fail", e);
            },
            complete: function(e) {
                console.log("获取授权信息complete", e);
            }
        });
    },
    saveImageRealy: function() {
        var e = this;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            canvasId: "myCanvas",
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        console.log("保存成功", t), wx.showToast({
                            title: "保存成功",
                            icon: "success",
                            duration: 2e3
                        }), e.setData({
                            canvasShow: !1
                        });
                    },
                    fail: function(e) {
                        console.log("fail", e);
                    },
                    complete: function(e) {
                        console.log("complete", e);
                    }
                });
            },
            fail: function(e) {
                console.log("fail"), console.log(e);
            },
            complete: function(e) {
                console.log("complete"), console.log(e);
            }
        });
    },
    onShareAppMessage: function(t) {
        var a = this.data.params, i = a.infoId, o = a.dispCateName, s = a.dispLocalName, n = a.cateCode, l = a.cateId, c = a.cityId, d = a.localId, p = (a.infoTitle, 
        a.key, wx.getStorageSync("wxCityKey"));
        return console.log("/pages/index/index?pagetype=detail&infoId=" + i + "&dispCateName=" + o + "&dispLocalName=" + s + "&cateCode=" + n + "&cateId=" + l + "&cityId=" + c + "&localId=" + d + "&cityName=" + p.cityName + "&dispCityId=" + p.dispCityId + "&key=&from=renqiwang_wx"), 
        {
            title: this.data.infoTitle,
            desc: "",
            path: "/pages/index/index?pagetype=detail&infoId=" + i + "&dispCateName=" + o + "&dispLocalName=" + s + "&cateCode=" + n + "&cateId=" + l + "&cityId=" + c + "&localId=" + d + "&cityName=" + p.cityName + "&dispCityId=" + p.dispCityId + "&key=&from=renqiwang_wx",
            success: function(t) {
                console.log("转发成功"), console.log(e.pathData.log.click), e.doLogClick({
                    pageType: "share",
                    pageName: "share-renqiwang",
                    clickType: "share",
                    clickName: "share-renqiwang",
                    infoId: i,
                    dispCateName: o,
                    dispLocalName: s,
                    cateCode: n,
                    cateId: l,
                    cityId: c,
                    localId: d
                });
            }
        };
    }
} ]);