function t(t) {
    var a = t.length;
    return a % 2 && (t = t.slice(0, a - 1)), t;
}

function a(t) {
    return ~[ "album", "video", "column", "program", "dbIDVideo", "dbIDAlbum" ].indexOf(t.ctype);
}

module.exports = {
    filter: function(s) {
        var e = [];
        return s.forEach(function(s) {
            s.cms_data = s.cms_data || {};
            var _ = 0;
            1 == s.cms_data.ZT_leaf_shake ? +s.cms_data.small_hor_pic_display_num > 0 ? _ = +s.cms_data.small_hor_pic_display_num : +s.cms_data.post_show_num > 0 && (_ = +s.cms_data.post_show_num) : +s.cms_data.ZT_leaf_shake_size > 0 && (_ = +s.cms_data.ZT_leaf_shake_size), 
            s._change = {
                changeSize: _,
                changeTimes: ~~(s.cms_data.ZT_leaf_pic_3_size / _)
            };
            var i = s.type;
            if (s.list = s.list || [], "type_30014" !== i && "type_62" !== i) {
                if ("type_30000" !== i) if ("type_30041" !== i) {
                    if ("type_30038" === i || "type_30002" === i) return s._tplType = s.list.length > 1 ? "SCROLL_HPICS" : "LPIC_RTEXT", 
                    e.push(s);
                } else {
                    var l = [], c = [];
                    s.list = s.list.filter(function(t) {
                        return t.cms_data = t.cms_data || {}, a(t.cms_data);
                    }), s.list.forEach(function(t) {
                        t.cms_data = t.cms_data || {}, t.cms_data && (3 == +t.cms_data.pic_type ? l.push(t) : 2 == +t.cms_data.pic_type && c.push(t));
                    });
                    var n = s.list.length;
                    if (l.length > c.length) {
                        if (s._tplType = "SCROLL_HPICS", n) return e.push(s);
                    } else if (s._tplType = "SCROLL_VPICS", n) return e.push(s);
                } else if (s.list = t(s.list), s.list.length) return s._tplType = "HPICS", e.push(s);
            } else {
                var p = [], l = [];
                s.list = s.list.filter(function(t) {
                    return t.cms_data = t.cms_data || {}, a(t.cms_data);
                }), s.list.forEach(function(t) {
                    t.cms_data = t.cms_data || {}, t.cms_data && (1 == +t.cms_data.pic_type ? p.push(t) : 3 == +t.cms_data.pic_type && l.push(t));
                });
                var r = p.length, u = l.length;
                if (r && 0 === u) return s._tplType = "FOCUS", e.push(s);
                if (0 === r && u && (s.list = t(s.list), s.list.length)) return s._tplType = "HPICS", 
                e.push(s);
                if (r && u) {
                    var m = t(l);
                    if (m.length) return s._tplType = "FOCUS_HPICS", s._focusLen = p.length, s.list = p.concat(m), 
                    e.push(s);
                }
            }
        }), e;
    },
    getEvenList: t,
    isValidType: a
};