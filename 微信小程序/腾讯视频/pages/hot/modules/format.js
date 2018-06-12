var t = require("../../../module/helper"), e = require("../../../module/fns"), a = require("../../../module/dataset/field/index").filter, i = require("../../../module/recreport");

module.exports = {
    feeds: function(a) {
        var i = [];
        return (a = a || []).forEach(function(a, r) {
            a.vid && (a.comment = e.extend({}, a.comment, {
                commentNum: t.formatNum(a.comment.commentNum)
            }), a && a.videoData && a.videoData.playCount && (a.videoData.playCount = t.formatNum(a.videoData.playCount)), 
            i.push(a));
        }), i;
    },
    channel: function(t) {
        for (var e = [], r = 0, m = t.length; r < m; ++r) {
            var l = t[r], o = l.list.length;
            if (o % 2 && (l.list = l.list.slice(0, o - 1), o -= 1), o) {
                for (var g = 0; g < o; ++g) {
                    var c = l.list[g], u = c.data;
                    if ("type_30014" === l.type && ((u = c.data = c.cms_data).image_url = u.pic_url || u.pic_498x280 || u.pic_330x185 || u.pic_220x123), 
                    u.score && (u.score = JSON.parse(u.score), u.score && (u.score = u.score.score.slice(0, 3)), 
                    u.score || (u.score = "")), u.image_url ? c.itemId && 15 === c.itemId && (u.image_url = u.image_url.replace(/(\/0)$/g, "/332")) : u.image_url = "http://i.gtimg.cn/qqlive/images/20150608/pic_h.png", 
                    u.imgtag) try {
                        u.imgtag = JSON.parse(u.imgtag), u.imgtag.tag_2 && u.imgtag.tag_2.text && (u.imgtagUrl = marklabel[u.imgtag.tag_2.text] && marklabel[u.imgtag.tag_2.text]["2x"], 
                        !u.imgtagUrl && (u.imgtagUrl = ""));
                    } catch (t) {}
                    l.list[g] = a([ "itemId", "data.image_url", "data.imgtagUrl", "data.episode_updated", "data.score", "data.title", "data.sub_title", "data.publish_date" ].concat(i.fields().map(function(t) {
                        return "data." + t;
                    })), l.list[g]);
                }
                e.push(l);
            }
        }
        return e;
    }
};