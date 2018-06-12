var e = getApp(), t = "";

module.exports = {
    $e_labelAdd: function() {
        this.labelAlertToggle();
    },
    $e_labelSubmit: function(e) {
        this.checkLabelValidate() && this.labelSubmit(e);
    },
    toggleLabel: function(e) {
        var t = e.target.dataset, a = t.index, l = t.type, i = t.id;
        if (!t.disabled) {
            var s = this.labelAssembly(a, l, i);
            this.setDataLazy({
                serviceSeekData: s
            });
        }
    },
    labelAssembly: function(e, t, a) {
        var l = this.data.serviceSeekData, i = l[e];
        return i.map(function(e, l) {
            return t !== e.type && e.id !== a && (e.selected = !1), e.id === a && (e.selected = !e.selected), 
            e;
        }), l[e] = i, this.shopAndRentAssembly(l);
    },
    shopAndRentAssembly: function(e) {
        if ("3" !== this.data.cateid) return e;
        var t = [].concat.apply([], e), a = t.filter(function(e, t) {
            return "10" !== e.type && e.selected;
        }), l = t.filter(function(e, t) {
            return "1" === e.type && e.selected;
        });
        return e.map(function(e, t) {
            return e.map(function(e, t) {
                return "9" === e.type && l.length || a.length && "10" === e.type ? (e.disabled = !0, 
                e.selected = !1) : e.disabled = !1, e;
            });
        });
    },
    labelSubmit: function(a) {
        var l = this;
        e.request(e.pathData.serviceSeekDetail.ADD_LABEL_PATH, {
            label: t,
            type: this.data.cateid
        }).then(function(t) {
            l.labelAlertToggle();
            var a = 0 == t.code ? "登记成功" : t.msg ? t.msg : "登记失败";
            0 == t.code ? e.toast(a) : e.toastError(a);
        });
    },
    getLabelInput: function(e) {
        this.data.labelTips && this.setDataLazy({
            labelTips: ""
        }), t = e.detail.value;
    },
    checkLabelValidate: function() {
        var e = "";
        return t.trim() ? !(t.trim().length > 7) || (e = "最多输入7个字", this.setDataLazy({
            labelTips: e
        }), !1) : (e = "标签不能为空", this.setDataLazy({
            labelTips: e
        }), !1);
    },
    labelAlertToggle: function(e) {
        t = "", this.setDataLazy({
            isLabelAlertShow: !this.data.isLabelAlertShow,
            labelTips: ""
        });
    }
};