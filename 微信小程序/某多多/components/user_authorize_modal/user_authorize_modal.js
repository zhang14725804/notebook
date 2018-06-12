function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, a, i) {
        return a && e(t.prototype, a), i && e(t, i), t;
    };
}(), a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../storage/ram_manager")), i = function() {
    function i(t) {
        e(this, i), this.dataObj = {
            userAuthorizeModal_visible: !1,
            userAuthorizeModal_src: "https://minipinduoduo.oss-cn-shanghai.aliyuncs.com/user_authorization_model/logo%402x.png",
            userAuthorizeModal_safe_src: "https://minipinduoduo.oss-cn-shanghai.aliyuncs.com/user_authorization_model/safe%402x.png",
            userAuthorizeModal_type: a.default.user_authorization_model_type
        }, t && (this.setDataFunc = t.setDataFunc);
    }
    return t(i, [ {
        key: "show",
        value: function() {
            this.dataObj.userAuthorizeModal_visible = !0, this.setDataFunc && this.setDataFunc(this.dataObj);
        }
    }, {
        key: "hide",
        value: function() {
            this.dataObj.userAuthorizeModal_visible = !1, this.setDataFunc && this.setDataFunc(this.dataObj);
        }
    }, {
        key: "isAuthorizeModalVisible",
        value: function() {
            return this.dataObj.userAuthorizeModal_visible;
        }
    } ]), i;
}();

exports.default = i;