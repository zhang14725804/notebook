var t = getApp(), e = {
    login: function(e, i) {
        t.fetch("/user/thirdlogin", {
            thirdKey: e.thirdKey
        }, function(t, e) {
            t || "function" == typeof i && i(e);
        });
    }
};

module.exports = e;