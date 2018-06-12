var e = function() {
    function e(e, t) {
        var a = [], i = !0, r = !1, n = void 0;
        try {
            for (var s, o = e[Symbol.iterator](); !(i = (s = o.next()).done) && (a.push(s.value), 
            !t || a.length !== t); i = !0) ;
        } catch (e) {
            r = !0, n = e;
        } finally {
            try {
                !i && o.return && o.return();
            } finally {
                if (r) throw n;
            }
        }
        return a;
    }
    return function(t, a) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), t = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
    return t.default = e, t;
}(require("../../../../api/Ptag/Ptag_constants.js")), a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../api/Ptag/Ptag_utils.js")), i = require("../../../../bases/component"), r = require("../../../../libs/promise.min.js"), n = require("../../constant.js").TITLE_ICONS, s = "https://img10.360buyimg.com/jdphoto/s26x26_jfs/t18565/303/2499380355/407/3ae7cd7f/5af8f737Nb8b5c33f.png", o = "https://img10.360buyimg.com/jdphoto/s58x28_jfs/t9451/359/415622649/15318/b0943e5d/59a78495N3bd2a9f8.png", l = function(e, t) {
    e = e.split("."), t = t.split(".");
    for (var a = Math.max(e.length, t.length); e.length < a; ) e.push("0");
    for (;t.length < a; ) t.push("0");
    for (var i = 0; i < a; i++) {
        var r = parseInt(e[i]), n = parseInt(t[i]);
        if (r > n) return 1;
        if (r < n) return -1;
    }
    return 0;
}(getApp().systemInfo.SDKVersion, "1.9.90") >= 0;

new i({
    properties: {
        shareOptions: {
            type: Object
        },
        showShareLayerFlag: {
            type: Boolean,
            value: !0
        },
        showShareDetailFlag: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        previewImgUrl: "",
        isFirstTimeSave: !0,
        iconPlusUrl: o,
        iconCheckUrl: s,
        firstFlagUrl: "",
        ctx: ""
    },
    ready: function() {
        this.data.ctx = wx.createCanvasContext("preview-canvas", this);
    },
    methods: {
        closeShareLayer: function() {
            a.default.addPtag(t.DETAIL_SHARE_LAYER_CLOSE), this.closeShareDetail(), this.triggerEvent("closeShareLayer");
        },
        showShareDetail: function() {
            a.default.addPtag(t.DETAIL_SHARE_TO_TIMELINE), this.setData({
                showShareDetailFlag: !0
            }), this.data.previewImgUrl || this.initPreviewImage();
        },
        closeShareDetail: function() {
            this.data.showShareDetailFlag && a.default.addPtag(t.DETAIL_SHARE_DETAIL_LAYER_CLOSE), 
            this.setData({
                showShareDetailFlag: !1
            });
        },
        initPreviewImage: function() {
            var i = this, l = this.data.shareOptions.flags, h = this.data.shareOptions, d = h.sku, c = h.cover, u = /\/\/(\w+).360buyimg/;
            c.replace(u, function(e, t, a, i) {
                return c = i.replace(t, "img10").replace(/^(https?:)?\/\//i, "https://"), i.replace(t, "img10");
            }), d && (d = ("" + d).trim()), wx.showLoading({
                title: "图片生成中...",
                mask: !0
            });
            var f = [ this.loadWXACode(d), this.loadImageByUrl("https://img10.360buyimg.com/jdphoto/s750x1334_jfs/t22354/232/114532317/14383/e223f44d/5afce758Nbf32f260.jpg"), this.loadImageByUrl(c), this.loadImageByUrl(s), this.loadImageByUrl(o) ];
            if (l && l.length) {
                var g = n[l[0]];
                f.push(this.loadImageByUrl(g.url));
            }
            r.all(f).then(function(r) {
                var n = e(r, 6), s = n[0], o = n[1], l = n[2], h = n[3], d = n[4], c = n[5];
                s && o && l && h && d ? (i.setData({
                    iconCheckUrl: h,
                    iconPlusUrl: d,
                    firstFlagUrl: c || ""
                }), i.renderPreviewImage(o, s, l, c, function() {
                    wx.hideLoading(), a.default.addPtag(t.DETAIL_SHARE_PIC_SUCCESS);
                })) : (wx.hideLoading(), wx.showToast({
                    title: "图片生成失败",
                    icon: "none"
                }), i.closeShareLayer(), a.default.addPtag(t.DETAIL_SHARE_PIC_FAIL));
            });
        },
        loadImageByUrl: function(e) {
            return new r(function(t, a) {
                wx.downloadFile({
                    url: e,
                    success: function(e) {
                        t(200 === e.statusCode ? e.tempFilePath : "");
                    },
                    fail: function(e) {
                        t("");
                    }
                });
            });
        },
        loadWXACode: function(e) {
            var t = "https://wq.jd.com/bases/wxapi/getwxacode?scene=" + encodeURIComponent("sku=" + e + "&share=1") + "&page=pages/item/detail/detail&width=280";
            return new r(function(e, a) {
                wx.downloadFile({
                    url: t,
                    success: function(t) {
                        e(200 === t.statusCode ? t.tempFilePath : "");
                    },
                    fail: function(t) {
                        e("");
                    }
                });
            });
        },
        renderPreviewImage: function(e, t, a, i, r) {
            var n = this.data.ctx, s = this.data.shareOptions, o = s.name, h = s.price, d = s.flags, c = 30;
            n.drawImage(e, 0, 0, 750, 1334), d && d.length && (c = this.renderSKUFlags(d, c), 
            c += 10), this.renderSKUName(o, c, 750 - c - 30), this.renderPrice(h), l && this.renderPromiseItems(), 
            n.drawImage(a, 0, 254, 750, 750), this.renderWXACode(t), n.draw(!1, function() {
                this.printCanvas(r);
            }.bind(this));
        },
        printCanvas: function(e) {
            wx.canvasToTempFilePath({
                canvasId: "preview-canvas",
                complete: function(t) {
                    e && e(), this.setData({
                        previewImgUrl: t.tempFilePath
                    });
                }.bind(this)
            }, this);
        },
        doPreviewImage: function() {
            var e = this.data.previewImgUrl;
            e && wx.previewImage({
                urls: [ e ]
            });
        },
        doSaveImage: function() {
            var e = this.data.previewImgUrl;
            e && (a.default.addPtag(t.DETAIL_SHARE_BTN_SAVE), wx.saveImageToPhotosAlbum({
                filePath: e,
                success: function() {
                    wx.showToast({
                        title: "已保存到相册",
                        icon: "none"
                    }), this.closeShareLayer(), a.default.addPtag(t.DEATIL_SHARE_SAVE_SUCCESS);
                }.bind(this),
                fail: function() {
                    if (this.data.isFirstTimeSave) return wx.showToast({
                        title: "图片保存失败",
                        icon: "none"
                    }), void this.setData({
                        isFirstTimeSave: !1
                    });
                    wx.openSetting({
                        success: function(e) {
                            e.authSetting["scope.writePhotosAlbum"] || wx.showToast({
                                title: "请点击保存图片并开启保存到相册权限",
                                icon: "none",
                                duration: 3e3
                            });
                        },
                        fail: function() {
                            wx.showToast({
                                title: "图片保存失败",
                                icon: "none"
                            });
                        }
                    });
                }.bind(this)
            }));
        },
        renderSKUFlags: function(e, t) {
            var a = this.data.ctx, i = t;
            if (e && e.length) {
                var r = n[e[0]];
                a.drawImage(this.data.firstFlagUrl, i, 95, r.width, r.height), i += r.width;
            }
            return i;
        },
        renderSKUName: function(e, t, a) {
            var i = this.data.ctx, r = Math.floor(a / 32), n = "", s = 0;
            if (i.setFillStyle("#333333"), i.setFontSize(32), i.setTextAlign("left"), i.setTextBaseline("middle"), 
            l) {
                if (i.measureText(e).width > a) {
                    for (;s <= a - 64; ) n = e.slice(0, r), s = i.measureText(n).width, r++;
                    e = n + "...";
                }
            } else e = (n = e.slice(0, r - 1)) + "...";
            i.fillText(e, t, 110);
        },
        renderPrice: function(e) {
            var t = this.data.ctx, a = 30, i = e[0], r = e[1] || {}, n = [];
            n = Number.isNaN(parseFloat(e[0])) ? [ e[0] ] : Number(e[0]).toFixed(2).split("."), 
            t.setFillStyle("#E93B3D"), t.setFontSize(32), t.setTextAlign("left"), t.setTextBaseline("normal"), 
            t.fillText("¥", a, 180, 32), a += 32, l ? (t.setFontSize(44), t.fillText(n[0], a, 180), 
            a += t.measureText(n[0]).width, a += 2, n[1] && (t.setFontSize(32), t.fillText("." + n[1], a, 180), 
            a += t.measureText("." + n[1]).width, a += 10), "plus" === r.type && (t.setFontSize(32), 
            t.setFillStyle("#333333"), t.fillText("¥" + r.price, a, 180), a += t.measureText("¥" + r.price).width, 
            a += 8, t.drawImage(this.data.iconPlusUrl, a, 156, 58, 28))) : (t.setFontSize(44), 
            t.fillText(i, a, 180));
        },
        renderPromiseItems: function() {
            var e = this.data.ctx, t = 0, a = [];
            if (this.data.shareOptions.service.forEach(function(e) {
                e.iconState && a.push(e.name);
            }), (a = a.slice(0, 3)).length) {
                e.setFillStyle("#999999"), e.setFontSize(20), e.setTextAlign("left"), e.setTextBaseline("top");
                for (var i = 0; i < a.length; i++) {
                    var r = t + 24, n = r + 10 + 26, s = n + e.measureText(a[i]).width;
                    s <= 720 && (e.drawImage(this.data.iconCheckUrl, r, 210, 26, 26), e.fillText(a[i], n, 210), 
                    t = s);
                }
            }
        },
        renderWXACode: function(e) {
            this.data.ctx.drawImage(e, 90, 1024, 280, 280);
        }
    }
});