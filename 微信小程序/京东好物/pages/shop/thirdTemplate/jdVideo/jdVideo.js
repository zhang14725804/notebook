var t = require("../utils/dataPool.js");

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        styles: {
            type: Object,
            value: ""
        },
        urlRefer: {
            type: String,
            value: ""
        },
        editProperty: {
            type: Object,
            value: ""
        }
    },
    data: {
        width: "",
        height: "",
        marginLeft: "",
        marginRight: "",
        marginTop: "",
        marginBottom: "",
        winWidth: "",
        winHeight: "",
        winScale: "",
        platform: "",
        pixelRatio: "",
        backgroundColor: "",
        videoUrl: ""
    },
    attached: function() {
        this._setSystemInfo(), this._setLayoutStyle(), this._getVideoData();
    },
    methods: {
        _setSystemInfo: function() {
            var t = this;
            wx.getSystemInfo({
                success: function(e) {
                    var i = e.windowWidth / 320, a = (e.platform, e.pixelRatio);
                    t.setData({
                        winWidth: e.windowWidth,
                        winHeight: e.windowHeight,
                        winScale: i,
                        platform: e.platform,
                        pixelRatio: a
                    });
                }
            });
        },
        _setLayoutStyle: function() {
            var e = t.execStr(this.properties.editProperty, this.properties.styles.width) || 0;
            e > 0 && (p = e * this.data.winScale / 2, e = e * this.data.winScale + "px"), "-1" == e && (p = 0, 
            e = "-1"), "-2" == e && (p = 0, e = "100%");
            var i = this.properties.editProperty, a = this.properties.styles.height, r = t.execStr(i, a) || 0;
            r > 0 && (p = p < r * this.data.winScale / 2 ? p : r * this.data.winScale, r = r * this.data.winScale + "px"), 
            "-1" == r && (p = 0, r = "-1"), "-2" == r && (p = 0, r = "-1");
            var s = this.properties.styles.marginLeft || 0;
            s > 0 && (s *= this.data.winScale);
            var o = this.properties.styles.marginTop || 0;
            o > 0 && (o *= this.data.winScale);
            var n = this.properties.styles.marginRight || 0;
            n > 0 && (n *= this.data.winScale);
            var h = this.properties.styles.marginBottom || 0;
            h > 0 && (h *= this.data.winScale);
            var p = r;
            this.setData({
                width: e,
                height: r,
                marginLeft: s,
                marginTop: o,
                marginRight: n,
                marginBottom: h,
                backgroundColor: "green"
            });
        },
        _getVideoData: function() {
            var e = t.execStr(this.properties.editProperty, this.properties.urlRefer);
            this.setData({
                videoUrl: e
            });
        }
    }
});