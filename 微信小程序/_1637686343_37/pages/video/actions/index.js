function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../components/load/loadActions")), o = e(require("../../../components/videoLayout/videoLayoutAction")), i = e(require("../../../components/comment/commentAction")), r = e(require("../../../components/floatLayer/floatLayerAction")), u = e(require("detailAction")), n = e(require("playInfoAction")), a = e(require("episodeAction")), d = e(require("videoAction")), c = e(require("videoListAction")), l = e(require("videoControlAction")), f = e(require("sourceEpisodeAction")), s = e(require("sourceBestViewAction")), q = e(require("tmtsInfoAction")), A = e(require("hotDanceAction"));

exports.default = Object.assign({}, u.default, n.default, o.default, d.default, a.default, c.default, t.default, l.default, f.default, s.default, q.default, i.default, r.default, A.default);