function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t;
    };
}(), a = e(require("../../storage/ram_manager")), o = e(require("../../common/util")), i = function() {
    function e(n) {
        t(this, e), this.setDataFunc = n.setDataFunc;
    }
    return n(e, [ {
        key: "show",
        value: function(e) {
            this.setDataFunc && (e.visible = !0, void 0 === e.showCancel && (e.showCancel = !0), 
            void 0 === e.reportFormId && (e.reportFormId = !1), this.modalData = e, a.default.CPPage.onModalCancel = o.default.bind(this.onModalCancel, this), 
            a.default.CPPage.onModalConfirm = o.default.bind(this.onModalConfirm, this), a.default.CPPage.onModalClose = o.default.bind(this.onModalClose, this), 
            this.setDataFunc(e));
        }
    }, {
        key: "onModalCancel",
        value: function() {
            this.hide();
            var e = this.modalData.success;
            "function" == typeof e && e({
                cancel: !0
            });
        }
    }, {
        key: "onModalConfirm",
        value: function() {
            this.hide();
            var e = this.modalData.success;
            "function" == typeof e && e({
                confirm: !0
            });
        }
    }, {
        key: "onModalClose",
        value: function() {
            this.hide();
            var e = this.modalData.success;
            "function" == typeof e && e({
                close: !0
            });
        }
    }, {
        key: "hide",
        value: function() {
            this.setDataFunc({
                visible: !1
            });
        }
    } ]), e;
}();

exports.default = i;