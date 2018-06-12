var e = require("./util"), n = module.exports = function(e) {
    this.openid = e.openid, this.openkey = e.openkey, this.sessionid = e.sessionid, 
    this.sessiontype = e.sessiontype, this.sessionToken = this.openid + new Date().getTime();
};

e.fn.extend(n.prototype, {
    getSessionParam: function() {
        return {
            openid: encodeURIComponent(this.openid),
            openkey: encodeURIComponent(this.openkey),
            session_id: encodeURIComponent(this.sessionid),
            session_type: encodeURIComponent(this.sessiontype)
        };
    },
    addSessionParam: function(n) {
        return e.fn.addParam({
            openid: encodeURIComponent(this.openid),
            openkey: encodeURIComponent(this.openkey),
            sessionid: encodeURIComponent(this.sessionid),
            sessiontype: encodeURIComponent(this.sessiontype)
        }, n);
    },
    getUin: function() {
        return "";
    }
});