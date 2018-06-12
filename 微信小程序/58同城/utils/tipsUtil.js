var o = Object.assign || function(o) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (o[e] = n[e]);
    }
    return o;
};

module.exports = {
    toastError: function(o) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2e3;
        wx.showToast && wx.showToast({
            image: "/images/tips.png",
            title: o,
            duration: t
        });
    },
    toast: function(t, n) {
        n = o({
            duration: 1500,
            icon: "",
            complete: null,
            close: null
        }, n), wx.showToast && wx.showToast(o({
            title: t
        }, n)), n.close && setTimeout(function() {
            n.close();
        }, n.duration);
    },
    alert: function(t, n) {
        var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return !n && t && (n = t, t = "提示"), new Promise(function(i) {
            wx.showModal && wx.showModal(o({
                title: t,
                showCancel: !1,
                content: n,
                confirmColor: "#FF552E",
                success: function(o) {
                    i(o.confirm);
                }
            }, e));
        });
    },
    confirm: function(o, t, n, e, i) {
        return function() {
            var s = this, a = arguments;
            return new Promise(function(r) {
                wx.showModal && wx.showModal({
                    title: o,
                    content: t,
                    complete: i,
                    confirmColor: "#FF552E",
                    success: function(o) {
                        o.confirm ? (r(!0), n && n.apply(s, a)) : (r(!1), e && e.apply(s, a));
                    }
                });
            });
        };
    },
    showLoading: function() {
        var t = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "正在加载...", e = arguments[1];
        e = o({
            delay: 2e3,
            complete: null
        }, e = e || {}), wx.showLoading && wx.showLoading(o({
            title: n,
            mask: !0
        }, e)), e && e.complete && setTimeout(function() {
            !1 !== (e.complete && e.complete()) && t.hideLoading();
        }, delay), setTimeout(this.hideLoading, e.timeout || 5e3);
    },
    hideLoading: function() {
        wx.hideLoading && wx.hideLoading();
    },
    phoneConfirmModal: function(o) {
        var t = o.substring(0, 3) + "****" + o.substr(-4);
        this.confirm("拨打电话", "" + t)().then(function(t) {
            t && wx.makePhoneCall({
                phoneNumber: o
            });
        });
    }
};