getApp();

module.exports = {
    e_navChange: function(t) {
        var i = t.currentTarget.dataset.index, s = this.data.townNavList;
        if (!(0 === i && "-1" === s[0].id || 0 !== i && "-1" === s[i - 1].id || this.townNavIndex === i)) {
            this.townNavIndex = i;
            var a = s.map(function(t, s) {
                return t.checked = s === i, t;
            });
            if (this.setDataLazy({
                townNavList: a
            }), s[i] && s[i].list && s[i].list.length) this.setDataLazy({
                townDetailList: s[i].list,
                scrollTop: s[i].scrollTop ? s[i].scrollTop : this.resetScrollTop()
            }); else {
                var e = 0 === i ? "" : s[i - 1].id, n = 1 === i ? [] : this.data.townDetailList;
                this.getTownListById(n, e, !0);
            }
        }
    }
};