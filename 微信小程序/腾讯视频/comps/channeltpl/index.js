var e = require("../../module/recreport"), t = getApp(), i = t && t.global && t.global.env_type;

module.exports = {
    modShow: function(t, i, o) {
        if (!i._reported) {
            var r = this;
            i._reported = !0, i.list.forEach(function(a) {
                try {
                    var l = e.fieldPick(a, i.meta.seq_num);
                    l.ztid = t, e.report.call(r, "show", {
                        recReportData: l
                    }, o || 0, "channel_recommend");
                } catch (e) {}
            });
        }
    },
    onPlay: function(t) {
        var i = t.currentTarget.dataset, o = i.id, r = +i.type, a = "";
        try {
            var l = this.data.modList[i.modidx], n = l.list[i.index], c = e.fieldPick(n, l.meta.seq_num);
            c.ztid = CHANNEL_ID, a = e.report.call(this, "click", {
                recReportData: c
            }, i.modidx, "channel_recommend");
        } catch (e) {} finally {
            var s = "&parentParams=" + encodeURIComponent(a);
            if (4 === r || 104 === r) this.$route("live?pid=" + o + s); else if (3 === r || 103 === r) this.$route("play?lid=" + o + s); else if (2 === r || 102 === r) this.$route("play?cid=" + o + s); else if (1 === r || 101 === r) this.$route("play?vid=" + o + s); else if (106 === r || 107 === r) {
                var d = i.vid, p = i.cid;
                this.$route("play?" + (d ? "vid=" + d : "") + "&" + (p ? "cid=" + p : ""));
            } else 15 === o.length ? this.$route("play?cid=" + o + s) : this.$route("play?vid=" + o + s);
        }
    },
    onShow: function() {
        var e = getApp();
        e && e.global && e.global.env_type !== i && (console.log("👌 swtich"), i = e.global.env_type, 
        this.onRefresh());
    },
    onAwake: function() {
        this.onRefresh();
    }
};