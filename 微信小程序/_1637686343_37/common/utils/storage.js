Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.handleStorageMuti = function(e, t) {
    function r(t) {
        try {
            switch (e) {
              case "get":
                o = wx.getStorageSync(t);
                break;

              case "set":
                wx.setStorageSync(t, a);
                break;

              case "remove":
                wx.removeStorageSync(t);
                break;

              case "getInfo":
                o = wx.getStorageInfoSync();
                break;

              default:
                wx.clearStorageSync();
            }
        } catch (e) {
            --n > 0 && r(t);
        }
    }
    var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 3, o = null;
    if (r(t), "get" == e || "getInfo" == e) return o;
};