Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function(r) {
    var e, t = {};
    if (!(r instanceof Object) || Array.isArray(r)) throw new Error("keyMirror(...): Argument must be an object.");
    for (e in r) r.hasOwnProperty(e) && (r[e] ? t[e] = r[e] : t[e] = e);
    return t;
};