function e(e, n, i) {
    return n in e ? Object.defineProperty(e, n, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[n] = i, e;
}

!function(e, n) {
    "function" == typeof define && (define.amd || define.cmd) ? define(function() {
        return n(e);
    }) : n(e, !0);
}(void 0, function(n, i) {
    function t(e, i, t) {
        n.WeixinJSBridge ? WeixinJSBridge.invoke(e, r(i), function(n) {
            s(e, n, t);
        }) : l(e, t);
    }
    function o(e, i, t) {
        n.WeixinJSBridge ? WeixinJSBridge.on(e, function(n) {
            t && t.trigger && t.trigger(n), s(e, n, i);
        }) : t ? l(e, t) : l(e, i);
    }
    function r(e) {
        return e = e || {}, e.appId = B.appId, e.verifyAppId = B.appId, e.verifySignType = "sha1", 
        e.verifyTimestamp = B.timestamp + "", e.verifyNonceStr = B.nonceStr, e.verifySignature = B.signature, 
        e;
    }
    function a(e) {
        return {
            timeStamp: e.timestamp + "",
            nonceStr: e.nonceStr,
            package: e.package,
            paySign: e.paySign,
            signType: e.signType || "SHA1"
        };
    }
    function c(e) {
        return e.postalCode = e.addressPostalCode, delete e.addressPostalCode, e.provinceName = e.proviceFirstStageName, 
        delete e.proviceFirstStageName, e.cityName = e.addressCitySecondStageName, delete e.addressCitySecondStageName, 
        e.countryName = e.addressCountiesThirdStageName, delete e.addressCountiesThirdStageName, 
        e.detailInfo = e.addressDetailInfo, delete e.addressDetailInfo, e;
    }
    function s(e, n, i) {
        "openEnterpriseChat" == e && (n.errCode = n.err_code), delete n.err_code, delete n.err_desc, 
        delete n.err_detail;
        var t = n.errMsg;
        t || (t = n.err_msg, delete n.err_msg, t = d(e, t), n.errMsg = t), (i = i || {})._complete && (i._complete(n), 
        delete i._complete), t = n.errMsg || "", B.debug && !i.isInnerInvoke && alert(JSON.stringify(n));
        var o = t.indexOf(":");
        switch (t.substring(o + 1)) {
          case "ok":
            i.success && i.success(n);
            break;

          case "cancel":
            i.cancel && i.cancel(n);
            break;

          default:
            i.fail && i.fail(n);
        }
        i.complete && i.complete(n);
    }
    function d(e, n) {
        var i = e, t = S[i];
        t && (i = t);
        var o = "ok";
        if (n) {
            var r = n.indexOf(":");
            "confirm" == (o = n.substring(r + 1)) && (o = "ok"), "failed" == o && (o = "fail"), 
            -1 != o.indexOf("failed_") && (o = o.substring(7)), -1 != o.indexOf("fail_") && (o = o.substring(5)), 
            "access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"), 
            "config" == i && "function not exist" == o && (o = "ok"), "" == o && (o = "fail");
        }
        return n = i + ":" + o;
    }
    function u(e) {
        if (e) {
            for (var n = 0, i = e.length; n < i; ++n) {
                var t = e[n], o = I[t];
                o && (e[n] = o);
            }
            return e;
        }
    }
    function l(e, n) {
        if (!(!B.debug || n && n.isInnerInvoke)) {
            var i = S[e];
            i && (e = i), n && n._complete && delete n._complete, console.log('"' + e + '",', n || "");
        }
    }
    function p(e) {
        if (!(k || M || B.debug || A < "6.0.2" || L.systemType < 0)) {
            var n = new Image();
            L.appId = B.appId, L.initTime = C.initEndTime - C.initStartTime, L.preVerifyTime = C.preVerifyEndTime - C.preVerifyStartTime, 
            R.getNetworkType({
                isInnerInvoke: !0,
                success: function(e) {
                    L.networkType = e.networkType;
                    var i = "https://open.weixin.qq.com/sdk/report?v=" + L.version + "&o=" + L.isPreVerifyOk + "&s=" + L.systemType + "&c=" + L.clientVersion + "&a=" + L.appId + "&n=" + L.networkType + "&i=" + L.initTime + "&p=" + L.preVerifyTime + "&u=" + L.url;
                    n.src = i;
                }
            });
        }
    }
    function f() {
        return new Date().getTime();
    }
    function m(e) {
        P && (n.WeixinJSBridge ? "preInject" === y.__wxjsjs__isPreInject ? y.addEventListener && y.addEventListener("WeixinJSBridgeReady", e, !1) : e() : y.addEventListener && y.addEventListener("WeixinJSBridgeReady", e, !1));
    }
    function g() {
        R.invoke || (R.invoke = function(e, i, t) {
            n.WeixinJSBridge && WeixinJSBridge.invoke(e, r(i), t);
        }, R.on = function(e, i) {
            n.WeixinJSBridge && WeixinJSBridge.on(e, i);
        });
    }
    function h(e) {
        if ("string" == typeof e && e.length > 0) {
            var n = e.split("?")[0], i = e.split("?")[1];
            return n += ".html", void 0 !== i ? n + "?" + i : n;
        }
    }
    if (!n.jWeixin) {
        var v, I = {
            config: "preVerifyJSAPI",
            onMenuShareTimeline: "menu:share:timeline",
            onMenuShareAppMessage: "menu:share:appmessage",
            onMenuShareQQ: "menu:share:qq",
            onMenuShareWeibo: "menu:share:weiboApp",
            onMenuShareQZone: "menu:share:QZone",
            previewImage: "imagePreview",
            getLocation: "geoLocation",
            openProductSpecificView: "openProductViewWithPid",
            addCard: "batchAddCard",
            openCard: "batchViewCard",
            chooseWXPay: "getBrandWCPayRequest",
            openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
            startSearchBeacons: "startMonitoringBeacons",
            stopSearchBeacons: "stopMonitoringBeacons",
            onSearchBeacons: "onBeaconsInRange",
            consumeAndShareCard: "consumedShareCard",
            openAddress: "editAddress"
        }, S = function() {
            var e = {};
            for (var n in I) e[I[n]] = n;
            return e;
        }(), y = n.document, _ = y.title, w = navigator.userAgent.toLowerCase(), T = navigator.platform.toLowerCase(), k = !(!T.match("mac") && !T.match("win")), M = -1 != w.indexOf("wxdebugger"), P = -1 != w.indexOf("micromessenger"), x = -1 != w.indexOf("android"), V = -1 != w.indexOf("iphone") || -1 != w.indexOf("ipad"), A = function() {
            var e = w.match(/micromessenger\/(\d+\.\d+\.\d+)/) || w.match(/micromessenger\/(\d+\.\d+)/);
            return e ? e[1] : "";
        }(), C = {
            initStartTime: f(),
            initEndTime: 0,
            preVerifyStartTime: 0,
            preVerifyEndTime: 0
        }, L = {
            version: 1,
            appId: "",
            initTime: 0,
            preVerifyTime: 0,
            networkType: "",
            isPreVerifyOk: 1,
            systemType: V ? 1 : x ? 2 : -1,
            clientVersion: A,
            url: encodeURIComponent(location.href)
        }, B = {}, b = {
            _completes: []
        }, O = {
            state: 0,
            data: {}
        };
        m(function() {
            C.initEndTime = f();
        });
        var E = !1, N = [], R = (v = {
            config: function(e) {
                B = e, l("config", e);
                var n = !1 !== B.check;
                m(function() {
                    if (n) t(I.config, {
                        verifyJsApiList: u(B.jsApiList)
                    }, function() {
                        b._complete = function(e) {
                            C.preVerifyEndTime = f(), O.state = 1, O.data = e;
                        }, b.success = function(e) {
                            L.isPreVerifyOk = 0;
                        }, b.fail = function(e) {
                            b._fail ? b._fail(e) : O.state = -1;
                        };
                        var e = b._completes;
                        return e.push(function() {
                            p();
                        }), b.complete = function(n) {
                            for (var i = 0, t = e.length; i < t; ++i) e[i]();
                            b._completes = [];
                        }, b;
                    }()), C.preVerifyStartTime = f(); else {
                        O.state = 1;
                        for (var e = b._completes, i = 0, o = e.length; i < o; ++i) e[i]();
                        b._completes = [];
                    }
                }), g();
            },
            ready: function(e) {
                0 != O.state ? e() : (b._completes.push(e), !P && B.debug && e());
            },
            error: function(e) {
                A < "6.0.2" || (-1 == O.state ? e(O.data) : b._fail = e);
            },
            checkJsApi: function(e) {
                var n = function(e) {
                    var n = e.checkResult;
                    for (var i in n) {
                        var t = S[i];
                        t && (n[t] = n[i], delete n[i]);
                    }
                    return e;
                };
                t("checkJsApi", {
                    jsApiList: u(e.jsApiList)
                }, (e._complete = function(e) {
                    if (x) {
                        var i = e.checkResult;
                        i && (e.checkResult = JSON.parse(i));
                    }
                    e = n(e);
                }, e));
            },
            onMenuShareTimeline: function(e) {
                o(I.onMenuShareTimeline, {
                    complete: function() {
                        t("shareTimeline", {
                            title: e.title || _,
                            desc: e.title || _,
                            img_url: e.imgUrl || "",
                            link: e.link || location.href,
                            type: e.type || "link",
                            data_url: e.dataUrl || ""
                        }, e);
                    }
                }, e);
            },
            onMenuShareAppMessage: function(e) {
                o(I.onMenuShareAppMessage, {
                    complete: function() {
                        t("sendAppMessage", {
                            title: e.title || _,
                            desc: e.desc || "",
                            link: e.link || location.href,
                            img_url: e.imgUrl || "",
                            type: e.type || "link",
                            data_url: e.dataUrl || ""
                        }, e);
                    }
                }, e);
            },
            onMenuShareQQ: function(e) {
                o(I.onMenuShareQQ, {
                    complete: function() {
                        t("shareQQ", {
                            title: e.title || _,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e);
                    }
                }, e);
            },
            onMenuShareWeibo: function(e) {
                o(I.onMenuShareWeibo, {
                    complete: function() {
                        t("shareWeiboApp", {
                            title: e.title || _,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e);
                    }
                }, e);
            },
            onMenuShareQZone: function(e) {
                o(I.onMenuShareQZone, {
                    complete: function() {
                        t("shareQZone", {
                            title: e.title || _,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e);
                    }
                }, e);
            },
            startRecord: function(e) {
                t("startRecord", {}, e);
            },
            stopRecord: function(e) {
                t("stopRecord", {}, e);
            },
            onVoiceRecordEnd: function(e) {
                o("onVoiceRecordEnd", e);
            },
            playVoice: function(e) {
                t("playVoice", {
                    localId: e.localId
                }, e);
            },
            pauseVoice: function(e) {
                t("pauseVoice", {
                    localId: e.localId
                }, e);
            },
            stopVoice: function(e) {
                t("stopVoice", {
                    localId: e.localId
                }, e);
            },
            onVoicePlayEnd: function(e) {
                o("onVoicePlayEnd", e);
            },
            uploadVoice: function(e) {
                t("uploadVoice", {
                    localId: e.localId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e);
            },
            downloadVoice: function(e) {
                t("downloadVoice", {
                    serverId: e.serverId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e);
            },
            translateVoice: function(e) {
                t("translateVoice", {
                    localId: e.localId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e);
            },
            chooseImage: function(e) {
                t("chooseImage", {
                    scene: "1|2",
                    count: e.count || 9,
                    sizeType: e.sizeType || [ "original", "compressed" ],
                    sourceType: e.sourceType || [ "album", "camera" ]
                }, (e._complete = function(e) {
                    if (x) {
                        var n = e.localIds;
                        n && (e.localIds = JSON.parse(n));
                    }
                }, e));
            },
            getLocation: function(e) {},
            previewImage: function(e) {
                t(I.previewImage, {
                    current: e.current,
                    urls: e.urls
                }, e);
            },
            uploadImage: function(e) {
                t("uploadImage", {
                    localId: e.localId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e);
            },
            downloadImage: function(e) {
                t("downloadImage", {
                    serverId: e.serverId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e);
            },
            getLocalImgData: function(e) {
                !1 === E ? (E = !0, t("getLocalImgData", {
                    localId: e.localId
                }, (e._complete = function(e) {
                    if (E = !1, N.length > 0) {
                        var n = N.shift();
                        wx.getLocalImgData(n);
                    }
                }, e))) : N.push(e);
            },
            getNetworkType: function(e) {
                var n = function(e) {
                    var n = e.errMsg;
                    e.errMsg = "getNetworkType:ok";
                    var i = e.subtype;
                    if (delete e.subtype, i) e.networkType = i; else {
                        var t = n.indexOf(":"), o = n.substring(t + 1);
                        switch (o) {
                          case "wifi":
                          case "edge":
                          case "wwan":
                            e.networkType = o;
                            break;

                          default:
                            e.errMsg = "getNetworkType:fail";
                        }
                    }
                    return e;
                };
                t("getNetworkType", {}, (e._complete = function(e) {
                    e = n(e);
                }, e));
            },
            openLocation: function(e) {
                t("openLocation", {
                    latitude: e.latitude,
                    longitude: e.longitude,
                    name: e.name || "",
                    address: e.address || "",
                    scale: e.scale || 28,
                    infoUrl: e.infoUrl || ""
                }, e);
            }
        }, e(v, "getLocation", function(e) {
            e = e || {}, t(I.getLocation, {
                type: e.type || "wgs84"
            }, (e._complete = function(e) {
                delete e.type;
            }, e));
        }), e(v, "hideOptionMenu", function(e) {
            t("hideOptionMenu", {}, e);
        }), e(v, "showOptionMenu", function(e) {
            t("showOptionMenu", {}, e);
        }), e(v, "closeWindow", function(e) {
            t("closeWindow", {}, e = e || {});
        }), e(v, "hideMenuItems", function(e) {
            t("hideMenuItems", {
                menuList: e.menuList
            }, e);
        }), e(v, "showMenuItems", function(e) {
            t("showMenuItems", {
                menuList: e.menuList
            }, e);
        }), e(v, "hideAllNonBaseMenuItem", function(e) {
            t("hideAllNonBaseMenuItem", {}, e);
        }), e(v, "showAllNonBaseMenuItem", function(e) {
            t("showAllNonBaseMenuItem", {}, e);
        }), e(v, "scanQRCode", function(e) {
            t("scanQRCode", {
                needResult: (e = e || {}).needResult || 0,
                scanType: e.scanType || [ "qrCode", "barCode" ]
            }, (e._complete = function(e) {
                if (V) {
                    var n = e.resultStr;
                    if (n) {
                        var i = JSON.parse(n);
                        e.resultStr = i && i.scan_code && i.scan_code.scan_result;
                    }
                }
            }, e));
        }), e(v, "openAddress", function(e) {
            t(I.openAddress, {}, (e._complete = function(e) {
                e = c(e);
            }, e));
        }), e(v, "openProductSpecificView", function(e) {
            t(I.openProductSpecificView, {
                pid: e.productId,
                view_type: e.viewType || 0,
                ext_info: e.extInfo
            }, e);
        }), e(v, "addCard", function(e) {
            for (var n = e.cardList, i = [], o = 0, r = n.length; o < r; ++o) {
                var a = n[o], c = {
                    card_id: a.cardId,
                    card_ext: a.cardExt
                };
                i.push(c);
            }
            t(I.addCard, {
                card_list: i
            }, (e._complete = function(e) {
                var n = e.card_list;
                if (n) {
                    for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {
                        var o = n[i];
                        o.cardId = o.card_id, o.cardExt = o.card_ext, o.isSuccess = !!o.is_succ, delete o.card_id, 
                        delete o.card_ext, delete o.is_succ;
                    }
                    e.cardList = n, delete e.card_list;
                }
            }, e));
        }), e(v, "chooseCard", function(e) {
            t("chooseCard", {
                app_id: B.appId,
                location_id: e.shopId || "",
                sign_type: e.signType || "SHA1",
                card_id: e.cardId || "",
                card_type: e.cardType || "",
                card_sign: e.cardSign,
                time_stamp: e.timestamp + "",
                nonce_str: e.nonceStr
            }, (e._complete = function(e) {
                e.cardList = e.choose_card_info, delete e.choose_card_info;
            }, e));
        }), e(v, "openCard", function(e) {
            for (var n = e.cardList, i = [], o = 0, r = n.length; o < r; ++o) {
                var a = n[o], c = {
                    card_id: a.cardId,
                    code: a.code
                };
                i.push(c);
            }
            t(I.openCard, {
                card_list: i
            }, e);
        }), e(v, "consumeAndShareCard", function(e) {
            t(I.consumeAndShareCard, {
                consumedCardId: e.cardId,
                consumedCode: e.code
            }, e);
        }), e(v, "chooseWXPay", function(e) {
            t(I.chooseWXPay, a(e), e);
        }), e(v, "openEnterpriseRedPacket", function(e) {
            t(I.openEnterpriseRedPacket, a(e), e);
        }), e(v, "startSearchBeacons", function(e) {
            t(I.startSearchBeacons, {
                ticket: e.ticket
            }, e);
        }), e(v, "stopSearchBeacons", function(e) {
            t(I.stopSearchBeacons, {}, e);
        }), e(v, "onSearchBeacons", function(e) {
            o(I.onSearchBeacons, e);
        }), e(v, "openEnterpriseChat", function(e) {
            t("openEnterpriseChat", {
                useridlist: e.userIds,
                chatname: e.groupName
            }, e);
        }), e(v, "launchMiniProgram", function(e) {
            t("launchMiniProgram", {
                targetAppId: e.targetAppId,
                path: h(e.path),
                envVersion: e.envVersion
            }, e);
        }), e(v, "miniProgram", {
            navigateBack: function(e) {
                t("invokeMiniProgramAPI", {
                    name: "navigateBack",
                    arg: {
                        delta: (e = e || {}).delta || 1
                    }
                }, e);
            },
            navigateTo: function(e) {
                t("invokeMiniProgramAPI", {
                    name: "navigateTo",
                    arg: {
                        url: e.url
                    }
                }, e);
            },
            redirectTo: function(e) {
                t("invokeMiniProgramAPI", {
                    name: "redirectTo",
                    arg: {
                        url: e.url
                    }
                }, e);
            },
            switchTab: function(e) {
                t("invokeMiniProgramAPI", {
                    name: "switchTab",
                    arg: {
                        url: e.url
                    }
                }, e);
            },
            reLaunch: function(e) {
                t("invokeMiniProgramAPI", {
                    name: "reLaunch",
                    arg: {
                        url: e.url
                    }
                }, e);
            }
        }), v), W = 1, J = {};
        return y.addEventListener("error", function(e) {
            if (!x) {
                var n = e.target, i = n.tagName, t = n.src;
                if (("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) && -1 != t.indexOf("wxlocalresource://")) {
                    e.preventDefault(), e.stopPropagation();
                    var o = n["wx-id"];
                    if (o || (o = W++, n["wx-id"] = o), J[o]) return;
                    J[o] = !0, wx.ready(function() {
                        wx.getLocalImgData({
                            localId: t,
                            success: function(e) {
                                n.src = e.localData;
                            }
                        });
                    });
                }
            }
        }, !0), y.addEventListener("load", function(e) {
            if (!x) {
                var n = e.target, i = n.tagName;
                if (n.src, "IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {
                    var t = n["wx-id"];
                    t && (J[t] = !1);
                }
            }
        }, !0), i && (n.wx = n.jWeixin = R), R;
    }
});