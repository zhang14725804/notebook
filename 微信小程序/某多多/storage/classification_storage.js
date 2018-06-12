Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../constants/storage_keys")), t = require("../common/index");

exports.default = {
    saveClassificationInfo: function(t) {
        t && wx.setStorageSync(e.default.CLASSIFACATION_INFO, t);
    },
    getClassificationInfo: function() {
        return t.StorageUtil.getStorageSync(e.default.CLASSIFACATION_INFO);
    }
};