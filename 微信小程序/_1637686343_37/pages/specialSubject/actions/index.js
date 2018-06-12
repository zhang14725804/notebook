function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

e(require("../../../components/load/loadActions"));

var o = e(require("../../../components/videoLayout/videoLayoutAction")), t = e(require("../../../components/floatLayer/floatLayerAction")), a = e(require("../../../components/player/videoPlayerAction")), r = e(require("specialPageAction")), i = e(require("../../video/actions/tmtsInfoAction")), n = e(require("../../../components/paopao/paopaoAction"));

exports.default = Object.assign({}, o.default, r.default, i.default, t.default, a.default, n.default);