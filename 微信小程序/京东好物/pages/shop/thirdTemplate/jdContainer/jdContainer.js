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
        },
        "./jdImage": {
            type: "child",
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
        },
        isAbsolute: {
            type: Object,
            value: ""
        }
    },
    data: {
        justifyContent: null,
        lines: null,
        width: "",
        height: "",
        marginLeft: "",
        marginRight: "",
        marginTop: "",
        marginBottom: "",
        paddingLeft: "",
        paddingTop: "",
        paddingRight: "",
        paddingBottom: "",
        winWidth: "",
        winHeight: "",
        winScale: "",
        platform: "",
        pixelRatio: "",
        backgroundColor: "",
        positionAsFather: "",
        position: "",
        skuList: [],
        foreachFiltered: "",
        editProperty: ""
    },
    attached: function() {
        this._setSystemInfo(), this._setLayoutStyle(), this._getSkuList(), this._FilterForEach();
    },
    methods: {
        _setSystemInfo: function() {
            var t = this;
            wx.getSystemInfo({
                success: function(e) {
                    var i = e.windowWidth / 320, r = (e.platform, e.pixelRatio);
                    t.setData({
                        winWidth: e.windowWidth,
                        winHeight: e.windowHeight,
                        winScale: i,
                        platform: e.platform,
                        pixelRatio: r
                    });
                }
            });
        },
        _setLayoutStyle: function() {
            var e = t.execStr(this.properties.editProperty, this.properties.styles.width) || 0;
            if (e > 0 && (e = e * this.data.winScale + "px"), "-1" == e) {
                e = this.data.winWidth + "px";
                i = t.execStr(this.properties.editProperty, this.properties.styles.marginLeft) || 0;
                e = this.data.winWidth - i * this.data.winScale + "px";
            }
            if ("-2" == e) {
                e = this.data.winWidth + "px";
                var i = t.execStr(this.properties.editProperty, this.properties.styles.marginLeft) || 0;
                e = this.data.winWidth - i * this.data.winScale + "px";
            }
            var r = t.execStr(this.properties.editProperty, this.properties.styles.height) || 0;
            r > 0 && (r = r * this.data.winScale + "px"), "-1" == r && (r = ""), "-2" == r && (r = "");
            var s = t.execStr(this.properties.editProperty, this.properties.styles.marginLeft) || 0;
            s > 0 && (s *= this.data.winScale);
            var a = t.execStr(this.properties.editProperty, this.properties.styles.marginTop) || 0;
            a > 0 && (a *= this.data.winScale);
            var o = this.properties.styles.marginRight || 0;
            o > 0 && (o *= this.data.winScale);
            var p = this.properties.styles.marginBottom || 0;
            p > 0 && (p *= this.data.winScale);
            var n = this.properties.styles.paddingLeft || 0;
            n > 0 && (n *= this.data.winScale);
            var h = this.properties.styles.paddingTop || 0;
            h > 0 && (h *= this.data.winScale);
            var l = this.properties.styles.paddingRight || 0;
            l > 0 && (l *= this.data.winScale);
            var d = this.properties.styles.paddingBottom || 0;
            d > 0 && (d *= this.data.winScale);
            var c = "#ffffff";
            if (this.properties.styles.backgroundColor) {
                var g = this.properties.styles.backgroundColor;
                c = t.execStr(this.properties.editProperty, g);
            }
            var f = "static";
            this.properties.isAbsolute && this.properties.isAbsolute.layout && (f = this.properties.isAbsolute.layout), 
            f || (f = "static");
            var u = "static";
            this.properties.styles.layout && (u = this.properties.styles.layout), this.setData({
                width: e,
                height: r,
                marginLeft: s,
                marginTop: a,
                marginRight: o,
                marginBottom: p,
                paddingLeft: n,
                paddingTop: h,
                paddingRight: l,
                paddingBottom: d,
                backgroundColor: c,
                positionAsFather: f,
                position: u
            });
        },
        _FilterForEach: function() {
            if (this.properties.foreach) {
                var e, i, r = this.properties.foreach, s = this.properties.editProperty, a = r;
                this.properties.foreach.template.children && (e = this.properties.foreach.template.children, 
                i = t.filterForEach(s, e)), a.template.children = i, this.setData({
                    foreachFiltered: a,
                    editProperty: s
                });
            }
        },
        _getSkuList: function() {
            if (this.properties.foreach) {
                var e = this.properties.editProperty, i = this.properties.foreach.arrayName, r = t.execStr(e, i);
                console.log(r);
                for (var s = [], a = r.length - 1; a >= 0; a--) {
                    var o = r[a];
                    o.imageUrl && (o.imageUrl = "http:" + o.imageUrl), s[a] = o;
                }
                this.setData({
                    skuList: s
                });
            }
        },
        _clickItem: function(t) {
            var e = t.currentTarget.dataset.index, i = {
                index: e,
                item: this.data.skuList[e]
            }, r = i, s = {
                bubbles: !1,
                composed: !0
            };
            console.log("containerParamClick"), console.log(i), this.triggerEvent("clickContainerItem", r, s);
        }
    }
});