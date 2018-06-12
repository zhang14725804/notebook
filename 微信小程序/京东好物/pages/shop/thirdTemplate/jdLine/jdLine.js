Component({
    options: {
        multipleSlots: !0
    },
    relations: {
        "./jdTemplate": {
            type: "parent",
            linked: function(t) {},
            linkChanged: function(t) {},
            unlinked: function(t) {}
        }
    },
    properties: {
        styles: {
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
        backgroundColor: ""
    },
    attached: function() {
        this._setSystemInfo(), this._setLayoutStyle();
    },
    methods: {
        _setSystemInfo: function() {
            var t = this;
            wx.getSystemInfo({
                success: function(i) {
                    var e = i.windowWidth / 320, a = (i.platform, i.pixelRatio);
                    t.setData({
                        winWidth: i.windowWidth,
                        winHeight: i.windowHeight,
                        winScale: e,
                        platform: i.platform,
                        pixelRatio: a
                    });
                }
            });
        },
        _setLayoutStyle: function() {
            var t = dataPool.execStr(this.properties.editProperty, this.properties.styles.width) || 0, i = dataPool.execStr(this.properties.editProperty, this.properties.styles.height) || 0;
            i > 0 && (i = i * this.data.winScale + "px"), "-1" == i && (i = ""), "-2" == i && (i = ""), 
            t > 0 && (t = t * this.data.winScale + "px"), "-1" == t && (t = i), "-2" == t && (t = i);
            var e = this.properties.styles.marginLeft || 0;
            e > 0 && (e *= this.data.winScale);
            var a = this.properties.styles.marginTop || 0;
            a > 0 && (a *= this.data.winScale);
            var s = this.properties.styles.marginRight || 0;
            s > 0 && (s *= this.data.winScale);
            var o = this.properties.styles.marginBottom || 0;
            o > 0 && (o *= this.data.winScale), this.setData({
                width: t,
                height: i,
                marginLeft: e,
                marginTop: a,
                marginRight: s,
                marginBottom: o
            });
        }
    }
});