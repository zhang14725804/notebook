function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../components/load/loadActions")), o = e(require("../../../components/searchLayout/searchLayoutAction"));

exports.default = Object.assign({
    setData: function(e, t) {
        return {
            type: "SET",
            info: e,
            index: t
        };
    }
}, t.default, o.default);