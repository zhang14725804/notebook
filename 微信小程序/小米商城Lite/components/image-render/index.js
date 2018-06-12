Component({
    properties: {
        renderData: Object,
        viewId: {
            type: String,
            value: "viewCanvas"
        }
    },
    data: {
        realWidth: 0,
        realHeight: 0,
        ratio: 0,
        canvasWidth: 0,
        canvasHeight: 0
    },
    ready: function() {
        this.init();
    },
    methods: {
        init: function() {
            var t = this.data.renderData.background ? this.data.renderData.background.width : "1080", a = this.data.renderData.background ? this.data.renderData.background.height : "1080", i = this.data.renderData.boxWidth / t;
            this.setData({
                realWidth: t,
                realHeight: a,
                ratio: i,
                canvasWidth: this.data.renderData.boxWidth,
                canvasHeight: a * i
            }), this.drawCanvas();
        },
        drawCanvas: function() {
            var t = this, a = this, i = wx.createCanvasContext(this.data.viewId, this), e = wx.createCanvasContext("realCanvas", this);
            wx.showLoading({
                mask: !0
            });
            var n = [];
            n.push(this.downloadFile(a.data.renderData.background)), a.data.renderData.tiles.forEach(function(a) {
                n.push(t.downloadFile(a));
            }), Promise.all(n).then(function(t) {
                t.forEach(function(t) {
                    a.drawImage(i, t.source, t.x, t.y, t.width, t.height), a.drawImage(e, t.source, t.x, t.y, t.width, t.height, !0);
                }), a.data.renderData.texts.forEach(function(t) {
                    a.fillText(i, t), a.fillText(e, t, !0);
                }), wx.hideLoading();
            }).catch(function(t) {
                wx.showToast({
                    title: "加载失败",
                    icon: "none",
                    duration: 2e3
                });
            });
        },
        downloadFile: function(t) {
            return new Promise(function(a, i) {
                wx.downloadFile({
                    url: t.img,
                    success: function(i) {
                        t.source = i.tempFilePath, a(t);
                    },
                    fail: function(t) {
                        i(t);
                    }
                });
            });
        },
        drawImage: function(t, a, i, e, n, o, s) {
            t.drawImage(a, i * (s ? 1 : this.data.ratio), e * (s ? 1 : this.data.ratio), n * (s ? 1 : this.data.ratio), o * (s ? 1 : this.data.ratio)), 
            t.draw(!0);
        },
        fillText: function(t, a, i) {
            t.setFontSize(a.size * (i ? 1 : this.data.ratio)), t.setFillStyle(a.color), t.setTextAlign(a.align), 
            t.fillText(a.text, a.x * (i ? 1 : this.data.ratio), a.y * (i ? 1 : this.data.ratio)), 
            t.draw(!0);
        },
        saveFile: function() {
            var t = this;
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: t.data.realWidth,
                height: t.data.realHeight,
                destWidth: t.data.realWidth,
                destHeight: t.data.realHeight,
                canvasId: "realCanvas",
                quality: .75,
                success: function(t) {
                    var a = t.tempFilePath;
                    console.log(a), wx.saveImageToPhotosAlbum({
                        filePath: a,
                        success: function(t) {
                            wx.showToast({
                                title: "保存成功",
                                icon: "success",
                                duration: 2e3
                            });
                        },
                        fail: function(t) {
                            console.log(t), wx.showToast({
                                title: "保存失败",
                                icon: "none",
                                duration: 2e3
                            });
                        }
                    });
                },
                fail: function(t) {
                    console.log(t), wx.showToast({
                        title: "保存失败",
                        icon: "none",
                        duration: 2e3
                    });
                }
            }, this);
        }
    }
});