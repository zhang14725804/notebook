(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b, c, d, e = require("../../utils/ppdog"), f = a(e), g = require("../../utils/regenerator-runtime"), h = a(g), i = require("../../utils/RequestApi");
    module.exports = {
        data: {
            show_5d: "",
            show_mx: "--hide",
            status: "5d",
            showFivedmx: !1,
            noMingxi: !1
        },
        onLoad: function() {},
        methods: {
            init: function(a, b) {
                c = a, this.switchFdMx(b, !0);
            },
            setColor: function(a) {
                this.setData({
                    colorType: a
                });
            },
            getLayout: function() {
                var a = this.parent.childrens.chart.data.canvas, b = getApp().SystemInfo, c = b.screenWidth, d = b.screenHeight, e = b.windowWidth, f = b.windowHeight;
                return {
                    fiveDWidth: (c || e) - a.width,
                    fiveDHeight: a.height,
                    fiveDListHeight: a.height - 22,
                    fiveDTabHeight: 22,
                    canvasWidth: a.width
                };
            },
            switchFdMx: function(a, b) {
                if (this.parent) {
                    var c = this.parent.childrens.chart.data.canvas, e = this.getLayout();
                    d = c.isNarrow, this.setData({
                        showFivedmx: d,
                        layout: e
                    }), d && (this.updateFd(a), b && this.getMingxiData());
                }
            },
            updateFd: function(a) {
                d && this.setData({
                    positions: a
                });
            },
            getMingxiData: function() {
                var a = this, e = 0 < arguments.length && arguments[0] !== void 0 && arguments[0];
                if (d) {
                    var f = function() {
                        i.Request.getMingxiData(c).then(function(b) {
                            var c = b.data ? b.data.split("|") : [], e = [];
                            c.forEach(function(a) {
                                var b = a.split("/"), c = {
                                    time: b[1].substr(0, 5),
                                    price: b[2],
                                    volume: b[4],
                                    sb: "M" == b[6] ? "-" : b[6],
                                    updown: "M" == b[6] ? "" : "S" == b[6] ? "--down" : "--up"
                                };
                                e.unshift(c);
                            }), a.setData({
                                mingxi: e,
                                noMingxi: 0 == e.length
                            });
                        });
                    };
                    f(), e && (b && clearInterval(b), b = setInterval(f, 5e3));
                }
            },
            stopMingxi: function() {
                b && clearInterval(b), b = null;
            },
            switchTab: function(a) {
                var b = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease"
                });
                "mx" == a ? (this.getMingxiData(!0), b.translate3d((this.data.layout.fiveDWidth - 10) / 2, 0, 0), 
                b.step()) : (b.translate3d(0, 0, 0), b.step(), this.stopMingxi()), this.setData({
                    status: a,
                    fdcur: "5d" == a ? "__cur" : "",
                    mxcur: "mx" == a ? "__cur" : "",
                    show_5d: "5d" == a ? "" : "--hide",
                    show_mx: "mx" == a ? "" : "--hide",
                    cur_line: "5d" == a ? "" : "--mx",
                    animationData3: b.export()
                });
            },
            bindTapDataArea: function() {
                var a = "mx" == this.data.status ? "5d" : "mx";
                this.switchTab(a);
            },
            bindTapTab: function(a) {
                var b = a.target.dataset.status;
                this.switchTab(b);
            }
        }
    };
})();