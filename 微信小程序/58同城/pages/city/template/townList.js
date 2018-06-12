var t = getApp();

module.exports = {
    getTownListById: function(e) {
        var n = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        arguments[2];
        this.setDataLazy({
            townDetailList: []
        }), i && e.length ? this.getSubListById(e, i) : t.request(t.pathData.city.GET_TOWN_LIST_BY_ID, {
            provinceId: i
        }).then(function(t) {
            if (!i && (n.townNavIndex = 0), !t.error) {
                var e = n.reSetListChecked(t.data.list), a = n.data.townNavList;
                a[n.townNavIndex].list = e, n.setDataLazy({
                    townDetailList: e,
                    townNavList: a
                });
            }
        });
    },
    getSubListById: function(t, e) {
        t = t.filter(function(t) {
            return t.id === e;
        }), t = this.reSetListChecked(t.length && t[0].list || []);
        var n = this.data.townNavList;
        n[this.townNavIndex].list = t, this.setDataLazy({
            townDetailList: t,
            townNavList: n
        });
    },
    $e_townItem: function(t) {
        var e = t.currentTarget.dataset.townId;
        "-1" !== e && this.goToOtherProgram(e);
    },
    e_listItemTap: function(t) {
        var e = t.currentTarget.dataset, n = e.townId, i = e.name, a = t.currentTarget.id;
        if (3 != this.townNavIndex) {
            this.setTownNavListAndChecked(n, i, a);
            var s = 0 === this.townNavIndex ? [] : this.data.townDetailList;
            this.townNavIndex++, this.getTownListById(s, n);
        } else this.goToOtherProgram(n);
    },
    setTownNavListAndChecked: function(t, e, n) {
        var i = this, a = [].concat(this.data.townNavList), s = {}, o = this.setListChecked(this.data.townDetailList, t);
        a = a.map(function(n, a) {
            return n.checked = !1, a < i.townNavIndex ? n : (s = a === i.townNavIndex ? {
                id: t,
                name: e.replace(/(.{2})(.+)(.{2})/, "$1...$3"),
                list: o,
                scrollTop: i.scrollTop
            } : {
                id: "-1",
                name: "",
                list: [],
                scrollTop: 0,
                checked: a === i.townNavIndex + 1
            }, n = Object.assign({}, n, s));
        }), this.setDataLazy({
            townNavList: a
        });
    },
    setListChecked: function(t, e) {
        return t.map(function(t) {
            return t.checked = t.id === e, t;
        });
    },
    reSetListChecked: function(t) {
        return t.map(function(t) {
            return t.checked = !1, t;
        });
    },
    goToOtherProgram: function(e) {
        wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
            appId: "wxee214e01d07c9db0",
            path: "/pages/index/index?localId=" + e,
            success: function(t) {
                console.log("打开成功");
            }
        }) : t.alert("当前微信版本过低，无法跳转同城小程序，请升级到最新微信版本后重试。");
    }
};