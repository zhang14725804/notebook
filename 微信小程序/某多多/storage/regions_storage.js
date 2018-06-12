Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../constants/storage_keys")), t = require("../common/index");

exports.default = {
    saveRegionsData: function(t) {
        t && t.regions && t.regions.length > 0 && (wx.setStorageSync(e.default.REGIONS, {
            regions: t.regions[0].children,
            lastUpdateTime: t.regions_update_time
        }), wx.setStorageSync("REGIONS_LAST_UPDATED", t.regions_update_time));
    },
    getRegionsData: function() {
        return t.StorageUtil.getStorageSync(e.default.REGIONS);
    },
    getRegionsLastUpdated: function() {
        return t.StorageUtil.getStorageSync("REGIONS_LAST_UPDATED") || 0;
    }
};