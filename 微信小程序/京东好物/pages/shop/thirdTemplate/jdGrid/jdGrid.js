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
            i > 0 && (e = i * this.data.winScale / 2 + "px", t = i * this.data.winScale / o + "px", 
            i = i * this.data.winScale + "px"), "-1" == i && (i = "100%"), "-2" == i && (i = "100%");
            var a = this.properties.styles.height || 0;
            a = a > 0 ? a * this.data.winScale + "px" : "100%";
            var r = this.properties.styles.marginLeft || 0;
            r > 0 && (r *= this.data.winScale);
            var s = this.properties.styles.marginTop || 0;
            s > 0 && (s *= this.data.winScale);
            var n = this.properties.styles.marginRight || 0;
            n > 0 && (n *= this.data.winScale);
            var p = this.properties.styles.marginBottom || 0;
            p > 0 && (p *= this.data.winScale);
            var h = this.properties.foreach.template.style.layout || "relative";
            this.setData({
                width: i,
                height: a,
                marginLeft: r,
                marginTop: s,
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
                var e, i, o = this.properties.foreach, a = this.properties.editProperty, r = o;
                this.properties.foreach.template.children && (e = this.properties.foreach.template.children, 
                i = t.filterForEach(a, e)), r.template.children = i, this.setData({
                    foreachFiltered: r
                });
            }
        },
        _getSkuList: function() {
            var e = this.properties.editProperty, i = this.properties.foreach.arrayName, o = t.execStr(e, i), a = this.properties.foreach.endIndex;
            a = this.properties.foreach.endIndex ? this.properties.foreach.endIndex : 100;
            for (var r = [], s = o.length - 1; s >= 0; s--) {
                var n = o[s];
                n.imageUrl && (n.imageUrl = "http:" + n.imageUrl), r[s] = n;
            }
            this.setData({
                skuList: r,
                endIndex: a
            });
        },
        _tapGridItem: function(t) {
            var e = t.currentTarget.dataset.index, i = {
                index: e,
                item: this.data.skuList[e]
            }, o = i, a = {
                bubbles: !1,
                composed: !0
            };
            console.log("GridParam"), console.log(i), this.triggerEvent("clickFloorItem", o, a);
        }
    }
});