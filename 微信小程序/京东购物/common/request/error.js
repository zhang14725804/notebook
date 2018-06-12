function e(e, o) {
    if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function");
}

function o(e, o) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !o || "object" != typeof o && "function" != typeof o ? e : o;
}

function t(e, o) {
    if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + typeof o);
    e.prototype = Object.create(o && o.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : e.__proto__ = o);
}

var s = {
    DEFAULT_ERROR: {
        code: 1,
        message: "网络繁忙，请稍后再试"
    },
    TIMEOUT_ERROR: {
        code: -10,
        message: "您的网络有点慢"
    },
    CONNECT_ERROR: {
        code: -20,
        message: "网络连接发起失败"
    },
    STATUS_CODE_ERROR: {
        code: -30,
        message: "网络响应状态码异常"
    },
    REQUEST_ERROR: {
        code: -40,
        message: "网络请求发送失败"
    },
    GATEWAY_ERROR: {
        code: -50,
        message: "网络连接建立失败"
    },
    SEND_MSG_ERROR: {
        code: -424,
        message: "网络消息发送失败"
    }
}, r = {
    code: -415,
    message: "网络数据解析失败"
}, n = {
    code: -1024,
    message: "域名异常，请求无法完成"
}, c = function(r) {
    function n(t) {
        e(this, n), "string" == typeof t && (t = {
            message: t
        });
        var r = t, c = r.code, R = void 0 === c ? s.DEFAULT_ERROR.code : c, a = r.message, i = void 0 === a ? s.DEFAULT_ERROR.message : a, E = r.detail, u = void 0 === E ? "NETWORK ERROR" : E, O = o(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, i));
        return O.code = R, O.detail = u, O;
    }
    return t(n, Error), n;
}();

module.exports = c, module.exports.NETWORK = s, module.exports.JSON_ERROR = r, module.exports.SPECIAL_DOMAIN = n;