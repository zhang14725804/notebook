function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("../../common/request")), t = e(require("../../storage/ram_manager")), a = e(require("../../libs/co/we-index")), n = e(require("../../libs/regenerator-runtime/runtime")), u = {
    createGroup: function(e, r, a) {
        this.orderSn = e, this.createOrderFunc = r, this.failCallback = a;
        var n = this;
        t.default.CPPage.$showToast("该团已满，正在开新团...", {
            hideToastFunc: function() {
                e ? n.tryCancelPreOrder(e) : n.createOrder();
            }
        });
    },
    tryCancelPreOrder: function(e) {
        var u = this;
        (0, a.default)(n.default.mark(function a() {
            var c;
            return n.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return a.prev = 0, c = r.default.requestDataWithCmd("10354", {
                        restfulParam: e
                    }), a.next = 4, r.default.runSecondaryRequestForPage(c, t.default.CPPage);

                  case 4:
                    u.createOrder(), a.next = 10;
                    break;

                  case 7:
                    a.prev = 7, a.t0 = a.catch(0), "function" == typeof u.failCallback && u.failCallback();

                  case 10:
                  case "end":
                    return a.stop();
                }
            }, a, this, [ [ 0, 7 ] ]);
        }));
    },
    createOrder: function() {
        "function" == typeof this.createOrderFunc && this.createOrderFunc();
    }
};

exports.default = u;