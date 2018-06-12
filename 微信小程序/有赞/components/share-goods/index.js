!function(e) {
    function t(n) {
        if (i[n]) return i[n].exports;
        var a = global.installedModules[n] = i[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(a.exports, a, a.exports, t), a.l = !0, a.exports;
    }
    e = Object.assign(require("../../commons.js").modules, e);
    var i = {};
    i = global.installedModules = global.installedModules || {}, t.m = e, t.c = i, t.d = function(e, i, n) {
        t.o(e, i) || Object.defineProperty(e, i, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var i = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(i, "a", i), i;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 95);
}({
    95: function(e, t, i) {
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        function a(e) {
            return new Promise(function(t, i) {
                wx.downloadFile({
                    url: e,
                    success: function(e) {
                        t(e.tempFilePath);
                    },
                    fail: function(e) {
                        i(e);
                    }
                });
            });
        }
        var l = n(i(18)), o = n(i(9)), s = i(4);
        getApp(), Component({
            properties: {
                show: {
                    type: Boolean,
                    value: !1,
                    observer: "handleShowChange"
                },
                canvasId: {
                    type: String,
                    value: "drawerImage"
                },
                title: {
                    type: String,
                    value: ""
                },
                alias: {
                    type: String,
                    value: ""
                },
                goodsImage: {
                    type: String,
                    value: ""
                },
                originPrice: {
                    type: String,
                    value: ""
                },
                price: {
                    type: String,
                    value: ""
                },
                showPrice: {
                    type: String,
                    value: ""
                },
                minPrice: {
                    type: String,
                    value: ""
                },
                type: {
                    type: String,
                    value: ""
                },
                joinNum: {
                    type: Number,
                    value: 0
                }
            },
            data: {
                showModal: !1,
                showCanvas: !1,
                img: "",
                src: "",
                weappCode: ""
            },
            methods: {
                handleShowChange: function(e) {
                    e && (wx.showLoading({
                        title: "正在生成"
                    }), this.setData({
                        showCanvas: !0
                    }, this.draw.bind(this)));
                },
                draw: function() {
                    var e = this;
                    this.loadGoodsImage().then(this.drawQrCode.bind(this)).then(this.createTempPath.bind(this)).then(function(t) {
                        e.setData({
                            showModal: !0,
                            src: t
                        }, function() {
                            e.triggerEvent("success");
                        });
                    }).catch(function(t) {
                        wx.showToast({
                            title: "生成图片路径失败",
                            icon: "none"
                        }), e.triggerEvent("failed", {
                            err: t
                        });
                    }).then(function() {
                        e.setData({
                            showCanvas: !1
                        }), e.triggerEvent("finished");
                    });
                },
                drawQrCode: function() {
                    var e, t, i, n, l = this;
                    return this.data.weappCode ? Promise.resolve() : this.data.alias ? (e = this.data.alias, 
                    t = "seckill" === this.data.type, i = getApp(), n = i.globalData.isYouzanApp ? 40419900 : i.getKdtId(), 
                    new Promise(function(a, l) {
                        var r = s.getDCPS(), c = o.default.add("pages/goods/" + (t ? "seckill" : "detail") + "/index", {
                            alias: e,
                            dc_ps: r,
                            kdt_id: i.getKdtId(),
                            offlineId: i.getOfflineId() || ""
                        });
                        c = encodeURIComponent(c), i.carmen({
                            api: "youzan.shop.weapp/1.0.0/qrcode",
                            config: {
                                skipKdtId: !0
                            },
                            query: {
                                path: c,
                                kdt_id: n
                            },
                            success: function(e) {
                                var t = e.attachment_url || "";
                                "string" == typeof t && (t = t.replace(/^http:/, "https:")), a(t);
                            },
                            fail: function() {
                                l();
                            }
                        });
                    })).then(a).then(function(e) {
                        l.setData({
                            weappCode: e
                        }), l.drawShareImage(e);
                    }) : Promise.reject();
                },
                createTempPath: function() {
                    var e = this;
                    return new Promise(function(t, i) {
                        setTimeout(function() {
                            wx.canvasToTempFilePath({
                                canvasId: e.data.canvasId,
                                success: function(e) {
                                    t(e.tempFilePath);
                                },
                                fail: i,
                                complete: function() {
                                    wx.hideLoading(), e.setData({
                                        show: !1
                                    });
                                }
                            }, e);
                        }, 100);
                    });
                },
                loadGoodsImage: function() {
                    var e = this;
                    return this.data.img ? Promise.resolve() : this.data.goodsImage ? new Promise(function(t, i) {
                        a(e.data.goodsImage).then(function(i) {
                            e.setData({
                                img: i
                            }, t);
                        }).catch(function(e) {
                            e && wx.showToast({
                                title: "生成卡片失败:",
                                icon: "none",
                                duration: 2e3
                            }), i();
                        });
                    }) : Promise.reject();
                },
                drawShareImage: function(e) {
                    var t = this.data.img, i = wx.createCanvasContext(this.data.canvasId, this);
                    i.setFillStyle("white"), i.fillRect(0, 0, 375, 441), i.setFillStyle("#F8F8F8"), 
                    i.fillRect(0, 441, 375, 568), i.drawImage(t, 15, 15, 345, 345), i.setFontSize(18), 
                    i.setFillStyle("#333333");
                    var n = this.data.title, a = "";
                    n.length > 23 && (a = n.slice(23), n = n.slice(0, 23)), a.length >= 23 && (a = a.slice(0, 22) + "..."), 
                    i.fillText(n, 15, 400), i.fillText(a, 15, 425), i.setFontSize(9), i.setFillStyle("#9B9B9B"), 
                    i.fillText("扫描或长按小程序码", 279, 542), i.setFontSize(12), i.setFillStyle("#9B9B9B");
                    var l = this.data, o = l.showPrice, s = l.originPrice, r = l.price, c = l.joinNum, d = l.minPrice;
                    switch (this.data.type) {
                      case "seckill":
                        i.setFillStyle("#FF4444"), i.fillRect(15, 457, 50, 20), i.setFillStyle("#FFFFFF"), 
                        i.fillText("秒杀价", 21, 472), i.setFillStyle("#FF4444"), i.fillText("￥", 15, 520), 
                        i.setFontSize(28), i.fillText(o, 30, 520), i.setFontSize(14), i.setFillStyle("#9B9B9B"), 
                        i.fillText("活动结束价: ￥" + s, 15, 542), i.fillRect(96, 536, 8 * String(s).length + 8, 1);
                        break;

                      case "groupOn":
                        i.setFillStyle("#FF4444"), i.fillRect(15, 457, 60 + 7 * String(c).length, 20), i.setFillStyle("#FFFFFF"), 
                        i.fillText(c + "人拼团价", 21, 472), i.setFillStyle("#FF4444"), i.fillText("￥", 15, 520), 
                        i.setFontSize(28), i.fillText(o, 30, 520), i.setFontSize(14), i.setFillStyle("#9B9B9B"), 
                        i.fillText("单买价: ￥" + s, 15, 542);
                        break;

                      case "timelimitedDiscount":
                        i.lineJoin = "round", i.setFillStyle("#FF4444"), i.fillRect(15, 457, 72, 20), i.setFontSize(12), 
                        i.setFillStyle("#FFFFFF"), i.fillText("限时折扣价", 21, 472), i.setFillStyle("#FF4444"), 
                        i.setFontSize(14), i.fillText("￥", 15, 520), i.setFontSize(28), i.fillText(o, 30, 520), 
                        i.setFontSize(14), i.setFillStyle("#9B9B9B"), i.fillText("活动结束价: ￥" + s, 15, 542);
                        break;

                      default:
                        o || (o = d || r), i.setFillStyle("#FF4444"), i.fillText("￥", 15, 502), i.setFontSize(28), 
                        i.fillText(o, 30, 502), s && o !== s && (i.setFontSize(14), i.setFillStyle("#9B9B9B"), 
                        i.fillText("￥" + s, 15, 524), i.fillRect(15, 518, 9 * s.length + 6, 1));
                    }
                    e && i.drawImage(e, 285, 457, 70, 70), i.setStrokeStyle("#9B9B9B"), i.moveTo(284, 462), 
                    i.lineTo(284, 456), i.lineTo(290, 456), i.moveTo(350, 456), i.lineTo(356, 456), 
                    i.lineTo(356, 462), i.moveTo(356, 522), i.lineTo(356, 528), i.lineTo(350, 528), 
                    i.moveTo(284, 522), i.lineTo(284, 528), i.lineTo(290, 528), i.stroke(), i.draw(), 
                    this.triggerEvent(e ? "created" : "inited", {
                        canvasId: this.data.canvasId
                    });
                },
                closeShareImageModal: function() {
                    this.setData({
                        showModal: !1
                    });
                },
                clickSaveImage: function() {
                    var e = this, t = this.data.src;
                    t && (wx.showLoading({
                        title: "保存中"
                    }), (0, l.default)("scope.writePhotosAlbum").then(function() {
                        e.saveShareImage(t).then(function() {
                            wx.hideLoading(), wx.showToast({
                                title: "保存成功",
                                icon: "success",
                                duration: 2e3
                            }), e.closeShareImageModal(), e.triggerEvent("saved");
                        }).catch(function() {
                            wx.hideLoading(), wx.showToast({
                                title: "保存失败",
                                icon: "none",
                                duration: 2e3
                            });
                        });
                    }).catch(function() {
                        wx.hideLoading(), wx.showToast({
                            title: "请允许访问相册后重试",
                            icon: "none",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.openSetting({
                                success: function(t) {
                                    t.authSetting["scope.writePhotosAlbum"] && e.clickSaveImage();
                                }
                            });
                        }, 1e3);
                    }).catch(function(e) {
                        console.log(e);
                    }));
                },
                saveShareImage: function(e) {
                    return new Promise(function(t, i) {
                        wx.saveImageToPhotosAlbum({
                            filePath: e,
                            success: t,
                            fail: i
                        });
                    });
                }
            }
        });
    }
});