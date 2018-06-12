Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    vfmInPath: function(t) {
        var e = {}, a = getApp().globalData.path, o = getApp().globalData.vfm;
        return a == t && void 0 !== o && (e = {
            vfm: o
        }), e;
    }
};