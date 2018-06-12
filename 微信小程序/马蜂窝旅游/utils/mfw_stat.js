function e() {}

var t = {};

"function" != typeof Object.assign && (Object.assign = function(e) {
    if (null == e) throw new TypeError("Cannot convert undefined or null to object");
    e = Object(e);
    for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];
        if (null != i) for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
    }
    return e;
}), e.generate = function() {
    var t = e._getRandomInt, i = e._hexAligner;
    return i(t(32), 8) + "-" + i(t(16), 4) + "-" + i(16384 | t(12), 4) + "-" + i(32768 | t(14), 4) + "-" + i(t(48), 12);
}, e._getRandomInt = function(e) {
    return 0 > e ? NaN : 30 >= e ? 0 | Math.random() * (1 << e) : 53 >= e ? (0 | 1073741824 * Math.random()) + 1073741824 * (0 | Math.random() * (1 << e - 30)) : NaN;
}, e._getIntAligner = function(e) {
    return function(t, i) {
        for (var n = t.toString(e), r = i - n.length, o = "0"; 0 < r; r >>>= 1, o += o) 1 & r && (n = o + n);
        return n;
    };
}, e._hexAligner = e._getIntAligner(16);

var i = {
    Store: {
        set: function(e, t) {
            return wx.setStorageSync(e, t), !0;
        },
        get: function(e) {
            return wx.getStorageSync(e);
        },
        remove: function(e) {
            return wx.removeStorageSync(e), !0;
        }
    },
    timestamp: function() {
        return new Date().getTime();
    },
    uuid: function() {
        return e.generate();
    },
    request: function(e) {
        var t = {};
        if (this.Store.get("MFWSDK_deviceId")) t.deviceId = this.Store.get("MFWSDK_deviceId"); else {
            var i = this.uuid();
            this.Store.set("MFWSDK_deviceId", i), t.deviceId = i;
        }
        Object.assign(t, e.data), wx.request({
            url: "https://tongji.mafengwo.cn/weapp_click.php",
            data: JSON.stringify(t),
            method: "POST",
            success: function(t) {
                e.success && e.success();
            },
            fail: function(t) {
                e.fail && e.fail();
            }
        });
    }
}, n = {
    appProfiles: {},
    appProfile: function() {
        var e = {
            sdkVersion: "Weapp+MFW+V2.0.0"
        };
        if (i.Store.get("MFWSDK_initTime")) e.initTime = i.Store.get("MFWSDK_initTime"); else {
            var n = i.timestamp();
            i.Store.set("MFWSDK_initTime", n), e.initTime = n;
        }
        Object.assign(e, t.appProfile), this.appProfiles = e;
    },
    deviceProfiles: {},
    deviceProfile: function() {
        var e = {};
        wx.getSystemInfo({
            success: function(t) {
                e.model = t.model.indexOf("<") > -1 ? t.model.split("<")[0] : t.model, e.wechatVersion = t.version, 
                e.pixel = t.windowWidth + "*" + t.windowHeight, e.language = t.language, e.timezone = -new Date().getTimezoneOffset() / 60, 
                e.system = t.system, e.platform = t.platform, Object.assign(n.deviceProfiles, e);
            }
        }), wx.getNetworkType({
            success: function(t) {
                var i = t.networkType.toLocaleLowerCase();
                e.connectionType = "wifi" === i ? 0 : 1, e.cellularNetworkType = "wifi" !== i ? "4g" == i ? "LTE" : i : "OFFLINE", 
                Object.assign(n.deviceProfiles, e);
            }
        });
    },
    userProfiles: {},
    userProfile: function() {
        var e = {};
        i.Store.get("MFWSDK_deviceId") ? e.user_type = "return" : e.user_type = "new", e.day_first = parseInt((this.launchTime - this.appProfiles.initTime) / 864e5), 
        e.day_first = e.day_first < 0 ? 0 : e.day_first, Object.assign(n.userProfiles, e), 
        wx.getLocation({
            type: "wgs84",
            success: function(t) {
                e.lat = t.latitude, e.lng = t.longitude, e.speed = t.speed, e.accuracy = t.accuracy, 
                Object.assign(n.userProfiles, e);
            }
        });
    },
    launchTime: 0,
    launch: function(e, n, r) {
        e || (e = "appname", console.error("请填写您的小程序名称")), n || console.error("请填写您的小程序版本号"), 
        t = {
            appProfile: {
                appName: e,
                versionName: n,
                is_debug: r || !1
            }
        }, this.launchTime = i.timestamp(), this.appProfile(), this.deviceProfile(), this.userProfile();
    },
    isHide2Show: !1,
    hideTime: 0,
    show: function() {
        var e = this;
        if (this.isHide2Show) {
            r = (t = i.timestamp()) - e.hideTime;
            n.track("app_show", {
                showTime: t,
                hide_duration: r
            });
        } else {
            var t = i.timestamp(), r = t - e.launchTime;
            n.track("launch", {
                launchTime: e.launchTime,
                duration: r
            });
        }
        this.isHide2Show = !1;
    },
    hide: function() {
        this.isHide2Show = !0, this.hideTime = i.timestamp(), n.track("app_hide", {
            isHide2Show: !0,
            hideTime: n.hideTime
        });
    },
    Page: {
        refer: function() {},
        show: function() {
            var e = getCurrentPages()[getCurrentPages().length - 1];
            n.track("page", {
                uri: e.__route__
            });
        }
    },
    track: function(e, t, n, r) {
        var o = {
            success: n = n || function() {},
            fail: r = r || function() {}
        }, s = new Date().getTime(), a = this;
        o.data = {
            event_time: s,
            event_code: e || "",
            attr: t || {},
            userProfiles: a.userProfiles,
            appProfiles: a.appProfiles,
            deviceProfiles: a.deviceProfiles
        }, i.request(o);
    }
};

module.exports = n;