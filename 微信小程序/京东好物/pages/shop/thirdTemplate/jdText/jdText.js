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
        title: {
            type: String,
            value: "标题"
        },
        styles: {
            type: Object,
            value: ""
        },
        editProperty: {
            type: Object,
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
        style: null,
        textDecoration: null,
        textAlign: null,
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
        winWidth: "",
        winHeight: "",
        winScale: "",
        platform: "",
        pixelRatio: "",
        backgroundColor: "",
        fontWeight: "",
        fontSize: "",
        lineHeight: "",
        textDecorationLine: "",
        text: null,
        visible: !0,
        valueRefer: null,
        positionAsFather: "",
        eventParam: ""
    },
    attached: function() {
        this._setSystemInfo(), this._setLayoutStyle(), this._setTextFlexStyle(), this._getGravityStyle(), 
        this._getLineNumber(), this._getFontStyle(), this._getLineStyle(), this._getTextData(), 
        this.properties.events && this._getEvent();
    },
    methods: {
        _setSystemInfo: function() {
            var t = this;
            wx.getSystemInfo({
                success: function(e) {
                    var i = e.windowWidth / 320, s = (e.platform, e.pixelRatio);
                    t.setData({
                        winWidth: e.windowWidth,
                        winHeight: e.windowHeight,
                        winScale: i,
                        platform: e.platform,
                        pixelRatio: s
                    });
                }
            });
        },
        _setLayoutStyle: function() {
            var e = t.execStr(this.properties.editProperty, this.properties.styles.width) || 0, i = this.properties.styles.fontSize || 0, s = this.properties.styles.lines || 0, a = i, r = t.execStr(this.properties.editProperty, this.properties.styles.height) || 0;
            if (r > 0 && (s > 0 && (a = r * this.data.winScale / s + "px"), r = r * this.data.winScale + "px"), 
            "-1" == r) {
                r = "100%";
                var n = this.properties.isAbsolute.height || 0;
                n > 0 && (r = n * this.data.winScale + "px", a = n * this.data.winScale + "px");
            }
            if ("-2" == r && (r = "100%"), e > 0) e = e * this.data.winScale + "px"; else if ("-1" == e) {
                o = this.properties.styles.marginLeft || 0;
                e = this.data.winWidth - o * this.data.winScale, e += "px";
            } else if ("-2" == e) {
                var o = this.properties.styles.marginLeft || 0;
                e = this.data.winWidth - o * this.data.winScale, e += "px";
            }
            var l = this.properties.styles.marginLeft || 0;
            l > 0 && (l *= this.data.winScale);
            var p = this.properties.styles.marginTop || 0;
            p > 0 && (p *= this.data.winScale);
            var h = this.properties.styles.marginRight || 0;
            h > 0 && (h *= this.data.winScale);
            var c = this.properties.styles.marginBottom || 0;
            c > 0 && (c *= this.data.winScale);
            var d = this.properties.styles.paddingLeft || 0;
            d > 0 && (d *= this.data.winScale);
            var u = this.properties.styles.paddingTop || 0;
            u > 0 && (u *= this.data.winScale);
            var y = "static";
            this.properties.isAbsolute && this.properties.isAbsolute.layout && (y = this.properties.isAbsolute.layout), 
            this.setData({
                width: e,
                height: r,
                marginLeft: l,
                marginTop: p,
                marginRight: h,
                marginBottom: c,
                paddingLeft: d,
                paddingTop: u,
                backgroundColor: "",
                positionAsFather: y,
                lineHeight: a
            });
        },
        _setTextFlexStyle: function() {
            var t, e = this.properties.styles.gravity || 1;
            switch (Number(e)) {
              case 1:
              case 2:
              case 3:
                t = "flex-start";
                break;

              case 4:
              case 5:
              case 6:
                t = "center";
                break;

              case 7:
              case 8:
              case 9:
                t = "flex-end";
                break;

              default:
                t = "flex-start";
            }
            this.setData({
                justifyContent: t
            });
        },
        _getGravityStyle: function() {
            var t, e = this.properties.styles.gravity || 1;
            switch (Number(e)) {
              case 1:
              case 4:
              case 7:
                t = "left";
                break;

              case 2:
              case 5:
              case 8:
                t = "center";
                break;

              case 3:
              case 6:
              case 9:
                t = "right";
                break;

              default:
                t = "left";
            }
            this.setData({
                textAlign: t
            });
        },
        _getLineNumber: function() {
            var t = this.properties.styles.lines;
            this.setData({
                lines: t
            });
        },
        _getFontStyle: function() {
            var t;
            t = (this.properties.styles.fontWeight || 0) > 400 ? "bold" : "normal", this.setData({
                fontWeight: t
            });
        },
        _getLineStyle: function() {
            var t, e = this.properties.styles.lineType;
            switch (Number(e)) {
              case 2:
                t = "line-through";
                break;

              case 3:
                t = "underline";
                break;

              default:
                t = "none";
            }
            this.setData({
                textDecorationLine: t
            });
        },
        _getTextData: function() {
            var e;
            this.properties.styles.visible && (e = t.execStr(this.properties.editProperty, this.properties.styles.visible));
            var i = t.execStr(this.properties.editProperty, this.properties.title);
            if (this.properties.dataMap) {
                var s = this.properties.dataMap.value.value;
                i = t.execStr(this.properties.editProperty, s);
            }
            this.properties.editProperty;
            void 0 != e && 1 != e || (e = "true"), this.setData({
                visible: e,
                valueRefer: i
            });
        },
        _getEvent: function() {
            var e, i = this.properties.events;
            if (i) {
                var s = (e = i[0]).actions[0].params[0].paramValue, a = t.execStrForSkuKey(this.properties.editProperty, s);
                this.setData({
                    eventParam: a
                });
            }
        },
        _tapText: function(t) {
            console.log("textClick");
            var e = {
                key: this.data.eventParam
            }, i = {};
            this.triggerEvent("clickTextWord", e, i);
        }
    }
});