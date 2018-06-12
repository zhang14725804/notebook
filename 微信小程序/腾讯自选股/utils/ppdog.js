(function() {
    function a(b) {
        Error.call(this), this.message = b, this.name = a.name, "function" == typeof Error.captureStackTrace && Error.captureStackTrace(this, a);
    }
    var b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
        return typeof a;
    } : function(a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
    };
    a.prototype = Object.create(Error.prototype), a.prototype.constructor = a, Function.prototype.bind || (Function.prototype.bind = function(a) {
        if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var b = Array.prototype.slice, c = b.call(arguments, 1), d = this, e = function() {}, f = function() {
            return d.apply(this instanceof e ? this : a, c.concat(b.call(arguments)));
        };
        return this.prototype && (e.prototype = this.prototype), f.prototype = new e(), 
        f;
    });
    (function(c) {
        function d(a) {
            var b = this;
            Object.defineProperties(this, {
                _subscribers: {
                    value: []
                },
                _invokeHandlers: {
                    value: [],
                    writable: !0
                },
                _invokeHandler: {
                    value: r,
                    writable: !0
                },
                _filterHandles: {
                    value: [],
                    writable: !0
                },
                _filterHandle: {
                    value: t,
                    writable: !0
                },
                resolve: {
                    value: this.resolve.bind(this)
                },
                reject: {
                    value: this.reject.bind(this)
                }
            }), "function" == typeof a && E(function() {
                try {
                    b.resolve(a());
                } catch (a) {
                    b.reject(a);
                }
            });
        }
        function e(a) {
            return a instanceof d;
        }
        function f(a) {
            return e(a) ? a : m(a);
        }
        function g(a) {
            return !!a && "fucntion" == typeof a.next && "function" == typeof a["throw"];
        }
        function h(a) {
            if (!a) return !1;
            var b = a.constructor;
            return !!b && ("GeneratorFunction" === b.name || "GeneratorFunction" === b.displayName || g(b.prototype));
        }
        function i(a) {
            return function(b, c) {
                return b instanceof Error ? a.reject(b) : 2 > arguments.length ? a.resolve(b) : void (c = null === b || void 0 === b ? G.call(arguments, 1) : G.call(arguments, 0), 
                1 === c.length ? a.resolve(c[0]) : a.resolve(c));
            };
        }
        function j() {
            if (h(fn) || g(fn)) return p(fn);
            var a = function() {
                return this;
            }(), b = new d();
            return fn.call(a, i(b)), b;
        }
        function k(a) {
            var b = 0;
            return F.call(a, function() {
                ++b;
            }), b;
        }
        function l(a) {
            var b = new d();
            return b.reject(a), b;
        }
        function m(a) {
            var b = new d();
            return b.resolve(a), b;
        }
        function n(a) {
            return f(a).then(function(a) {
                var b = new d();
                return F.call(a, function(a) {
                    f(a).fill(b);
                }), b;
            });
        }
        function o(a) {
            return f(a).then(function(a) {
                var b = a.length, c = k(a), e = Array(b);
                if (0 === c) return e;
                var g = new d();
                return F.call(a, function(a, b) {
                    f(a).then(function(a) {
                        e[b] = a, 0 == --c && g.resolve(e);
                    }, g.reject);
                }), g;
            });
        }
        function p(a) {
            function b(b) {
                try {
                    e(a.next(b));
                } catch (a) {
                    i.reject(a);
                }
            }
            function c(b) {
                try {
                    e(a["throw"](b));
                } catch (a) {
                    i.reject(a);
                }
            }
            function e(a) {
                a.done ? i.resolve(a.value) : ("function" == typeof a.value ? j(a.value) : f(a.value)).then(b, c);
            }
            var g = function() {
                return this;
            }();
            if ("function" == typeof a) {
                var h = G.call(arguments, 1);
                a = a.apply(g, h);
            }
            if (!a || "function" != typeof a.next) return f(a);
            var i = new d();
            return b(), i;
        }
        function q(a, b) {
            return function() {
                return b = b || this, o(arguments).then(function(c) {
                    var d = a.apply(b, c);
                    return h(d) || g(d) ? p.call(b, d) : d;
                });
            };
        }
        function r() {
            return null;
        }
        function s(a, b) {
            this._invokeHandlers.push(a), this._invokeHandler = this._invokeHandlers.reduceRight(function(a, c) {
                return function(e) {
                    return d.toPromise(c(e, b, a));
                };
            }, r);
        }
        function t(a) {
            return d.promise(function(b) {
                b(a);
            });
        }
        function u(a) {
            this._filterHandles.push(a), this._filterHandle = this._filterHandles.reduceRight(function(a, b) {
                return function(c) {
                    return d.toPromise(b(c, a));
                };
            }, t);
        }
        function v(a, b, c) {
            return 2 < arguments.length ? o(a).then(function() {
                return f(c).then(function(c) {
                    return a.reduceRight(b, c);
                });
            }) : o(a).then(function(a) {
                return a.reduceRight(b);
            });
        }
        function w(a, b, c) {
            E(function() {
                try {
                    var d = a(c);
                    b.resolve(d);
                } catch (a) {
                    b.reject(a);
                }
            });
        }
        function x(a, b, c) {
            if (a) {
                if (0 < this._filterHandles.length) return void this._filterHandle(c).then(function(c) {
                    w(a, b, c);
                }, function(a) {
                    b.reject(a);
                });
                w(a, b, c);
            } else b.resolve(c);
        }
        function y(a, b, c) {
            a ? w(a, b, c) : b.reject(c);
        }
        function z() {
            d.call(this), executor(this.resolve, this.reject);
        }
        var A = 0, B = 1, C = 2, D = "undefined" != typeof c.process && "[object process]" === Object.prototype.toString.call(c.process) && !c.process.browser, E = D ? c.process.nextTick : "function" == typeof c.setImmediate ? c.setImmediate : function(a) {
            setTimeout(a, 0);
        }, F = Array.prototype.forEach, G = Array.prototype.slice;
        return p.wrap = q, Object.defineProperties(d, {
            delayed: {
                value: function(a, b) {
                    var c = "function" == typeof b ? b : function() {
                        return b;
                    }, f = new d();
                    return setTimeout(function() {
                        try {
                            f.resolve(c());
                        } catch (a) {
                            f.reject(a);
                        }
                    }, a), f;
                }
            },
            error: {
                value: l
            },
            value: {
                value: m
            },
            sync: {
                value: function(a) {
                    try {
                        var b = a();
                        return m(b);
                    } catch (a) {
                        return l(a);
                    }
                }
            },
            all: {
                value: o
            },
            race: {
                value: n
            },
            resolve: {
                value: m
            },
            reject: {
                value: l
            },
            promise: {
                value: function(a) {
                    var b = new d();
                    return a(b.resolve, b.reject), b;
                }
            },
            isPPdog: {
                value: e
            },
            toPPdog: {
                value: f
            },
            isPromise: {
                value: function(a) {
                    return "function" == typeof a.then;
                }
            },
            toPromise: {
                value: function(a) {
                    return h(a) || g(a) ? p(a) : f(a);
                }
            },
            co: {
                value: p
            },
            wrap: {
                value: q
            },
            thunkify: {
                value: function(a) {
                    return function() {
                        var b = G.call(arguments, 0), c = this, e = new d();
                        b.push(function() {
                            c = this, e.resolve(arguments);
                        });
                        try {
                            a.apply(this, b);
                        } catch (a) {
                            e.resolve([ a ]);
                        }
                        return function(a) {
                            e.then(function(b) {
                                a.apply(c, b);
                            });
                        };
                    };
                }
            },
            reduceRight: {
                value: v
            }
        }), Object.defineProperties(d.prototype, {
            _value: {
                writable: !0
            },
            _reason: {
                writable: !0
            },
            _state: {
                value: A,
                writable: !0
            },
            resolve: {
                value: function(a) {
                    if (0 < this._invokeHandlers.length && this._invokeHandler.call(this, a), a === this) return void this.reject(new TypeError("Self resolution"));
                    if (e(a)) return void a.fill(this);
                    if (null !== a && "object" === ("undefined" == typeof a ? "undefined" : b(a)) || "function" == typeof a) {
                        var c;
                        try {
                            c = a.then;
                        } catch (a) {
                            return void this.reject(a);
                        }
                        if ("function" == typeof c) {
                            var d = !0;
                            try {
                                var f = this;
                                return void c.call(a, function(a) {
                                    d && (d = !1, f.resolve(a));
                                }, function(a) {
                                    d && (d = !1, f.reject(a));
                                });
                            } catch (a) {
                                d && (d = !1, this.reject(a));
                            }
                            return;
                        }
                    }
                    if (this._state === A) {
                        this._state = B, this._value = a;
                        for (var g, h = this._subscribers; 0 < h.length; ) g = h.shift(), x.call(this, g.onfulfill, g.next, a);
                    }
                }
            },
            reject: {
                value: function(a) {
                    if (this._state === A) {
                        this._state = C, this._reason = a;
                        for (var b, c = this._subscribers; 0 < c.length; ) b = c.shift(), y(b.onreject, b.next, a);
                    }
                }
            },
            then: {
                value: function(a, b) {
                    "function" != typeof a && (a = null), "function" != typeof b && (b = null);
                    var c = new d();
                    return this._state === B ? x.call(this, a, c, this._value) : this._state === C ? y(b, c, this._reason) : this._subscribers.push({
                        onfulfill: a,
                        onreject: b,
                        next: c
                    }), c;
                }
            },
            done: {
                value: function(a, b) {
                    this.then(a, b).then(null, function(a) {
                        E(function() {
                            throw a;
                        });
                    });
                }
            },
            catch: {
                value: function(a) {
                    return this.then(null, a);
                }
            },
            fail: {
                value: function(a) {
                    this.done(null, a);
                }
            },
            inspect: {
                value: function() {
                    switch (this._state) {
                      case A:
                        return {
                            state: "pending"
                        };

                      case B:
                        return {
                            state: "fulfilled",
                            value: this._value
                        };

                      case C:
                        return {
                            state: "rejected",
                            reason: this._reason
                        };
                    }
                }
            },
            whenComplete: {
                value: function(a) {
                    return this.then(function(b) {
                        return a(), b;
                    }, function(b) {
                        throw a(), b;
                    });
                }
            },
            complete: {
                value: function(a) {
                    return a = a || function(a) {
                        return a;
                    }, this.then(a, a);
                }
            },
            always: {
                value: function(a) {
                    this.done(a, a);
                }
            },
            fill: {
                value: function(a) {
                    this.then(a.resolve, a.reject);
                }
            },
            timeout: {
                value: function(b, c) {
                    var e = new d(), f = setTimeout(function() {
                        e.reject(c || new a("timeout"));
                    }, b);
                    return this.whenComplete(function() {
                        clearTimeout(f);
                    }).fill(e), e;
                }
            },
            delay: {
                value: function(a) {
                    var b = new d();
                    return this.then(function(c) {
                        setTimeout(function() {
                            b.resolve(c);
                        }, a);
                    }, b.reject), b;
                }
            },
            reduceRight: {
                value: function(a, b) {
                    return 1 < arguments.length ? v(this, a, b) : v(this, a);
                }
            },
            use: {
                value: function(a, b) {
                    return b = b || function() {
                        return this;
                    }(), s.call(this, a, b), this;
                }
            },
            filter: {
                value: function(a) {
                    return u.call(this, a), this;
                }
            }
        }), c.PPdog = d, "function" == typeof define && (define.cmd ? define("PPdog", [], d) : define.amd && define("PPdog", [], function() {
            return d;
        })), "object" === ("undefined" == typeof module ? "undefined" : b(module)) && (module.exports = d), 
        "function" == typeof Promise ? void (c.Promise = Promise) : void (z.prototype = Object.create(d.prototype), 
        z.prototype.constructor = d, Object.defineProperties(z, {
            all: {
                value: o
            },
            race: {
                value: n
            },
            resolve: {
                value: m
            },
            reject: {
                value: l
            }
        }), c.Promise = z);
    })("object" === ("undefined" == typeof global ? "undefined" : b(global)) ? global : "object" === ("undefined" == typeof window ? "undefined" : b(window)) ? window : "object" === ("undefined" == typeof self ? "undefined" : b(self)) ? self : void 0), 
    function(a) {
        function b(a) {
            return function(b) {
                b = b || {};
                var c = new d();
                try {
                    b.success = c.resolve, b.fail = c.reject, wx[a](b);
                } catch (a) {
                    c.reject(a);
                }
                return c;
            };
        }
        var c = Array.prototype.slice, d = a.PPdog, e = [ "invoke", "showNavigationBarLoading", "hideNavigationBarLoading", "navigateBack", "drawCanvas", "canvasToTempFilePath", "hideKeyboard", "getPublicLibVersion" ];
        for (var f in d.wx = {}, wx) d.wx[f] = "function" == typeof wx[f] && 0 > e.indexOf(f) && 0 > f.search(/(^(on|create|stop|pause))|((Sync)$)/) ? b(f) : wx[f];
    }("object" === ("undefined" == typeof global ? "undefined" : b(global)) ? global : "object" === ("undefined" == typeof window ? "undefined" : b(window)) ? window : "object" === ("undefined" == typeof self ? "undefined" : b(self)) ? self : void 0);
})();