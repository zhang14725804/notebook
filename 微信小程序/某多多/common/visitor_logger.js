function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("./data_util")), i = t(require("../constants/storage_keys")), o = t(require("../common/storage_util")), r = {
    visitorInfo: null,
    generateVisitorInfo: function() {
        return {
            xcxTraceId: e.default.getRandomString()
        };
    },
    setVisitorInfo: function(t) {
        t && (o.default.setStorageSync(i.default.VISITOR_INFO, t), this.visitorInfo = t);
    },
    getVisitorLocalInfo: function() {
        if (this.visitorInfo || (this.visitorInfo = o.default.getStorageSync(i.default.VISITOR_INFO)), 
        !this.visitorInfo) {
            var t = o.default.getStorageSync(i.default.VISITOR_INFO) || this.generateVisitorInfo();
            this.setVisitorInfo(t);
        }
        return this.visitorInfo;
    }
};

exports.default = r;