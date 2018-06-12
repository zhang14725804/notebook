function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _inspectPhoneIntro = require("./serviceIntro/inspectPhoneIntro.js"), _inspectPhoneIntro2 = _interopRequireDefault(_inspectPhoneIntro), _gameTradeIntro = require("./serviceIntro/gameTradeIntro.js"), _gameTradeIntro2 = _interopRequireDefault(_gameTradeIntro), _inspectAheadIntro = require("./serviceIntro/inspectAheadIntro.js"), _inspectAheadIntro2 = _interopRequireDefault(_inspectAheadIntro), _gameDepositIntro = require("./serviceIntro/gameDepositIntro.js"), _gameDepositIntro2 = _interopRequireDefault(_gameDepositIntro), _defaultIntro = require("./serviceIntro/defaultIntro.js"), _defaultIntro2 = _interopRequireDefault(_defaultIntro), baseCdn = "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main";

exports.default = {
    serviceText: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t = e.map(function(e) {
            switch (e.serviceId) {
              case "1":
              case "12":
                return "支持验机·邮寄";

              case "16":
              case "17":
                return "游戏交易保障服务";

              case "14":
              case "15":
              case "11":
              case "13":
              default:
                return "";
            }
        }).filter(function(e) {
            return !!e;
        }), r = t.join("、");
        return 0 == r.length && /^2123/.test(n.cateId) && (r = "游戏交易保障服务"), r || "商品详情";
    },
    introPages: {
        1: "/pages/youpinIntro/youpinIntro",
        12: "/pages/youpinIntro/youpinIntro"
    },
    supportedList: function() {
        var e = this, n = {
            1: "YANJISERVICEDETAIL_CLICK",
            12: "YANJISERVICEDETAIL_CLICK"
        };
        return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).filter(function(e) {
            return [ "1", "12", "16", "17" ].includes(e.serviceId);
        }).map(function(t) {
            return Object.assign({}, t, {
                waUrl: t.waUrl || e.introPages[t.serviceId] || "",
                clickLog: n[t.serviceId]
            });
        });
    },
    supportPost: function(e) {
        return e = String(e), [ "1", "12" ].includes(e);
    },
    supportBuy: function(e) {
        return e = String(e), [ "1", "12", "16", "17", "18", "19" ].includes(e);
    },
    serviceIntro: function(e) {
        e = String(e);
        var n = {};
        switch (e) {
          case "1":
          case "12":
            n = _inspectPhoneIntro2.default;
            break;

          case "16":
          case "17":
            n = _gameTradeIntro2.default;
            break;

          case "18":
            n = _inspectAheadIntro2.default;
            break;

          case "19":
            n = _gameDepositIntro2.default;
            break;

          default:
            n = _defaultIntro2.default;
        }
        return n;
    },
    serviceLabel: function(e) {
        switch (e = String(e)) {
          case "1":
          case "12":
            return {
                icon: baseCdn + "/common/infoLabels/youjiyanji.png",
                w: 141,
                h: 30
            };

          case "16":
          case "17":
            return {
                icon: baseCdn + "/common/infoLabels/gameTrade.png",
                w: 138,
                h: 30
            };

          default:
            return {
                w: 0,
                h: 0
            };
        }
    },
    serviceLabelMine: function(e) {
        return e.title.includes("邮寄验机") ? {
            icon: baseCdn + "/common/infoLabels/youjiyanji.png",
            w: 141,
            h: 30
        } : e.title.includes("游戏交易") ? {
            icon: baseCdn + "/common/infoLabels/gameTrade.png",
            w: 138,
            h: 30
        } : e.title.includes("租号玩押金") ? {
            icon: "https://pic1.58cdn.com.cn/zhuanzh/n_v2886769ca54854bd289a896cf44e8f6bb.png",
            w: 140,
            h: 23
        } : {
            w: 0,
            h: 0
        };
    }
};