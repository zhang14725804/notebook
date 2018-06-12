(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a) {
        if (Array.isArray(a)) {
            for (var b = 0, c = Array(a.length); b < a.length; b++) c[b] = a[b];
            return c;
        }
        return Array.from(a);
    }
    function c(a) {
        if (!a) return "";
        var b = a, c = a.split("T").length, d = 1 < c ? a.split("T")[0] : a, e = 1 < c ? a.split("T")[1].split("+")[0] : "";
        a = d + " " + e;
        var f = a;
        try {
            a = Date.parse(a.replace(/-/g, "/"));
            var h = new Date(a) || new Date(b), i = h.getFullYear(), j = new Date(), k = j.getTime(), l = j.getFullYear(), m = new Date().setHours(0, 0, 0, 0), n = parseInt(k) - parseInt(h.getTime());
            f = 0 < n && 6e4 >= n ? "刚刚" : 6e4 < n && 36e5 >= n ? g(parseInt(n / 6e4)) + "分钟前" : 36e5 < n && 864e5 >= n ? g(parseInt(n) / 36e5) + "小时前" : 864e5 < n && 2592e6 >= n ? g(parseInt(n) / 864e5) + "天前" : i == l ? d.substr(d.indexOf("-") + 1) : d;
        } catch (a) {}
        return {
            formatTime: f,
            time: d + " " + e
        };
    }
    function d(a) {
        var c = [], d = [], f = /(\x1c\<\d{1},\S+:\S+\>\x1c)|(\x1e\[\S+\s\S+\]\x1e)|(\x1e\[\S+[\s|\S]*\S+\]\x1e)/, g = /\x1c\<\d{1},\S+:\S+\>\x1c/, h = /(\x1e\[\S+\s\S+\]\x1e)|(\x1e\[\S+[\s|\S]*\S+\]\x1e)/, i = a.split(f), j = 0;
        return i.forEach(function(a) {
            if (a) if (a.match(g)) {
                var f = a.match(g)[0], i = f.substr(2, f.length - 4), k = i.split(":")[0].split(","), l = k[0], m = k[1], n = [ , "at", "live", "topic" ], o = i.split(":")[1];
                1 == l ? (j++, 2 > j && c.push({
                    text: " " + o + " ",
                    type: "at"
                })) : 4 == l && c.push({
                    type: "topic",
                    text: o,
                    topicid: m
                });
            } else if (a.match(h)) {
                var p = a.match(h)[0], q = p.substr(2, p.length - 4), r = q.split(" "), s = r[0], t = r[1];
                2 < r.length && (t = q.substr(q.indexOf(" ")));
                var u = {
                    text: t,
                    symbol: s,
                    type: "stock"
                };
                d.push(s), 2 > j && c.push(u);
            } else 2 > j && c.push.apply(c, b(e(a)));
        }), {
            content: c,
            stocks: d
        };
    }
    function e(a) {
        var b = [], c = /(\[\S{1,3}\])/, d = /\[\S{1,3}\]/, e = a.split(c);
        return e.forEach(function(a) {
            try {
                var c = a.match(d)[0].substr(1, a.length - 2), e = f(c);
                if (!e) throw "not emoji"; else {
                    var g = {
                        type: "emoji",
                        emojiName: c,
                        emojiPage: e.page,
                        emojiId: e.id,
                        content: "emoji" + c
                    };
                    b.push(g);
                }
            } catch (c) {
                b.push({
                    text: a,
                    type: "plain"
                });
            }
        }), b;
    }
    function f(a) {
        var b = n.indexOf(a);
        if (0 > b) return !1;
        var c = g(b / 20);
        return {
            page: c,
            id: b - 20 * c
        };
    }
    var g = Math.floor, h = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, i = require("../utils/ppdog"), j = a(i), k = require("../utils/regenerator-runtime"), l = a(k), m = require("../utils/RequestApi"), n = [ "微笑", "撇嘴", "色", "发呆", "得意", "流泪", "害羞", "闭嘴", "睡", "大哭", "尴尬", "发怒", "调皮", "呲牙", "惊讶", "难过", "酷", "冷汗", "抓狂", "吐", "偷笑", "愉快", "白眼", "傲慢", "饥饿", "困", "惊恐", "流汗", "憨笑", "悠闲", "奋斗", "咒骂", "疑问", "嘘", "晕", "疯了", "衰", "骷髅", "敲打", "再见", "擦汗", "抠鼻", "鼓掌", "糗大了", "坏笑", "左哼哼", "右哼哼", "哈欠", "鄙视", "委屈", "快哭了", "阴险", "亲亲", "吓", "可怜", "菜刀", "西瓜", "啤酒", "篮球", "乒乓", "咖啡", "饭", "猪头", "玫瑰", "凋谢", "嘴唇", "爱心", "心碎", "蛋糕", "闪电", "炸弹", "刀", "足球", "瓢虫", "便便", "月亮", "太阳", "礼物", "拥抱", "强", "弱", "握手", "胜利", "抱拳", "勾引", "拳头", "差劲", "爱你", "NO", "OK", "爱情", "飞吻", "跳跳", "发抖", "怄火", "转圈", "磕头", "回头", "跳绳", "投降" ];
    module.exports = function(a, b) {
        var e = a.rss_list || a.content || a.comment, f = [], g = a.subject_dict || null;
        Array.isArray(e) ? f = e : f.push(e);
        var i = [];
        e && f.forEach(function(b) {
            if (!a.rss_list || "" == b.comment_id || b.topicAd) {
                var e = "" == b.comment_id ? b.subject_id : b.root_id, f = "" == b.comment_id ? b.subject_id : b.comment_id, j = !1;
                try {
                    var k = wx.getStorageSync("illegalReport");
                    k && k[f] && (j = !0);
                } catch (a) {}
                var l = "" != b.comment_id, m = c(b.created_at), n = g && g[e] ? g[e] : {
                    content: b.content
                };
                if (n.content) {
                    var o = d(n.content);
                    n.content_array = o.content, n.stocks = o.stocks;
                    var p = g ? n.type : b.type, q = g ? n.news_id : b.news_id;
                    if (3 == p && q) {
                        var r = q.split("_"), s = r[1] || null;
                        n.resourceType = s;
                    }
                    var t = h({}, b, {
                        search_id: e,
                        id: f,
                        isIllegalReport: j,
                        isReply: l,
                        image_list: b.image_list || n.image_list,
                        detailInfo: n,
                        time: m.time,
                        formatTime: m.formatTime,
                        litype: n.type || b.publishType
                    });
                    i.push(t);
                }
            }
        });
        var j = h({}, a, {
            commentsData: i
        });
        return b(j);
    };
})();