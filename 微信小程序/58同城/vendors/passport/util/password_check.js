var t = {
    validate: function(t, r) {
        var s = this.checkpwd(t);
        return "" == t ? (r({
            msg: "您还未输入新密码"
        }), !1) : t.match("^[\\s\\S]{6,}$") ? t.match("^(.){6,16}$") ? s ? t.match("^[a-z|A-Z]+$") && (this.isContinuousChar(t) || this.isSameChar(t)) ? (r({
            msg: "新密码不能为重复字母和连续字母"
        }), !1) : t.match("^[\\d]+$") && (this.isContinuousChar(t) || this.isSameChar(t)) ? (r({
            msg: "新密码不能为重复数字和连续数字"
        }), !1) : !this.isSameChar(t) || (r({
            msg: "新密码不能全为相同的字符"
        }), !1) : (r({
            msg: "密码强度低：至少包含大写字母、小写字母、数字、特殊字符任意三种"
        }), !1) : (r({
            msg: "新密码不应超过16个字符"
        }), !1) : (r({
            msg: "新密码太短，最少为6位"
        }), !1);
    },
    isContinuousChar: function(t) {
        for (var t = t.toLowerCase(), r = 0, s = 0; s < t.length; s++) {
            if (t.charCodeAt(s) != r + 1 && 0 != r) return !1;
            r = t.charCodeAt(s);
        }
        return !0;
    },
    isSameChar: function(t) {
        for (var t = t.toLowerCase(), r = 0, s = 0; s < t.length; s++) {
            if (t.charCodeAt(s) != r && 0 != r) return !1;
            r = t.charCodeAt(s);
        }
        return !0;
    },
    checkpwd: function(t) {
        if ("" != t) {
            var r = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？_]"), s = !!t.match("(.*[A-Z]+.*)"), a = !!t.match("(.*[a-z]+.*)"), h = !!t.match(".*[\\d]+.*"), e = r.test(t), i = [], n = 0;
            i.push(s), i.push(a), i.push(h), i.push(e);
            for (var o = 0; o < i.length; o++) 0 == i[o] && n++;
            return !(n >= 2);
        }
    }
};

module.exports = {
    passport_pwdCheck: t
};