var t = getRegExp("(.*?)", "g");

module.exports = {
    isString: function(t) {
        return "string" == typeof t;
    },
    convert: function(r) {
        var n = [], e = [], u = 1;
        return r.replace(t, function(t, r) {
            return n.push({
                id: u++,
                w: r,
                hl: !0
            }), "_hlspliter_";
        }).split("_hlspliter_").forEach(function(t) {
            e.push({
                id: u++,
                w: t,
                hl: !1
            }), n.length && e.push(n.shift());
        }), e = e.reduce(function(t, r) {
            return r.w && t.push(r), t;
        }, []), {
            raw: r,
            text: e.map(function(t) {
                return t.w;
            }).join(""),
            parts: e
        };
    }
};