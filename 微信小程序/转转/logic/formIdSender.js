function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy);

exports.default = {
    init: function(e) {
        _wepy2.default.component.prototype.$sendFormId = function(t) {
            this.$loginCenter.zzUserInfo.ppu && this.$httpWithLogin({
                url: "https://app.zhuanzhuan.com/zzopen/zzwxpush/addFormId",
                type: "GET",
                data: {
                    formId: t,
                    source: e,
                    uid: this.$loginCenter.zzUserInfo.uid,
                    addTime: Date.now()
                }
            });
        };
    }
};