Component({
    properties: {
        datas: {
            type: Array,
            value: []
        },
        childs: {
            type: Array,
            value: []
        },
        visible: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        inputs: [],
        activeIndex: 0,
        childs: []
    },
    created: function() {},
    methods: {
        onClose: function() {
            this.setData({
                visible: !1
            });
        },
        onTapMenu: function(t) {
            this.setData({
                activeIndex: t.currentTarget.dataset.index,
                childs: t.currentTarget.dataset.data.ChildProject
            });
        },
        onTapPj: function(t) {
            for (var a = !0, e = this.data.datas, i = t.currentTarget.dataset.data, r = t.currentTarget.dataset.index, n = e[this.data.activeIndex].input, d = 0; d < n.length; ++d) n[d].ProjectId == i.ProjectId && (n.splice(d, 1), 
            a = !1);
            a ? (e[this.data.activeIndex].ChildProject[r].IsEnable = !0, n.push(i)) : e[this.data.activeIndex].ChildProject[r].IsEnable = !1, 
            e[this.data.activeIndex].input = n, this.data.childs = e[this.data.activeIndex].ChildProject, 
            this.setData({
                datas: e,
                childs: this.data.childs
            });
        },
        selectAll: function() {
            var t = this.data.activeIndex, a = this.data.datas;
            console.log(a[t]), a[t].input = [];
            var e = !0, i = !1, r = void 0;
            try {
                for (var n, d = a[t].ChildProject[Symbol.iterator](); !(e = (n = d.next()).done); e = !0) {
                    var s = n.value;
                    s.IsEnable = !0, a[t].input.push(s);
                }
            } catch (t) {
                i = !0, r = t;
            } finally {
                try {
                    !e && d.return && d.return();
                } finally {
                    if (i) throw r;
                }
            }
            this.setData({
                datas: a,
                childs: this.data.datas[this.data.activeIndex].ChildProject
            });
        },
        emptyAll: function() {
            var t = this.data.datas, a = this.data.activeIndex;
            t[a].input = [];
            var e = !0, i = !1, r = void 0;
            try {
                for (var n, d = t[a].ChildProject[Symbol.iterator](); !(e = (n = d.next()).done); e = !0) n.value.IsEnable = !1;
            } catch (t) {
                i = !0, r = t;
            } finally {
                try {
                    !e && d.return && d.return();
                } finally {
                    if (i) throw r;
                }
            }
            this.setData({
                datas: t,
                childs: this.data.datas[this.data.activeIndex].ChildProject
            });
        },
        comfim: function() {
            var t = this.data.datas, a = [], e = !0, i = !1, r = void 0;
            try {
                for (var n, d = t[Symbol.iterator](); !(e = (n = d.next()).done); e = !0) {
                    var s = n.value, l = !0, o = !1, c = void 0;
                    try {
                        for (var h, u = s.input[Symbol.iterator](); !(l = (h = u.next()).done); l = !0) h.value.IsEnable = !0;
                    } catch (t) {
                        o = !0, c = t;
                    } finally {
                        try {
                            !l && u.return && u.return();
                        } finally {
                            if (o) throw c;
                        }
                    }
                    a = a.concat(s.input);
                }
            } catch (t) {
                i = !0, r = t;
            } finally {
                try {
                    !e && d.return && d.return();
                } finally {
                    if (i) throw r;
                }
            }
            if (!a.length) return wx.showToast({
                title: "请选择项目",
                duration: 2e3
            });
            wx.showLoading({
                title: "正在加载"
            }), this.setData({
                visible: !1
            }), this.triggerEvent("changeProject", a);
        }
    }
});