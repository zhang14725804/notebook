function e() {
    r.refreshNetworkType(), s.initInstrument(r);
}

for (var t, n = function() {
    var e = String.fromCharCode, t = {
        compressToUTF16: function(n) {
            return null == n ? "" : t._compress(n, 15, function(t) {
                return e(t + 32);
            }) + " ";
        },
        compressToUint8Array: function(e) {
            for (var n = t.compress(e), i = new Uint8Array(2 * n.length), r = 0, s = n.length; r < s; r++) {
                var o = n.charCodeAt(r);
                i[2 * r] = o >>> 8, i[2 * r + 1] = o % 256;
            }
            return i;
        },
        compress: function(n) {
            return t._compress(n, 16, function(t) {
                return e(t);
            });
        },
        _compress: function(e, t, n) {
            if (null == e) return "";
            var i, r, s, o = {}, a = {}, u = "", p = "", c = "", h = 2, l = 3, g = 2, d = [], f = 0, v = 0;
            for (s = 0; s < e.length; s += 1) if (u = e.charAt(s), Object.prototype.hasOwnProperty.call(o, u) || (o[u] = l++, 
            a[u] = !0), p = c + u, Object.prototype.hasOwnProperty.call(o, p)) c = p; else {
                if (Object.prototype.hasOwnProperty.call(a, c)) {
                    if (c.charCodeAt(0) < 256) {
                        for (i = 0; i < g; i++) f <<= 1, v == t - 1 ? (v = 0, d.push(n(f)), f = 0) : v++;
                        for (r = c.charCodeAt(0), i = 0; i < 8; i++) f = f << 1 | 1 & r, v == t - 1 ? (v = 0, 
                        d.push(n(f)), f = 0) : v++, r >>= 1;
                    } else {
                        for (r = 1, i = 0; i < g; i++) f = f << 1 | r, v == t - 1 ? (v = 0, d.push(n(f)), 
                        f = 0) : v++, r = 0;
                        for (r = c.charCodeAt(0), i = 0; i < 16; i++) f = f << 1 | 1 & r, v == t - 1 ? (v = 0, 
                        d.push(n(f)), f = 0) : v++, r >>= 1;
                    }
                    0 == --h && (h = Math.pow(2, g), g++), delete a[c];
                } else for (r = o[c], i = 0; i < g; i++) f = f << 1 | 1 & r, v == t - 1 ? (v = 0, 
                d.push(n(f)), f = 0) : v++, r >>= 1;
                0 == --h && (h = Math.pow(2, g), g++), o[p] = l++, c = String(u);
            }
            if ("" !== c) {
                if (Object.prototype.hasOwnProperty.call(a, c)) {
                    if (c.charCodeAt(0) < 256) {
                        for (i = 0; i < g; i++) f <<= 1, v == t - 1 ? (v = 0, d.push(n(f)), f = 0) : v++;
                        for (r = c.charCodeAt(0), i = 0; i < 8; i++) f = f << 1 | 1 & r, v == t - 1 ? (v = 0, 
                        d.push(n(f)), f = 0) : v++, r >>= 1;
                    } else {
                        for (r = 1, i = 0; i < g; i++) f = f << 1 | r, v == t - 1 ? (v = 0, d.push(n(f)), 
                        f = 0) : v++, r = 0;
                        for (r = c.charCodeAt(0), i = 0; i < 16; i++) f = f << 1 | 1 & r, v == t - 1 ? (v = 0, 
                        d.push(n(f)), f = 0) : v++, r >>= 1;
                    }
                    0 == --h && (h = Math.pow(2, g), g++), delete a[c];
                } else for (r = o[c], i = 0; i < g; i++) f = f << 1 | 1 & r, v == t - 1 ? (v = 0, 
                d.push(n(f)), f = 0) : v++, r >>= 1;
                0 == --h && (h = Math.pow(2, g), g++);
            }
            for (r = 2, i = 0; i < g; i++) f = f << 1 | 1 & r, v == t - 1 ? (v = 0, d.push(n(f)), 
            f = 0) : v++, r >>= 1;
            for (;;) {
                if (f <<= 1, v == t - 1) {
                    d.push(n(f));
                    break;
                }
                v++;
            }
            return d.join("");
        }
    };
    return t;
}(), i = {
    encryptXor: function(e, t) {
        for (var n = e.length - 1; n >= 0; n--) e[n] ^= t;
        return e;
    },
    bind: function(e, t) {
        return function() {
            t.apply(e, arguments);
        };
    },
    guid: function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            var t = 16 * Math.random() | 0;
            return ("x" == e ? t : 3 & t | 8).toString(16);
        });
    },
    Base64: {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        encodeUintArray: function(e) {
            for (var t = "", n = 0, r = e.length - 3; n <= r; ) {
                o = e[n] << 16 | e[n + 1] << 8 | e[n + 2];
                t += i.Base64._keyStr[o >> 18 & 63], t += i.Base64._keyStr[o >> 12 & 63], t += i.Base64._keyStr[o >> 6 & 63], 
                t += i.Base64._keyStr[o >> 0 & 63], n += 3;
            }
            var s = e.length - n;
            if (s > 0) {
                var o = 0;
                o |= e[n] << 16, 2 == s && (o |= e[n + 1] << 8), t += i.Base64._keyStr[o >> 18 & 63], 
                t += i.Base64._keyStr[o >> 12 & 63], t += 2 == s ? i.Base64._keyStr[o >> 6 & 63] : "=", 
                t += "=";
            }
            return t;
        }
    },
    getOS: function(e) {
        if (e) {
            var t = e.toLowerCase();
            return -1 != t.indexOf("android") ? "Android" : -1 != t.indexOf("ios") ? "iOS" : e;
        }
    },
    getValidValue: function(e, t) {
        if (e && t) for (var n = 0, i = t.length; n < i; n++) if (void 0 != e[t[n]]) return e[t[n]];
    }
}, r = {
    currentPage: {},
    eventQueue: [],
    currentTimer: null,
    sessionId: null,
    SESSION_INTERVAL: 3e4,
    resendPageTimer: null,
    uid: null,
    csParams: [],
    leaveAppTime: 0,
    refreshNetworkType: function() {
        wx.getNetworkType({
            success: i.bind(this, function(e) {
                this.networkType = e.networkType.toUpperCase();
            })
        });
    },
    setCS: function(e, t, n) {
        var r = this.csParams[e];
        !n || r && r.value || !this.lastPageEvent || (this.resendPageTimer && clearTimeout(this.resendPageTimer), 
        this.resendPageTimer = setTimeout(i.bind(this, this.resendPage), 100)), this.csParams[e] = {
            key: t,
            value: n
        };
    },
    resendPage: function() {
        this.lastPageEvent && (this.patchCS(this.lastPageEvent), this.saveEvent(this.lastPageEvent));
    },
    patchCS: function(e) {
        this.csParams.forEach(function(t, n) {
            t.value && (e["cs" + (n + 1)] = t.key + ":" + t.value);
        });
    },
    appListener: function(e, t, n) {
        if (console.log("App.", t, Date.now()), "onLaunch" == t) {
            var i = wx.getStorageSync("_growing_data_");
            i && i.pv && i.other && (o.messageQueue = i, wx.removeStorage({
                key: "_growing_data_"
            }));
        } else "onHide" == t ? (this.leaveAppTime = Date.now(), wx.setStorage({
            key: "_growing_data_",
            data: o.messageQueue
        })) : "onShow" == t && Date.now() - this.leaveAppTime > this.SESSION_INTERVAL && (this.sessionId = null);
    },
    pageListener: function(e, t, n) {
        if (console.log("Page.", e.__route__, "#", t, Date.now()), "onShow" == t) {
            this.sessionId || this.sendVisitEvent(), this.refreshNetworkType(), this.currentPage.path = e.__route__, 
            this.currentPage.time = Date.now();
            var i = {
                t: "page",
                tm: this.currentPage.time,
                p: e.__route__,
                tl: e.data.growingTitle,
                r: this.networkType
            };
            this.patchCS(i), this.lastPageEvent = i, this.saveEvent(i);
        } else if ("onLoad" == t) {
            var r = n[0];
            r && r.giochannel && (this.giochannel = r.giochannel);
        }
    },
    clickListener: function(e, t) {
        console.log("Click on ", e.currentTarget.id, Date.now()), this.saveEvent(this.makeClickEvent(e, t));
    },
    saveEvent: function(e) {
        e.u = this.uid, e.s = this.sessionId, e.tm = e.tm || Date.now(), e.d = a.appId, 
        this.eventQueue.push(e), a.debug && console.info("genrate new event", JSON.stringify(e, 0, 2)), 
        this.currentTimer || (this.currentTimer = setTimeout(i.bind(this, function() {
            this.currentTimer = void 0;
            var e = [], t = [];
            this.eventQueue.map(function(n) {
                "clck" == n.t ? t.push(n) : e.push(n);
            }), this.eventQueue = [], e.length && o.uploadEvent("pv", e), t.length && o.uploadEvent("other", t);
        }), 2e3));
    },
    sendVisitEvent: function() {
        this.uid || (this.uid = wx.getStorageSync("_growing_uid_"), this.uid || (this.uid = i.guid(), 
        wx.setStorageSync("_growing_uid_", this.uid))), this.sessionId || (this.sessionId = i.guid());
        var e = wx.getSystemInfoSync(), t = {
            t: "vst",
            b: "MINA",
            l: e.language,
            sh: Math.round(e.windowHeight * e.pixelRatio),
            sw: Math.round(e.windowWidth * e.pixelRatio),
            ch: this.giochannel,
            cv: e.version,
            av: "0.01",
            os: i.getOS(e.platform),
            osv: e.system,
            dm: e.model.replace(/<.*>/, ""),
            r: this.networkType
        };
        this.patchCS(t), this.saveEvent(t);
    },
    makeClickEvent: function(e, t) {
        var n = Date.now(), i = {
            t: "clck",
            tm: n,
            p: this.currentPage.path,
            ptm: this.currentPage.time,
            e: [ {
                x: e.currentTarget.id + "#" + t,
                v: e.currentTarget.dataset.growingTitle,
                idx: e.currentTarget.dataset.growingIdx,
                tm: n
            } ]
        };
        return "cancel" !== e.type && "confirm" !== e.type || void 0 === i.e[0].v && (i.e[0].v = e.type), 
        i;
    }
}, s = {
    defaultPageCallbacks: {},
    defaultAppCallbacks: {},
    appHandlers: [ "onLaunch", "onShow", "onHide" ],
    pageHandlers: [ "onLoad", "onReady", "onShow", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom" ],
    clickEventTypes: [ "tap", "submit", "cancel", "confirm" ],
    originalPage: Page,
    originalApp: App,
    instrument: function(e) {
        if (!a.isEnabled()) return e;
        for (var t in e) "function" == typeof e[t] && (e[t] = function(e, t) {
            return function() {
                var n = t.apply(this, arguments);
                try {
                    var i = arguments ? arguments[0] : void 0;
                    i && i.currentTarget && -1 != s.clickEventTypes.indexOf(i.type) && s.observer.clickListener(i, e), 
                    this._growing_app_ && -1 != s.appHandlers.indexOf(e) && s.defaultAppCallbacks[e].apply(this, arguments), 
                    this._growing_page_ && -1 != s.pageHandlers.indexOf(e) && s.defaultPageCallbacks[e].apply(this, arguments);
                } catch (e) {
                    a.debug && console.log(e);
                }
                return n;
            };
        }(t, e[t]));
        return e._growing_app_ && s.appHandlers.map(function(t) {
            e[t] || (e[t] = s.defaultAppCallbacks[t]);
        }), e._growing_page_ && s.pageHandlers.map(function(t) {
            e[t] || (e[t] = s.defaultPageCallbacks[t]);
        }), e;
    },
    GrowingPage: function(e) {
        e._growing_page_ = !0, s.originalPage(s.instrument(e));
    },
    GrowingApp: function(e) {
        e._growing_app_ = !0, s.originalApp(s.instrument(e));
    },
    initInstrument: function(e) {
        s.observer = e, s.pageHandlers.forEach(function(e) {
            s.defaultPageCallbacks[e] = function() {
                this.__route__ && s.observer.pageListener(this, e, arguments);
            };
        }), s.appHandlers.forEach(function(e) {
            s.defaultAppCallbacks[e] = function() {
                s.observer.appListener(this, e, arguments);
            };
        }), Page = function() {
            return s.GrowingPage(arguments[0]);
        }, App = function() {
            return s.GrowingApp(arguments[0]);
        };
    }
}, o = {
    trackerOrigin: "https://api.growingio.com",
    messageQueue: {
        pv: [],
        other: []
    },
    uploadingQueue: {
        pv: [],
        other: []
    },
    uploadingType: "",
    requestId: 0,
    isUploading: function() {
        return this.uploadingQueue.pv.length + this.uploadingQueue.other.length > 0;
    },
    flushMessages: function(e) {
        this.uploadingQueue[e] = this.messageQueue[e].slice(), this.messageQueue[e] = [];
        var t = this.uploadingQueue[e];
        this.uploadingType = e;
        var r = Date.now(), s = JSON.stringify(t), o = n.compressToUint8Array(s), u = i.encryptXor(o, 255 & r), p = i.Base64.encodeUintArray(u);
        a.debugUpload && console.log("uploading", JSON.stringify(t, 0, 2)), this.requestId++, 
        wx.request({
            url: this.trackerOrigin + "/v3/" + a.projectId + "/mina/" + e + "?stm=" + r,
            header: {
                "X-Compress-Codec": "1",
                "X-Crypt-Codec": "1",
                "X-Encode-Codec": "1"
            },
            method: "POST",
            data: p,
            success: i.bind(this, function() {
                a.debugUpload && console.log("upload succeed", this.requestId), this.uploadingQueue[this.uploadingType] = [], 
                this.messageQueue.pv.length > 0 ? this.flushMessages("pv") : this.messageQueue.other.length > 0 && this.flushMessages("other");
            }),
            fail: i.bind(this, function() {
                this.messageQueue[this.uploadingType] = this.uploadingQueue[this.uploadingType].concat(this.messageQueue[this.uploadingType]), 
                this.uploadingQueue[this.uploadingType] = [];
            })
        });
    },
    uploadEvent: function(e, t) {
        !a.local && a.projectId && (this.messageQueue[e] = this.messageQueue[e].concat(t), 
        this.isUploading() || this.flushMessages(e));
    }
}, a = {
    set trackerHost(e) {
        0 != e.indexOf("http") && (e = "https://" + e), trackerOrigin = e;
    },
    set projectId(n) {
        n && !t && (t = n, e());
    },
    get projectId() {
        return t;
    },
    disabled: !1,
    debug: !1,
    local: !1,
    appId: void 0,
    isEnabled: function() {
        return !a.disabled && a.projectId && a.appId;
    }
}, u = 0; u < 10; u++) a["setCS" + (u + 1)] = function(e) {
    return function(t, n) {
        n = void 0 === n || null === n ? "" : String(n), r.setCS(e, t, n);
    };
}(u);

console.log("init growingio"), module.exports = a;