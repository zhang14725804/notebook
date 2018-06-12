(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a) {
        if (Array.isArray(a)) {
            for (var b = 0, c = Array(a.length); b < a.length; b++) c[b] = a[b];
            return c;
        }
        return Array.from(a);
    }
    var c = require("../../../utils/ppdog"), d = a(c), e = require("../../../utils/regenerator-runtime"), f = a(e), g = require("../../../utils/RequestApi"), h = require("../../../filter/commentFilter"), i = a(h);
    Page({
        data: {
            replyText: "",
            replyPrefix: "",
            previewImages: [],
            uploadTask: [],
            serverImages: [],
            imagesInfo: [],
            showEmojiFlag: !1,
            shouldAddImage: !0,
            placeholder: "",
            keyBoardShowEmoji: !0,
            autoFocus: !0,
            focusflag: !0,
            indicatorDots: !0,
            isIphoneX: !1,
            hasInput: !1,
            emojiArr: [ {
                pid: 0,
                list: [ "微笑", "撇嘴", "色", "发呆", "得意", "流泪", "害羞", "闭嘴", "睡", "大哭", "尴尬", "发怒", "调皮", "呲牙", "惊讶", "难过", "酷", "冷汗", "抓狂", "吐", "del" ]
            }, {
                pid: 1,
                list: [ "偷笑", "愉快", "白眼", "傲慢", "饥饿", "困", "惊恐", "流汗", "憨笑", "悠闲", "奋斗", "咒骂", "疑问", "嘘", "晕", "疯了", "衰", "骷髅", "敲打", "再见", "del" ]
            }, {
                pid: 2,
                list: [ "擦汗", "抠鼻", "鼓掌", "糗大了", "坏笑", "左哼哼", "右哼哼", "哈欠", "鄙视", "委屈", "快哭了", "阴险", "亲亲", "吓", "可怜", "菜刀", "西瓜", "啤酒", "篮球", "乒乓", "del" ]
            }, {
                pid: 3,
                list: [ "咖啡", "饭", "猪头", "玫瑰", "凋谢", "嘴唇", "爱心", "心碎", "蛋糕", "闪电", "炸弹", "刀", "足球", "瓢虫", "便便", "月亮", "太阳", "礼物", "拥抱", "强", "del" ]
            }, {
                pid: 4,
                list: [ "弱", "握手", "胜利", "抱拳", "勾引", "拳头", "差劲", "爱你", "NO", "OK", "爱情", "飞吻", "跳跳", "发抖", "怄火", "转圈", "磕头", "回头", "跳绳", "投降", "del" ]
            } ]
        },
        onLoad: function(a) {
            var b = getApp(), c = a.id, d = c === void 0 ? null : c, e = a.name, f = e === void 0 ? null : e, g = a.toOpenid, h = g === void 0 ? null : g, i = a.symbol, j = i === void 0 ? null : i, k = a.type, l = k === void 0 ? "" : k, m = a.type2, n = m === void 0 ? "" : m, o = a.touser, p = o === void 0 ? null : o, q = a.rootid, r = q === void 0 ? null : q, s = a.content, t = s === void 0 ? "" : s, u = a.topicId, v = u === void 0 ? null : u, w = a.topic, x = w === void 0 ? null : w, y = "", z = "", A = "", B = "", C = "";
            "detail" != l && j && f ? (A = y + "#" + f + "#" + y, B = y + "[" + j + " " + f + "]" + y) : "detail" != l && v && x ? (A = z + "#" + x + "#" + z, 
            B = z + "<4," + v + ":" + x + ">" + z) : p && (C = "回复" + p + ":");
            var D = b.SystemInfo, E = !1;
            try {
                /iphone\sx/i.test(D.model) && (E = !0);
            } catch (a) {}
            this.setData({
                id: d,
                rootid: r,
                symbol: j,
                name: f,
                toOpenid: h,
                touser: p,
                replyText: A,
                replyPrefix: B,
                type: l,
                type2: n,
                content: t,
                placeholder: C,
                isIphoneX: E,
                shouldAddImage: "detail" != l,
                topic: x,
                topicId: v
            });
        },
        onReady: function() {},
        onShow: function() {},
        onHide: function() {},
        bindfocus: function() {
            this.setData({
                showEmojiFlag: !1
            });
        },
        bindblur: function(a) {
            console.log("blur", a);
            var b = null == this.data.replyText ? a.detail.value : this.data.replyText, c = a.detail.cursor || b.length, d = /\x1e#\S+[\s|\S]*\S+\#\x1e/, e = /\x1c#[\s|\S]*\#\x1c/, f = b.match(d), g = b.match(e);
            f || g || !this.data.replyPrefix ? this.setData({
                cursor: c
            }) : this.setData({
                replyPrefix: "",
                cursor: c
            });
        },
        bindinpute: function(a) {
            var b = a.detail.value, c = a.detail.cursor || this.data.cursor, d = b;
            if (console.log("input e:", a), a.detail.keyCode && 8 == a.detail.keyCode) {
                var e = /(\[\S{1,3}\]$)|(^\x1e#\S+[\s|\S]*\S+\#\x1e$)/, f = this.data.replyText, g = f.substr(0, c + 1), h = f.substr(c + 1), i = g.length, j = g.match(e), k = j && j[0];
                if (k) {
                    var l = k.length;
                    d = g.substr(0, i - l) + h;
                } else d = g.substr(0, i - 1) + h;
            }
            this.setData({
                hasInput: "" != d,
                cursor: c,
                replyText: d
            });
        },
        showEmoji: function() {
            var a = !this.data.showEmojiFlag;
            this.setData({
                showEmojiFlag: a
            }), g.Request.reportData({
                sop: "xcx_postdetail_emoji",
                stockid: this.data.symbol
            });
        },
        tapEmoji: function(a) {
            var c = this, d = [];
            this.data.emojiArr.forEach(function(a) {
                d.push.apply(d, b(a.list));
            }), setTimeout(function() {
                var b = a.target.dataset.name, e = c.data.replyText, f = e.length, g = c.data.cursor || f;
                if ("del" == b) {
                    var h = e.match(/\[\S{1,3}\]$/), i = h && h[0];
                    if (i) {
                        var j = i.substr(1, i.length - 2), k = j.length;
                        e = 0 <= d.indexOf(j) ? e.substr(0, f - k - 2) : e.substr(0, f - 1);
                    } else e = e.substr(0, f - 1);
                } else e = e.substr(0, c.data.cursor) + ("[" + b + "]") + e.substr(c.data.cursor), 
                g += b.length + 2;
                c.setData({
                    replyText: e,
                    cursor: g
                });
            }, 5);
        },
        bindconfirm: function() {},
        previewImage: function(a) {
            var b = this, c = a.target.dataset.src;
            wx.previewImage({
                current: c,
                urls: b.data.previewImages
            });
        },
        chooseImage: function() {
            var a = this;
            g.Request.reportData({
                sop: "xcx_postdetail_pic",
                stockid: this.data.symbol
            }), this.setData({
                showEmojiFlag: !1
            });
            var b = this;
            return 9 == b.data.previewImages.length ? void wx.showToast({
                title: "最多只能上传9张图片",
                icon: "none",
                duration: 2e3
            }) : void d.default.wx.chooseImage({
                count: 9 - b.data.previewImages.length,
                sizeType: [ "original", "compressed" ],
                sourceType: [ "album", "camera" ]
            }).then(function(a) {
                var c = a.tempFilePaths, e = b.data.previewImages.length, f = b.data.previewImages.concat(c);
                b.setData({
                    previewImages: f,
                    lastImagesLen: e,
                    focusflag: !0
                });
                var h = b.data.serverImages, j = b.data.uploadTask;
                j.length = f.length, h.length = f.length, g.Request.auth().then(function(a) {
                    var d = a.openid, f = a.sid, g = c.map(function(a, c) {
                        var g = e + c;
                        j[g] = wx.uploadFile({
                            url: "https://groupt.finance.qq.com/newstockgroup/commentPlat/putImagePlat",
                            filePath: a,
                            name: "image_1",
                            formData: {
                                target: "pf",
                                openid: d,
                                sid: f
                            },
                            success: function(a) {
                                var c = JSON.parse(a.data);
                                h[g] = c.data.image_1, b.setData({
                                    serverImages: h
                                });
                            }
                        }), j[g].onProgressUpdate(function(a) {
                            j[g].progress = a.progress, b.setData({
                                uploadTask: j
                            });
                        });
                    });
                });
                var i = b.data.imagesInfo;
                c.forEach(function(a, c) {
                    d.default.wx.getImageInfo({
                        src: a
                    }).then(function(a) {
                        i[e + c] = {
                            width: a.width,
                            height: a.height
                        }, b.setData({
                            imagesInfo: i
                        });
                    });
                });
            }).catch(function() {
                a.setData({
                    focusflag: !0
                });
            });
        },
        delImage: function(a, b) {
            var c = a ? a.currentTarget.dataset.idx : b, d = this.data, e = d.uploadTask, f = d.previewImages, g = d.serverImages, h = d.imagesInfo, i = d.lastImagesLen;
            e.splice(c, 1), f.splice(c, 1), g.splice(c, 1), h.splice(c, 1), this.setData({
                uploadTask: e,
                previewImages: f,
                serverImages: g,
                imagesInfo: h,
                lastImagesLen: c < i ? i - 1 : i
            });
        },
        submitComment: function(a) {
            var b = this;
            b.setData({
                focusflag: !1
            });
            var c = a.currentTarget.dataset.op;
            c && setTimeout(function() {
                b.submit();
            }, 200);
        },
        submit: function() {
            var a = this, b = getApp(), c = b.Event, e = a.data, f = e.serverImages, h = e.imagesInfo, j = e.uploadTask, k = this.checkUploadStatus();
            if (k) {
                var l = a.data, m = l.replyPrefix, n = l.replyText, o = l.type, p = l.type2, q = l.touser, r = l.toOpenid;
                if (m) {
                    var s = a.data.name ? a.data.name.length + 4 : a.data.topic.length + 4;
                    n = m + n.substring(s);
                }
                var t = "reply" == p ? n + "<1," + r + ":" + q + "> " + a.data.content : "" + n, u = [];
                a.data.previewImages.forEach(function(a) {
                    u.push({
                        origin: a,
                        filesize: "",
                        origin_prop: ""
                    });
                });
                var v = {
                    comment: [ {
                        content: t,
                        image_list: u,
                        created_at: "刚刚",
                        publishType: u.length ? 4 : 1
                    } ]
                }, w = new d.default();
                w.resolve(v);
                var x = Date.now().toString().substring(7);
                w.then().filter(i.default).then(function(a) {
                    a && g.Request.getWxUserInfo().then(function(b) {
                        if (b) {
                            var d = a.commentsData[0];
                            d.fake_id = x, d.like_num = 0, d.comment_cnt = 0, d.user_image = b.avatarUrl, d.user_name = b.nickName, 
                            d.type = o, d.type2 = p, d.from_user = wx.getStorageSync("userinfo").openid;
                            var e = "detail" == o ? "newComment" : "newSubject";
                            c.emit(e, {
                                post: d
                            }), wx.showToast({
                                title: "帖子发表成功",
                                icon: "success",
                                duration: 2e3
                            }), setTimeout(function() {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }, 800);
                        }
                    });
                });
                var y = {
                    replyText: t,
                    image_list: f,
                    imagesInfo: h,
                    id: a.data.id,
                    rootid: a.data.rootid || a.data.id,
                    symbol: a.data.symbol,
                    type: o,
                    type2: p,
                    topicId: a.data.topicId,
                    topic: a.data.topic
                };
                g.Request.postComment(y, o).then(function(b) {
                    g.Request.reportData({
                        sop: "xcx_post_send",
                        stockid: a.data.symbol
                    });
                    var d = "detail" == o ? "newComment" : "newSubject";
                    c.emit(d, {
                        parent_id: a.data.id,
                        root_id: a.data.rootid,
                        comment_id: b,
                        fake_id: x,
                        type: o,
                        type2: p
                    });
                });
            }
        },
        checkUploadStatus: function() {
            var a = this, b = this.data.uploadTask, c = !0, d = null;
            return b.forEach(function(a, b) {
                a ? a.onProgressUpdate(function(a) {
                    a.progress;
                    100 != process && (c = !1, d = b);
                }) : c = !1;
            }), !!c || void wx.showModal({
                title: "提示",
                content: "还有图片未上传成功，确定要放弃该图片,发表评论？",
                success: function(b) {
                    return b.confirm ? (a.delImage(null, d), !0) : !b.cancel && void 0;
                }
            });
        }
    });
})();