var t = getApp();

module.exports = function() {
    return {
        methodOptions: {
            e_phone: {
                type: "phone"
            },
            e_verifyTel: {
                type: "phone"
            }
        },
        params: {
            infoId: "",
            cateCode: ""
        },
        $e_phone: function(e) {
            var a = this, r = e.currentTarget.dataset, s = r.infoid, n = r.catecode;
            this.data.currInfoId = s, this.data.currentCateCode = n;
            t.getPageRoute(0).split("/");
            t.eventHandle.emit("call-phone", function(e) {
                1 !== e.status ? e && a.verifyDataSet(e) : !a.urlParams.cateId || a.urlParams.cateId && "31" !== a.urlParams.cateId ? a.telAlertShow(e.result) : t.phoneConfirmModal(e.result);
            }, {
                infoId: s,
                cateCode: n
            }), 8 == n && r.adclickurl && wx.request({
                url: r.adclickurl,
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {}
            });
        },
        verifyDataSet: function(t) {
            this.setDataLazy({
                verifyLoad: !0,
                verifyValue: "",
                btnFlag: !0,
                verifyPic: t
            });
        },
        verifyFocusDataSet: function() {
            this.setDataLazy({
                verifyValue: "",
                btnFlag: !0,
                verifyFocus: !0
            });
        },
        refreshVerify: function(e) {
            var a = this;
            return t.request(t.pathData.REFRESH_PATH, e).then(function(e) {
                if (e.error) t.alert("网络异常,请稍后重试"); else {
                    var r = e.data ? JSON.parse(e.data) : {};
                    a.refreshVerifyPic(r);
                }
            });
        },
        refreshVerifyPic: function(e) {
            var a = t.storage.getSync(t.constData.STORAGE_VERIFY_KEY);
            a && (a.responseid = e.result.responseid), t.storage.setSync(t.constData.STORAGE_VERIFY_KEY, a);
            var r = e.result.ct ? t.constData.PREFIX_VERIFY + e.result.ct : "data:image/png;base64," + e.result.img;
            this.verifyDataSet(r);
        },
        cancleTel: function() {
            this.setDataLazy({
                verifyLoad: !1
            });
        },
        verifyInput: function(e) {
            var a = e.detail.value;
            if (a && a.length >= 4) {
                var r = t.storage.getSync(t.constData.STORAGE_VERIFY_KEY);
                r && (r.vc = e.detail.value), t.storage.setSync(t.constData.STORAGE_VERIFY_KEY, r), 
                this.setDataLazy({
                    btnFlag: !1
                });
            } else this.setDataLazy({
                btnFlag: !0
            });
        },
        $e_verifyTel: function(e) {
            var a = this, r = t.storage.getSync(t.constData.STORAGE_VERIFY_KEY);
            return t.request(t.pathData.CHECK_PATH, {
                infoId: this.data.currInfoId,
                cateCode: this.data.currentCateCode,
                rid: r.responseid,
                vc: r.vc
            }).then(function(e) {
                if (e.error) t.alert("网络异常,请稍后重试"); else {
                    if (!e.data) return a.setDataLazy({
                        verifyValue: "",
                        btnFlag: !0,
                        verifyFocus: !0
                    }), void t.toast("请输入正确的验证码", {
                        duration: 1e3
                    });
                    var r = e.data ? JSON.parse(e.data) : {};
                    if (1 == r.status) {
                        if (a.setDataLazy({
                            verifyLoad: !1
                        }), 8 === a.data.currentCateCode && (!a.urlParams.cateId || a.urlParams.cateId && "31" !== a.urlParams.cateId)) return void a.telAlertShow(r.result);
                        t.phoneConfirmModal(r.result);
                    } else t.toast("请输入正确的验证码", {
                        duration: 1e3
                    }), a.refreshVerifyPic(r);
                }
            });
        }
    };
};