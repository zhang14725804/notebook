var t = require("./tipsUtil"), e = {
    tel400: {
        getPhone: function(r) {
            var a = this;
            return new Promise(function(n, s) {
                a.request(a.pathData.CHEPHONE_PATH, r).then(function(s) {
                    if (!s.error || !s.data.msg) {
                        if (1 == (s = JSON.parse(s.data)).status) {
                            var i = s.result;
                            return "0000" == i || "" == i ? void a.toast("点击过于频繁，请稍后再试！", 1e3) : 8 === r.cateCode ? n(s) : void a.phoneConfirmModal(i);
                        }
                        return n(e.tel400.verifyShow.bind(a)(s));
                    }
                    t.alert("提示", s.data.msg);
                });
            });
        },
        verifyShow: function(t) {
            var e = this;
            return new Promise(function(r, a) {
                e.storage.setSync(e.constData.STORAGE_VERIFY_KEY, t.result), r(t.result.ct ? e.constData.PREFIX_VERIFY + t.result.ct : "data:image/png;base64," + t.result.img);
            });
        }
    }
};

module.exports = e;