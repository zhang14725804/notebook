var t = require("../../utils/timeFormat"), e = require("../../utils/util").convertUrl, a = require("../../global/config"), s = require("../../utils/util"), i = 0, n = 0, o = !1, r = !1, u = 10, c = 0, d = 0, g = {}, l = require("../../index"), h = void 0, m = {}, _ = {}, p = void 0, f = void 0, v = [ "微笑", "撇嘴", "色", "发呆", "得意", "流泪", "害羞", "闭嘴", "睡觉", "大哭", "尴尬", "发怒", "调皮", "呲牙", "惊讶", "难过", "酷", "冷汗", "抓狂", "吐", "偷笑", "愉快", "白眼", "傲慢", "饥饿", "困", "惊恐", "流汗", "憨笑", "悠闲", "奋斗", "咒骂", "疑问", "嘘", "晕", "疯了", "衰", "骷髅", "敲打", "再见", "擦汗", "抠鼻", "鼓掌", "糗大了", "坏笑", "左哼哼", "右哼哼", "哈欠", "鄙视", "委屈", "快哭了", "阴险", "亲亲", "惊吓", "可怜", "菜刀", "西瓜", "啤酒", "篮球", "乒乓", "咖啡", "米饭", "猪头", "玫瑰", "凋谢", "示爱", "爱心", "心碎", "蛋糕", "闪电", "炸弹", "刀", "足球", "瓢虫", "便便", "月亮", "太阳", "礼品", "拥抱", "强", "弱", "握手", "胜利", "抱拳", "勾引", "拳头", "差劲", "爱你", "不", "OK" ], w = function(t) {
    if (!s.isString(t)) return t;
    var e = [], a = t;
    return t.replace(/(\[[^[\]]*\])/g, function(s) {
        var i = v.indexOf(s.replace(/[[\]]/g, "")), n = a.indexOf(s), o = n + s.length;
        return -1 !== i ? (0 !== n && e.push({
            type: "text",
            value: a.substr(0, n)
        }), e.push({
            type: "emotion",
            value: i
        })) : e.push({
            type: "text",
            value: a.substr(0, o)
        }), a = a.substr(o), t;
    }), "" !== a && e.push({
        type: "text",
        value: a
    }), e;
}, y = function(t) {
    var e = {}, a = void 0, s = t, i = void 0, n = void 0;
    if (!s.image_width || !s.image_height) return e.width = 50, e.height = 50, e.size = "auto auto", 
    e.image = s.url, e;
    s.image_width > s.image_height ? (a = s.image_width / s.image_height) > 3 ? (n = 50, 
    i = 150) : s.image_width > 150 ? n = (i = 150) / a : (i = s.image_width, n = s.image_height) : (a = s.image_height / s.image_width) > 3 ? (i = 50, 
    n = 150) : s.image_height > 150 ? i = (n = 150) / a : (i = s.image_width, n = s.image_height);
    var o = void 0;
    o = -1 === s.url.indexOf("data:") ? s.url + "?crop=1&cpos=northwest&h=" + n + "&w=" + i : s.url;
    var r = "";
    return r = 50 === n && 150 === i ? "auto 100%" : 150 === n && 50 === i ? "100% auto" : "100% 100%", 
    e.width = i, e.height = n, e.size = r, e.image = o, e;
}, x = function(t) {
    t.map(function(t) {
        t.msg_id + "" != "" && (g[t.msg_id] = t);
    });
}, D = function(r, u) {
    var c = this, d = [];
    if (0 !== (r = r.filter(function(t) {
        return t.msg_id + "" == "" || !g[t.msg_id];
    })).length) {
        (r = r.map(function(t) {
            if (-1 !== [ "text", "audio", "image", "tip", "mix" ].indexOf(t.show_type)) return t;
            var e = "";
            switch (t.show_type) {
              case "call_audio":
                e = "[收到一条语音聊天消息，请在客户端查看]";
                break;

              case "call_video":
                e = "[收到一条视频聊天消息，请在客户端查看]";
                break;

              default:
                e = "[消息格式暂不支持，请在客户端查看]";
            }
            return t.content.msg = e, t.show_type = "text", t.content.type = "text", t;
        }).map(function(o) {
            if (o = a.get("msg-show-converter")(o), o.format_time = t.formatRecentTime(o.send_time, "chat"), 
            o.ismine = o.sender_id + "" == m.user_id + "" && o.sender_source + "" == m.user_source + "" ? "true" : "false", 
            s.isEmpty(o.sender_info) || s.isEmpty(o.sender_info.avatar) ? "false" === o.ismine ? o.sender_info = _ : o.sender_info = m : (o.sender_info = s.isEmpty(o.sender_info) ? {} : o.sender_info, 
            o.sender_info.avatar = e(s.isEmpty(o.sender_info.avatar) ? a.get("default-avatar") : o.sender_info.avatar)), 
            "text" === o.show_type) o.content.msg = w(o.content.msg); else if ("audio" === o.show_type) void 0 === o.is_playing && (o.is_playing = !1); else if ("image" === o.show_type) {
                var r = y(o.content);
                o.content.image_width = r.width, o.content.image_height = r.height, o.content.thumb_url = r.image, 
                o.content.size = r.size, d.push(e(o.content.url));
            }
            var g = void 0;
            return "down" === u ? g = i : "up" === u && (g = n), Math.abs(o.send_time - g) < 12e4 ? o.is_show_time = "false" : "down" === u ? (i = o.send_time, 
            1 === c.data.msglist.length && (n = o.send_time)) : "up" === u && (n = o.send_time), 
            o;
        })).filter(function(t) {
            return "tip" !== t.show_type || t.sender_id + "" != m.user_id + "" || t.sender_source + "" != m.user_source + "";
        });
        var l = c.data.msglist, h = c.data.imgArr;
        "down" === u ? (Array.prototype.push.apply(l, r), Array.prototype.push.apply(h, d)) : "up" === u && (Array.prototype.unshift.apply(l, r), 
        Array.prototype.unshift.apply(h, d)), x(r), c.setData({
            msglist: l,
            imgArr: h
        }), o = !1;
    }
}, S = function(t, e) {
    var a = this;
    a.data.msglist.splice(t, 1, e), a.setData({
        msglist: a.data.msglist
    });
    var s = a.data.msglist.length - 1;
    a.setData({
        toView: "msg-" + s
    }), x([ e ]);
}, b = function(t, e, a, s) {
    var i = {
        count: u,
        msg_id: e,
        option: -1,
        user_id: t.user_id,
        user_source: t.user_source
    };
    h.getMsgRecords(i, function(t) {
        a(t);
    }, s);
}, I = function(t, e) {
    var s = t.contact, i = {
        content: t.msg.content,
        msg_type: 2,
        send_time: t.msg.send_time,
        sender_info: t.msg.sender_info,
        show_type: t.msg.show_type,
        to_id: s.user_id,
        to_source: s.user_source
    }, n = {
        msg: a.get("msg-send-converter")(i),
        onSendMsgBegin: e.begin,
        onSendMsgSuccess: e.success,
        onSendMsgFail: e.error
    };
    h.sendMsg(n);
}, k = function(t, e) {
    h.getContact(t.user_id, t.user_source, function(t) {
        e && e(t);
    });
}, E = function(t) {
    if (null !== _ && _.user_id && _.user_source) {
        var e = this, a = [];
        h.read(_.user_id, _.user_source), t.forEach(function(t) {
            var s = void 0;
            if (m.user_id + "" == t.sender_id + "" && m.user_source + "" == t.sender_source + "") s = "true"; else {
                if (_.user_id + "" != t.sender_id + "" || _.user_source + "" != t.sender_source + "") return;
                s = "false";
            }
            t.msg_list.forEach(function(t) {
                if ("true" === s && (t.to_id + "" != _.user_id + "" || t.to_source + "" != _.user_source + "")) return !0;
                t.send_status = "", t.ismine = s, t.feedback_info = "", a.unshift(t);
            }), a.sort(function(t, e) {
                return t.msg_id > e.msg_id ? 1 : t.msg_id < e.msg_id ? -1 : 0;
            }), D.call(e, a, "down");
        });
    }
}, T = function(t, e, a) {
    h.getCaptcha(t, e, a);
}, L = function(t, e, a) {
    h.validateCaptcha(t, e, a);
}, M = function() {
    var t = this, e = t.data.msglist, a = null;
    r && !o && (o = !0, t.setData({
        loadStatus: {
            showLoading: !0,
            loadInfo: ""
        }
    }), 0 !== e.length && (e.length > 0 && e[0].msg_id && "" !== e[0].msg_id && (a = e[0].msg_id), 
    b(_, a, function(e) {
        0 !== e.length ? (e.sort(function(t, e) {
            return t.msg_id > e.msg_id ? 1 : t.msg_id < e.msg_id ? -1 : 0;
        }), t.data.msglist.length > 0 && t.setData({
            isShowMark: !0,
            msgListMark: t.data.msglist.slice(0, u - 1)
        }), D.call(t, e, "up"), t.setData({
            loadStatus: {
                showLoading: !1
            }
        }), t.setData({
            scrollTop: 0 !== d ? d : 1
        })) : t.setData({
            loadStatus: {
                showLoading: !1,
                loadInfo: "全部加载完毕"
            }
        });
    }, function() {
        t.setData({
            loadStatus: {
                showLoading: !0,
                loadInfo: "加载失败,请重试~"
            }
        }), o = !1;
    })));
}, A = [], R = {}, C = function() {
    i = 0, n = 0, o = !1, r = !1, u = 10, c = 0, d = 0, m = {}, _ = {}, p = null, g = {}, 
    h && h.remove("msgReceived", f);
};

Page({
    data: {
        msglist: [],
        inputData: "",
        scrollHeight: 0,
        scrollTop: 0,
        upperThreshold: 0,
        toView: "",
        imgArr: [],
        loadStatus: {
            showLoading: !1,
            loadInfo: ""
        },
        captcha: {
            isShow: !1,
            isError: !1,
            captcha_image: "",
            captcha_tips: "请输入图片验证码",
            inputData: "",
            focus: !1
        },
        hideMsg: !0,
        isShowMark: !1,
        msgListMark: [],
        topic: null,
        loginStatus: {
            isShow: !1,
            loginInfo: ""
        },
        isIphoneX: !1
    },
    onLoad: function(t) {
        var e = t.userid, a = t.usersource;
        s.isEmpty(e) || s.isEmpty(a) ? wx.navigateBack({
            delta: 1
        }) : _ = {
            user_id: e,
            user_source: a
        };
    },
    onShow: function() {
        this.setData({
            scrollHeight: l.getChatViewHeight()
        });
        var t = l.checkInit("chat");
        if (t.isNeedRefreshPage) {
            C();
            var i = getCurrentPages().length, n = getCurrentPages()[i - 1].route.split("/"), o = n.length;
            wx.reLaunch({
                url: n[o - 1]
            });
        } else if (t.isShowLogoutBtn ? this.setData({
            loadStatus: {
                showLoading: !1
            },
            loginStatus: {
                isShow: !0,
                loginInfo: a.get("notloginInfo")
            }
        }) : this.setData({
            loadStatus: {
                showLoading: !1
            },
            loginStatus: {
                isShow: !1
            }
        }), t.isInited) {
            h = l.sdk(), m = l.me();
            var r = this;
            k(m, function(t) {
                (m = s.isEmpty(t) ? {} : t).avatar = e(s.isEmpty(m.avatar) ? a.get("default-avatar") : m.avatar);
            }), k({
                user_id: _.user_id,
                user_source: _.user_source
            }, function(t) {
                (_ = s.isEmpty(t) ? {} : t).avatar = e(s.isEmpty(_.avatar) ? a.get("default-avatar") : _.avatar), 
                wx.setNavigationBarTitle({
                    title: _.user_name ? _.user_name : _.remark_name
                });
            }), f = function(t) {
                E.call(r, t);
                var e = r.data.msglist.length - 1;
                r.setData({
                    toView: "msg-" + e
                });
            }, h.listen("msgReceived", f), wx.stopPullDownRefresh(), b(_, null, function(t) {
                t.sort(function(t, e) {
                    return t.msg_id > e.msg_id ? 1 : t.msg_id < e.msg_id ? -1 : 0;
                }), D.call(r, t, "down");
                var e = r.data.msglist.length - 1;
                r.setData({
                    toView: "msg-" + e,
                    hideMsg: !1
                }), t.length < u && r.setData({
                    loadStatus: {
                        showLoading: !1,
                        loadInfo: "全部加载完毕"
                    }
                });
            }, function() {}), null !== _ && _.user_id && _.user_source && h.read(_.user_id, _.user_source), 
            a.get("on-contactchange")(_.user_id, _.user_id), a.get("on-chatwindowcreate")(_.user_id, _.user_id);
            var c = l.getTopic(_);
            c && this.setData({
                topic: c
            }), wx.getSystemInfo({
                success: function(t) {
                    console.log("手机信息res" + t.model), -1 != t.model.search("iPhone X") && (r.setData({
                        isIphoneX: !0
                    }), console.log("xxxxxxxxxxx"));
                }
            });
        }
    },
    onUnload: function() {
        C();
    },
    oneditorbindinput: function(t) {
        this.data.inputData = t.detail.value;
    },
    onsendmsg: function(t) {
        var e = {
            formId: t.detail && t.detail.formId ? t.detail.formId : ""
        }, s = this, i = {
            send_time: new Date().getTime(),
            sender_info: m,
            sender_id: m.user_id,
            sender_source: m.user_source,
            content: {
                msg: s.data.inputData,
                type: "text"
            },
            msg_id: "",
            show_type: "text",
            ismine: "true",
            send_status: "sending",
            feedback_info: ""
        }, n = t ? t.target ? i : t : i;
        "" !== n.content.msg && I({
            contact: _,
            msg: n
        }, {
            begin: function() {
                D.call(s, [ n ], "down"), s.setData({
                    inputData: ""
                });
                var t = s.data.msglist.length - 1;
                s.setData({
                    toView: "msg-" + t
                });
            },
            success: function(t) {
                n.send_status = "", n.feedback_info = "", n.send_time = t.send_time, n.msg_id = t.msg_id;
                var i = s.data.msglist.length - 1;
                S.call(s, i, n), a.get("on-msg-sent")(e);
            },
            error: function(t) {
                var e = t.error_msg ? t.error_msg : "";
                n.feedback_msg_hide = t.msg_hide, "" === e ? e = "您的网络未连接，请检查后重试。" : 42009 === t.error_code ? wx.showModal({
                    title: "发送失败！",
                    content: "您未绑定手机号，请绑定后重试",
                    confirmText: "去绑定",
                    success: function(t) {
                        if (t.confirm) return a.get("bind-cellphone")();
                    }
                }) : 40021 === t.error_code && (s.setData({
                    captcha: {
                        isShow: !0,
                        isError: !1,
                        captcha_image: "",
                        captcha_tips: "请输入图片验证码",
                        inputData: "",
                        focus: !0
                    }
                }), s.onchangecaptchaimg()), n.send_status = "fail", n.feedback_info = e;
                var i = s.data.msglist.length - 1;
                S.call(s, i, n);
            }
        });
    },
    onresendmsg: function(t) {
        var e = this, a = t ? t.target.id.split("-")[1] : e.data.msglist.length - 1, s = e.data.msglist[a];
        e.data.msglist.splice(a, 1), s.send_status = "sending", s.feedback_info = "", "text" === s.show_type && s.content.msg instanceof Array && (s.content.msg = s.content.msg[0].value), 
        e.onsendmsg(s);
    },
    onupper: function() {
        M.call(this);
    },
    onscroll: function(t) {
        var e = this, a = t.detail.scrollHeight;
        d = t.detail.scrollTop, 0 === t.detail.scrollTop ? (r = !0, M.call(e)) : r = !1, 
        c < a && (e.setData({
            scrollTop: d + (a - c)
        }), c = a), e.setData({
            isShowMark: !1
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onimagepreview: function(t) {
        var a = this;
        wx.previewImage({
            current: e(t.target.dataset.url),
            urls: a.data.imgArr
        });
    },
    onaudioplay: function(t) {
        var e = this, a = t.currentTarget.dataset, s = a.audio, i = parseInt(a.idx), n = wx.createAudioContext(s), o = e.data.msglist, r = o[i];
        0 === r.play_time && (r.play_time = new Date().getTime(), function(t) {
            var e = [];
            e.push(t), h.ackMsgRead(e);
        }(r)), r.is_playing ? (r.is_playing = !1, n.seek(0), n.pause()) : (A.forEach(function(t) {
            t.audio.seek(0), t.audio.pause(), o[t.idx].is_playing = !1;
        }), r.is_playing = !0, n.play()), R[s] || (R[s] = !0, A.push({
            idx: i,
            audioId: s,
            audio: n
        })), e.setData({
            msglist: o
        });
    },
    onoverplay: function(t) {
        var e = this, a = parseInt(t.currentTarget.dataset.idx);
        e.data.msglist[a].is_playing = !1, e.setData({
            msglist: e.data.msglist
        });
    },
    oncaptchabindinput: function(t) {
        var e = this, a = e.data.captcha;
        a.inputData = t.detail.value, e.setData({
            captcha: a
        });
    },
    onchangecaptchaimg: function() {
        var t = this;
        T({
            normal_get: 1
        }, function(e) {
            var a = t.data.captcha;
            a.captcha_image = "data:image/png;base64," + e.param.pic_base64_data, t.setData({
                captcha: a
            }), p = e.responseId;
        }, function() {});
    },
    oncaptchaclosure: function() {
        var t = this, e = t.data.captcha;
        e.isShow = !1, e.focus = !1, t.setData({
            captcha: e
        });
    },
    oncaptchasubmit: function() {
        var t = this, e = {
            userInput: t.data.captcha.inputData,
            responseId: p
        }, a = t.data.captcha;
        L(e, function(e) {
            a.isShow = !1, a.focus = !1, t.setData({
                captcha: a
            }), t.onresendmsg();
        }, function(e) {
            40020 === e.error_code ? (a.isError = !0, a.captcha_tips = "填写错误，请重试") : (a.isError = !1, 
            a.captcha_tips = "验证超时，请重试"), t.setData({
                captcha: a
            }), t.onchangecaptchaimg();
        });
    },
    ontouchstart: function(t) {
        "input" !== t.target.dataset.type && wx.hideKeyboard();
    },
    setTopic: function(t, e) {
        _.user_id + "@" + _.user_source == t.user_id + "@" + t.user_source && this.setData({
            topic: e
        });
    },
    immeta: {
        name: "chat"
    },
    onTopicClick: function() {
        a.get("on-topic-click")(this.data.topic);
    },
    onGoLogin: function() {
        l.handleLogin();
    }
});