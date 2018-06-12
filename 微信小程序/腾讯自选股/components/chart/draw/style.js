(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var b = require("../../../utils/ppdog"), c = a(b), d = require("../../../utils/regenerator-runtime"), e = a(d), f = 514, g = 750, i = 576, h = 146;
    exports.default = {
        lineWidth: 1,
        barNum: 55,
        fontSize: 11,
        color: {
            label: "#858c93",
            labelBG: "rgba(16, 20, 25, 0.7)",
            green: "#32a632",
            red: "#ff4433",
            white: "#333c48",
            indexWhite: "#ffffff",
            indexYellow: "#f5ff00",
            indexPurple: "#d800fe",
            indexGreen: "#00ff00",
            fqLabel: "#3d76b8",
            background: "rgba(16, 20, 25, 1)",
            grid: "#242e39",
            polyline: "#bbe6ff",
            averageLine: "#f4cd20",
            dashLine: "#7f9976",
            minfill: "rgba(25, 40, 54, 0.7)",
            ma_color: [ "#f126a5", "#ffc72d", "#29a1e8" ],
            font: "#858c93",
            decorationFont: "#ffffff",
            decorationLine: "#a7b9c0",
            boxBorder: "#44546c",
            boxColor: "rgba(39,53,71,0.8)",
            warningColor: "#181d22",
            warningBorder: "#222a33",
            warningText: "#495461",
            warningImg: "#3a434e"
        },
        stroke: {
            grid: 1,
            polyline: 1,
            averageLine: 1,
            dashLine: 1
        },
        layout: {
            offset: 8,
            min: {
                narrow: {
                    trend_coord: {
                        t: 2 / i,
                        l: 12 / f,
                        w: 500 / f,
                        h: 428 / i,
                        X_SPLIT: 1,
                        Y_SPLIT: 4,
                        halfLine: !0,
                        label: !0,
                        staticPercent: !0
                    },
                    vol_coord: {
                        t: 438 / i,
                        l: 12 / f,
                        w: 500 / f,
                        h: 136 / i,
                        X_SPLIT: 1,
                        Y_SPLIT: 1
                    }
                },
                normal: {
                    trend_coord: {
                        t: 2 / i,
                        l: 12 / g,
                        w: 660 / g,
                        h: 404 / i,
                        X_SPLIT: 1,
                        Y_SPLIT: 4,
                        halfLine: !0,
                        label: !0,
                        staticPercent: !0
                    },
                    vol_coord: {
                        t: 438 / i,
                        l: 12 / g,
                        w: 660 / g,
                        h: 136 / i,
                        dateLabel_t: 430 / i,
                        X_SPLIT: 1,
                        Y_SPLIT: 1
                    }
                }
            },
            fdays: {
                trend_coord: {
                    t: 2 / i,
                    l: 12 / g,
                    w: 660 / g,
                    h: 404 / i,
                    X_SPLIT: 5,
                    Y_SPLIT: 4,
                    halfLine: !0,
                    label: !0,
                    staticPercent: !0
                },
                vol_coord: {
                    t: 438 / i,
                    l: 12 / g,
                    w: 660 / g,
                    h: 136 / i,
                    dateLabel_t: 430 / i,
                    X_SPLIT: 5,
                    Y_SPLIT: 1
                }
            },
            kline: {
                trend_coord: {
                    t: 2 / i,
                    l: 12 / g,
                    w: 660 / g,
                    h: 404 / i,
                    X_SPLIT: 1,
                    Y_SPLIT: 4,
                    label: !0
                },
                vol_coord: {
                    t: 438 / i,
                    l: 12 / g,
                    w: 660 / g,
                    h: 136 / i,
                    dateLabel_t: 430 / i,
                    X_SPLIT: 1,
                    Y_SPLIT: 1
                }
            },
            minmini: {
                narrow: {
                    trend_coord: {
                        t: 0,
                        l: 12 / f,
                        w: 500 / f,
                        h: 144 / h,
                        X_SPLIT: 1,
                        Y_SPLIT: 1
                    }
                },
                normal: {
                    trend_coord: {
                        t: 0,
                        l: 12 / g,
                        w: 660 / g,
                        h: 144 / h,
                        X_SPLIT: 1,
                        Y_SPLIT: 1,
                        label: !0
                    }
                }
            },
            fdaysmini: {
                trend_coord: {
                    t: 0,
                    l: 12 / g,
                    w: 660 / g,
                    h: 144 / h,
                    X_SPLIT: 5,
                    Y_SPLIT: 1,
                    label: !0
                }
            },
            klinemini: {
                trend_coord: {
                    t: 0,
                    l: 12 / g,
                    w: 660 / g,
                    h: 144 / h,
                    X_SPLIT: 1,
                    Y_SPLIT: 1,
                    label: !0
                }
            }
        },
        grid: {
            xline: !0,
            yline: !0,
            xlineNum: 4,
            ylineNum: 2,
            xkline: !0,
            ykline: !0,
            xklineNum: 6
        },
        cjl: {
            height: 70,
            offset: 0,
            klineOffset: 7
        },
        font: {
            type: 12,
            price: {
                x: 5
            },
            zdf: {
                x: 5
            }
        },
        getPrecision: function(a) {
            if (1e3 < 1 * a) return 0;
            var b = a.toString(), c = b.indexOf(".");
            return -1 === c ? 0 : b.length - c - 1;
        },
        checkColorType: function(a) {
            "lzhd" === a ? (this.color.red = "#32a632", this.color.green = "#ff4433") : (this.color.red = "#ff4433", 
            this.color.green = "#32a632");
        }
    }, module.exports = exports["default"];
})();