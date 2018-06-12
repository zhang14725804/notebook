var t = require("../utils/dataPool.js");

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
        },
        urlRefer: {
            type: String,
            value: ""
        },
        editProperty: {
            type: Object,
            value: ""
        },
        source: {
            type: String,
            value: ""
        },
        isAbsolute: {
            type: Object,
            value: ""
        },
        events: {
            type: Object,
            value: ""
        },
        dataMap: {
            type: Object,
            value: ""
        }
    },
    data: {
        isCircle: "",
        radius: "",
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
        url: null,
        imageUrl: "",
        sourceData: null,
        positionAsFather: "",
        eventParam: ""
    },
    attached: function() {
        this._setSystemInfo(), this._setLayoutStyle(), this._getImageData(), this._getSourceData(), 
        this.properties.events && this._getEvent();
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
            e > 0 && (h = e * this.data.winScale / 2, e = e * this.data.winScale + "px"), "-1" == e && (h = 0, 
            e = "100%"), "-2" == e && (h = 0, e = "100%");
            var i = this.properties.editProperty, a = this.properties.styles.height, r = t.execStr(i, a) || 0;
            r > 0 && (h = h < r * this.data.winScale / 2 ? h : r * this.data.winScale, r = r * this.data.winScale + "px"), 
            "-1" == r && (h = 0, r = "100%"), "-2" == r && (h = 0, r = "100%");
            var s = this.properties.styles.marginLeft || 0;
            s > 0 && (s *= this.data.winScale);
            var o = this.properties.styles.marginTop || 0;
            o > 0 && (o *= this.data.winScale);
            var p = this.properties.styles.marginRight || 0;
            p > 0 && (p *= this.data.winScale);
            var n = this.properties.styles.marginBottom || 0;
            n > 0 && (n *= this.data.winScale);
            var h = r, l = "static";
            this.properties.isAbsolute && this.properties.isAbsolute.layout && (l = this.properties.isAbsolute.layout), 
            this.setData({
                width: e,
                height: r,
                marginLeft: s,
                marginTop: o,
                marginRight: p,
                marginBottom: n,
                backgroundColor: "green",
                radius: h,
                positionAsFather: l
            });
        },
        _getImageData: function() {
            var e = t.execStr(this.properties.editProperty, this.properties.urlRefer);
            if (this.properties.dataMap) {
                var i = this.properties.dataMap.url.value;
                e = t.execStr(this.properties.editProperty, i);
            }
            var a = "http:" + e;
            this.setData({
                imageUrl: a
            });
        },
        _getSourceData: function() {
            var e;
            if (this.properties.source && (e = t.execStr(this.properties.editProperty, this.properties.source)), 
            this.properties.dataMap) {
                var i = this.properties.dataMap.source.value;
                e = t.execStr(this.properties.editProperty, i);
            }
            this.setData({
                sourceData: e
            });
        },
        _getEvent: function() {
            var e, i = this.properties.events;
            if (i) {
                var a = (e = i[0]).actions[0].params[0].paramValue, r = t.execStrForSkuKey(this.properties.editProperty, a);
                this.setData({
                    eventParam: r
                });
            }
        },
        _clickImage: function(t) {
            var e = {
                key: this.data.eventParam
            }, i = {};
            this.triggerEvent("clickImage", e, i);
        },
        _clickHotarea: function(t) {
            var e = t.currentTarget.dataset.index, i = this.data.sourceData[e], a = {};
            this.triggerEvent("clickImage", i, a);
        }
    }
});