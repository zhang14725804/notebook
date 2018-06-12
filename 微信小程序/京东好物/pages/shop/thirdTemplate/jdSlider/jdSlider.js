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
        items: {
            type: Array,
            value: ""
        },
        editProperty: {
            type: Object,
            value: ""
        },
        foreach: {
            type: Object,
            value: ""
        }
    },
    data: {
        slide_array: [],
        imgArray: [],
        imgUrls: [ "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg", "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg" ],
        width: "",
        height: "",
        halfWidth: "",
        marginLeft: "",
        marginRight: "",
        marginTop: "",
        marginBottom: "",
        winWidth: "",
        winHeight: "",
        winScale: "",
        platform: "",
        pixelRatio: "",
        isPointDisplay: ""
    },
    attached: function() {
        this._setSystemInfo(), this._setLayoutStyle(), this._getSlideList();
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
            var t = this.properties.styles.width || 0;
            t > 0 && (t = t * this.data.winScale + "px"), "-1" == t && (t = "100%"), "-2" == t && (t = "100%");
            var e = this.properties.styles.height || 0;
            e = e > 0 ? e * this.data.winScale + "px" : "100%";
            var i = this.properties.styles.marginLeft || 0;
            i > 0 && (i *= this.data.winScale);
            var a = this.properties.styles.marginTop || 0;
            a > 0 && (a *= this.data.winScale);
            var s = this.properties.styles.marginRight || 0;
            s > 0 && (s *= this.data.winScale);
            var o = this.properties.styles.marginBottom || 0;
            o > 0 && (o *= this.data.winScale);
            this.properties.foreach.template.style.layout;
            this.setData({
                width: t,
                height: e,
                marginLeft: i,
                marginTop: a,
                marginRight: s,
                marginBottom: o
            });
        },
        _getSlideList: function() {
            for (var e = this.properties.editProperty, i = this.properties.foreach.arrayName, a = t.execStr(e, i), s = [], o = a.length - 1; o >= 0; o--) {
                var r = "http:" + a[o].imageUrl;
                s[o] = r;
            }
            var n = this.properties.styles.isPointDisplay;
            n = s.length > 1, this.setData({
                slide_array: a,
                imgArray: s,
                isPointDisplay: n
            });
        },
        _tapSlideItem: function(t) {
            var e = t.currentTarget.dataset.index, i = {
                index: e,
                item: this.data.slide_array[e]
            }, a = i, s = {
                bubbles: !1,
                composed: !0
            };
            console.log("slideParam"), console.log(i), this.triggerEvent("clickFloorItem", a, s);
        }
    }
});