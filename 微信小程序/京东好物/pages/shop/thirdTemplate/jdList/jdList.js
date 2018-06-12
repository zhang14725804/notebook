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
        skuList: [],
        imgUrls: [ "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg", "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg", "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg" ],
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
        endIndex: "",
        position: "",
        column: "",
        cellWidth: "",
        foreachFiltered: ""
    },
    attached: function() {
        this._setSystemInfo(), this._setLayoutStyle(), this._getSkuList(), this._FilterForEach();
    },
    methods: {
        _setSystemInfo: function() {
            var t = this;
            wx.getSystemInfo({
                success: function(e) {
                    var i = e.windowWidth / 320, o = (e.platform, e.pixelRatio);
                    t.setData({
                        winWidth: e.windowWidth,
                        winHeight: e.windowHeight,
                        winScale: i,
                        platform: e.platform,
                        pixelRatio: o
                    });
                }
            });
        },
        _setLayoutStyle: function() {
            var t, e, i = this.properties.styles.width || 0, o = this.properties.styles.column || 1;
            i > 0 && (e = i * this.data.winScale / 2 + "px", t = (i * this.data.winScale - 10) / o + "px", 
            i = i * this.data.winScale + "px"), "-1" == i && (i = "100%"), "-2" == i && (i = "100%");
            var s = this.properties.styles.height || 0;
            s = s > 0 ? s * this.data.winScale + "px" : "100%";
            var a = this.properties.styles.marginLeft || 0;
            a > 0 && (a *= this.data.winScale);
            var r = this.properties.styles.marginTop || 0;
            r > 0 && (r *= this.data.winScale);
            var n = this.properties.styles.marginRight || 0;
            n > 0 && (n *= this.data.winScale);
            var p = this.properties.styles.marginBottom || 0;
            p > 0 && (p *= this.data.winScale);
            var h = this.properties.foreach.template.style.layout || "relative";
            this.setData({
                width: i,
                height: s,
                marginLeft: a,
                marginTop: r,
                marginRight: n,
                marginBottom: p,
                halfWidth: e,
                position: h,
                column: o,
                cellWidth: t
            });
        },
        _FilterForEach: function() {
            if (this.properties.foreach) {
                var e = this.properties.foreach;
                console.log("gridFilter"), console.log(e);
                var i = this.properties.editProperty, o = t.filterForEach(i, e);
                console.log(i), console.log(o), this.setData({
                    foreachFiltered: o
                });
            }
        },
        _getSkuList: function() {
            var e = this.properties.editProperty, i = this.properties.foreach.arrayName, o = t.execStr(e, i), s = this.properties.foreach.endIndex;
            s = this.properties.foreach.endIndex ? this.properties.foreach.endIndex : 100, console.log("gridList"), 
            console.log(o), this.setData({
                skuList: o,
                endIndex: s
            });
        },
        _tapGridItem: function(t) {
            var e = t.currentTarget.dataset.index, i = {
                index: e,
                item: this.data.skuList[e]
            }, o = i, s = {
                bubbles: !0,
                composed: !0
            };
            console.log("GridParam"), console.log(i), this.triggerEvent("clickFloorItem", o, s);
        }
    }
});