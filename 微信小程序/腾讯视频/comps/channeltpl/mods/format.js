function t(t) {
    function e(t) {
        return t > 9 ? t : "0" + t;
    }
    if (!t) return "";
    var i = Math.floor(t / 60), c = Math.floor(i / 60);
    i -= 60 * c;
    var a = t % 60;
    return a = e(a), i = e(i), (c ? e(c) + ":" : "") + i + ":" + a;
}

function e(t, e) {
    try {
        t.tagtext = "", e.imgtag && (t.tagtext = JSON.parse(e.imgtag).tag_2.text);
    } catch (t) {}
}

var i = {
    h: "https://i.gtimg.cn/qqlive/images/20150608/pic_h.png",
    v: "https://i.gtimg.cn/qqlive/images/20150608/pic_v.png"
}, c = require("../../../module/recreport");

module.exports = {
    format: function(a) {
        a.forEach(function(a) {
            a.list.forEach(function(r, l) {
                var p = {
                    itemId: r.itemId
                };
                if (r.cms_data = r.cms_data || {}, r.data = r.data || {}, Object.keys(r.cms_data).length > Object.keys(r.data).length) {
                    var s = r.cms_data;
                    1 == +s.pic_type ? p.pic = s.pic_1080x607 : 2 == +s.pic_type ? p.pic = s.image_url_vertical && s.image_url_vertical.replace(/(\/0)$/g, "/220") || i.v : p.pic = s.pic_498x280 || s.pic_680x382, 
                    p.pic = p.pic || s.pic_url || i.h, e(p, s), p.score = s.score, p.title = s.title, 
                    p.subtitle = s.sub_title || s.subtitle || s.sectitle || s.stitle, p.duration = t(s.duration), 
                    p.timelong = s.timelong, p.publishdate = s.publishdate && s.publishdate.slice(0, 10), 
                    p.type = s.type, p.itemtype = s.item_type, p.pictype = s.pic_type, p.cid = s.cid, 
                    p.vid = s.vid;
                } else {
                    var o = r.data;
                    e(p, o);
                    try {
                        p.score = "", o.score && (p.score = JSON.parse(o.score).score);
                    } catch (t) {}
                    p.pic = o.image_url || i.h, p.title = o.title, p.subtitle = o.sub_title || o.subtitle || o.sectitle || o.stitle, 
                    p.duration = t(o.duration), p.timelong = o.episode_updated, p.publishdate = o.publish_date, 
                    p.type = o.type, p.itemtype = o.item_type, c.fields().forEach(function(t) {
                        p[t] = o[t];
                    }), p._needRecreport = !0;
                }
                a.list[l] = p;
            });
        });
    },
    formatHack: function(t) {
        t.forEach(function(t) {
            "SCROLL_HPICS" !== t._tplType && "SCROLL_VPICS" !== t._tplType || t.list.some(function(t) {
                return !!t.subtitle;
            }), t._tplClass = "scroll_box_subtitle";
        });
    }
};