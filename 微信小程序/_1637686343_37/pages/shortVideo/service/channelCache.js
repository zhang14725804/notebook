Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    save: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100, o = [].concat(t);
        o.length > a && o.splice(a), o.forEach(function(e) {
            e.showVideo = !1;
        }), e["channelData_" + n] = o;
    },
    get: function(n) {
        var t = e["channelData_" + n];
        return t && t.length && t.forEach(function(e) {
            e.showVideo = !1;
        }), e["channelData_" + n];
    }
};

var e = {};