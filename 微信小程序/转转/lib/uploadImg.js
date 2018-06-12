function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function uploadImg(e) {
    var t = e.tempFilePath.split(".");
    e.ext = t[t.length - 1];
    var r = new _qcloud_sdk2.default({
        appid: appid,
        bucket: bucket,
        region: region,
        getAppSign: function(t) {
            _ZZLogin2.default.requestWithLogin({
                url: "https://app.zhuanzhuan.com/zzopen/wxcommon/uploadFile",
                data: {
                    once: !1,
                    suffix: e.ext
                },
                dataType: "text",
                success: function(r) {
                    try {
                        var o = JSON.parse(r.data);
                        if (0 != o.respCode) throw new Error("getAppSign failed: " + r.data);
                        t(o.respData);
                    } catch (t) {
                        console.error("[uploadFile]", t), "function" == typeof e.fail && e.fail({
                            statusCode: -100,
                            errMsg: "internal error"
                        });
                    }
                }
            });
        },
        getAppSignOnce: function(t) {
            _ZZLogin2.default.requestWithLogin({
                url: "https://app.zhuanzhuan.com/zzopen/wxcommon/uploadFile",
                data: {
                    once: !0,
                    suffix: e.ext
                },
                dataType: "text",
                success: function(r) {
                    try {
                        var o = JSON.parse(r.data);
                        if (0 != o.respCode) throw new Error("getAppSign failed: " + r.data);
                        t(o.respData);
                    } catch (t) {
                        console.error("[uploadFile]", t), "function" == typeof e.fail && e.fail({
                            statusCode: -100,
                            errMsg: "internal error"
                        });
                    }
                }
            });
        }
    });
    try {
        r.uploadFile(e.success, e.fail, bucket, "", e.tempFilePath, 0);
    } catch (t) {
        console.error("[uploadImg]", t), "function" == typeof e.fail && e.fail({
            statusCode: -100,
            errMsg: "internal error"
        });
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _ZZLogin = require("./ZZLogin.js"), _ZZLogin2 = _interopRequireDefault(_ZZLogin), _qcloud_sdk = require("./qcloud_sdk.js"), _qcloud_sdk2 = _interopRequireDefault(_qcloud_sdk), secret_id = "AKIDUfLUEUigQiXqm7CVSspKJnuaiIKtxqAv", secret_key = "bLcPnl88WU30VY57ipRhSePfPdOfSruK", appid = "1251390787", bucket = "58pic", region = "tj";

exports.default = uploadImg;