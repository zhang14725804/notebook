(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d);
    module.exports = {
        appid: "wx082534a3cdeb40e3",
        USERSTATE: {
            HASACCOUNT: "0",
            NOACCOUNT: "1",
            VERIFYING: "2",
            HASBUNDLE: "3",
            FAILED: "4"
        },
        MARKET: {
            SA: "0",
            HA: "1",
            SB: "2",
            HK: "2",
            HB: "3",
            SJJ: "4",
            HJJ: "5"
        },
        MARKETSTATE: {
            NOT_TRADEDAY: "-1",
            NOT_OPEN: "0",
            OPEN_AUCTION: "1",
            MORNING_OPENED: "2",
            SIESTA: "3",
            AFTERNOON_OPENED: "4",
            CLOSE_AUCTION: "5",
            COLSED: "6"
        },
        STOCKSTATE: {
            NORMAL: "0",
            DELISTED: "D",
            SUSPENSION: "S",
            SUSPENDED: "Z",
            UNLIST: "U",
            UNISSUED: "I",
            PURCHASE: "P"
        },
        DEALER: {
            CMSCHINA: {
                CODE: "10800",
                DOMAIN: "wzq.newone.com.cn",
                NAME: "招商证券"
            },
            CHINALIONS: {
                CODE: "10100",
                DOMAIN: "wzq.chinalions.cn",
                NAME: "华林证券"
            },
            WZQ: {
                CODE: "0",
                DOMAIN: "wzq.tenpay.com",
                NAME: "微证券"
            },
            CNHB: {
                CODE: "21900",
                DOMAIN: "wzq.cnhbstock.com",
                NAME: "华宝证券"
            }
        }
    };
})();