var e = void 0, r = {
    userData: {
        _getProfilePromise: null,
        getProfile: function() {
            var t = getApp();
            if (r._getProfilePromise) return r._getProfilePromise;
            var o = void 0, i = r._getProfilePromise = new Promise(function(e) {
                o = e;
            }), n = function(e) {
                var t = e.pic, i = e.name;
                o({
                    pic: t,
                    name: i
                }), r._getProfilePromise = null;
            };
            return (e = t.storage.getSync(t.constData.PROFILE_KEY)) ? n(e) : t.storage.getSync("userLogout") ? n({}) : t.request("/user/profile").then(function(e) {
                e.error ? n({}) : (t.storage.setSync(t.constData.PROFILE_KEY, e.data, !0), n(e.data));
            }), i;
        }
    }
};

module.exports = r;