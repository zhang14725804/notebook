getApp();

module.exports = {
    methodOptions: {
        e_telAlertClose: {
            type: "click"
        },
        e_phoneConfirm: {
            type: "click"
        }
    },
    e_telAlertClose: function() {
        this.telAlertHide();
    },
    telAlertShow: function(e) {
        this.setDataLazy({
            isTelAlertShow: !0,
            telCountTime: 180,
            telNum: e
        }), this.alertCountTime();
    },
    telAlertHide: function() {
        this.setDataLazy({
            isTelAlertShow: !1,
            telCountTime: 180
        }), clearInterval(this.telAlertIntervel);
    },
    alertCountTime: function() {
        var e = this, t = 180;
        t !== this.data.telCountTime && this.setDataLazy({
            telCountTime: t
        }), clearInterval(this.telAlertIntervel), this.telAlertIntervel = setInterval(function() {
            if (0 == --t) return clearInterval(e.telAlertIntervel), void e.telAlertHide();
            e.setDataLazy({
                telCountTime: t
            });
        }, 1e3);
    },
    e_phoneConfirm: function() {
        this.telAlertHide(), wx.makePhoneCall({
            phoneNumber: this.data.telNum
        });
    }
};