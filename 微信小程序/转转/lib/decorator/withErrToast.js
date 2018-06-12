function _asyncToGenerator(r) {
    return function() {
        var e = r.apply(this, arguments);
        return new Promise(function(r, t) {
            function n(a, o) {
                try {
                    var u = e[a](o), i = u.value;
                } catch (r) {
                    return void t(r);
                }
                if (!u.done) return Promise.resolve(i).then(function(r) {
                    n("next", r);
                }, function(r) {
                    n("throw", r);
                });
                r(i);
            }
            return n("next");
        });
    };
}

function withErrToast(r) {
    var e = r.defaultMsg, t = r.duration, n = void 0 === t ? 2e3 : t;
    return function(r, t, a) {
        var o = a.value;
        a.value = _asyncToGenerator(regeneratorRuntime.mark(function r() {
            var a, u, i = arguments;
            return regeneratorRuntime.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    return a = "", u = "", r.prev = 2, r.next = 5, o.apply(this, i);

                  case 5:
                    u = r.sent, "ok" != u && (a = "string" != typeof u || /^\s*$/.test(u) ? e : u), 
                    r.next = 13;
                    break;

                  case 9:
                    r.prev = 9, r.t0 = r.catch(2), a = e, console.error("caught err with func:", t, r.t0);

                  case 13:
                    return a && this.$toast({
                        title: a,
                        type: "fail",
                        duration: n
                    }), r.abrupt("return", u);

                  case 15:
                  case "end":
                    return r.stop();
                }
            }, r, this, [ [ 2, 9 ] ]);
        }));
    };
}

function errSafe(r, e, t) {
    var n = t.value;
    t.value = function() {
        try {
            return n.apply(this, arguments);
        } catch (r) {
            console.error("[errSafe decorator] caught err with func:", e, r);
        }
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.withErrToast = withErrToast, exports.errSafe = errSafe;