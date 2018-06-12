var a = require("../../netdiisk_requestapi/getAudioUrls.js"), t = require("../../netdisk_utils/transform.js"), i = getApp(), e = wx.getBackgroundAudioManager();

Page({
    data: {
        audioName: "",
        audioSize: "",
        currentTime: "00:00",
        endTime: "00:00",
        audioProgress: 0,
        isPlay: !1,
        currentIndex: 0,
        audioList: [],
        durationData: {},
        durationMoving: !1
    },
    onLoad: function(a) {
        this.data.currentIndex = Number(a.currentIndex), this.data.audioList = i.globalData.audioList, 
        this.data.pixelRatio = i.globalData.systemInfo.pixelRatio, this.playAudio(this.data.currentIndex), 
        console.log("音频预览onload: ", i);
    },
    audioPlay: function() {
        this.data.isPlay ? e.pause() : e.play();
    },
    previousPlay: function() {
        0 == +this.data.currentIndex ? (this.data.currentIndex = this.data.audioList.length - 1, 
        this.playAudio(this.data.currentIndex)) : (this.data.currentIndex = this.data.currentIndex - 1, 
        this.playAudio(this.data.currentIndex));
    },
    nextPlay: function() {
        +this.data.currentIndex == this.data.audioList.length - 1 ? (this.data.currentIndex = 0, 
        this.playAudio(this.data.currentIndex)) : (this.data.currentIndex = this.data.currentIndex + 1, 
        this.playAudio(this.data.currentIndex));
    },
    playAudio: function(s) {
        var n = this, o = this.data.audioList[s], d = {
            path: o.path,
            fid: o.fs_id,
            name: o.server_filename,
            size: o.size,
            originSize: o.originSize
        };
        this.setData({
            audioName: d.name,
            audioSize: d.size
        }), (0, a.getAudiosUrls)(d.path).then(function(a) {
            e.src = i.globalData.testAudios[s], e.title = d.name, e.onTimeUpdate(function() {
                n.data.durationMoving || null !== e.duration && 0 !== e.duration && n.setData({
                    currentTime: (0, t.msToMin)(e.currentTime),
                    endTime: (0, t.msToMin)(e.duration),
                    audioProgress: e.currentTime / e.duration * 100
                });
            }), e.onPlay(function() {
                console.log("onPlay-----------------"), n.data.isPlay = !0, n.setData({
                    isPlay: n.data.isPlay
                });
            }), e.onPause(function(a) {
                console.log("onPause-----------------"), n.data.isPlay = !1, n.setData({
                    isPlay: n.data.isPlay
                });
            }), e.onStop(function(a) {
                console.log("onStop-----------"), n.data.isPlay = !1, n.setData({
                    isPlay: n.data.isPlay
                });
            }), e.onEnded(function(a) {
                console.log("onEnded-----------"), n.data.isPlay = !1, n.setData({
                    isPlay: n.data.isPlay
                }), n.nextPlay();
            }), e.onError(function(a) {
                n.data.isPlay = !1, n.setData({
                    isPlay: n.data.isPlay
                }), console.log("onError--------:", a);
            });
        });
    },
    onShareAppMessage: function() {},
    durationStart: function(a) {
        console.log("ssssstart: ", a), this.data.durationMoving = !0, this.data.durationData.sPageX = a.changedTouches[0].pageX, 
        this.data.durationData.sOffestLeft = a.currentTarget.offsetLeft;
    },
    durationMove: function(a) {
        this.data.durationData.nPageX = a.changedTouches[0].pageX;
        var i = this.data.durationData.nPageX - this.data.durationData.sPageX;
        if (i > 0) {
            this.data.durationData.cOffestLeft = this.data.durationData.sOffestLeft + i;
            var s = this.data.durationData.cOffestLeft * this.data.pixelRatio / 498;
            this.data.durationData.cOffestLeft * this.data.pixelRatio > 498 && (s = 1), this.setData({
                currentTime: (0, t.msToMin)(e.duration * s),
                audioProgress: 100 * s
            });
        } else {
            this.data.durationData.cOffestLeft = this.data.durationData.sOffestLeft + i;
            var n = this.data.durationData.cOffestLeft * this.data.pixelRatio / 498;
            this.data.durationData.cOffestLeft * this.data.pixelRatio <= 0 && (n = 0), this.setData({
                currentTime: (0, t.msToMin)(e.duration * n),
                audioProgress: 100 * n
            });
        }
    },
    durationEnd: function(a) {
        console.log("eeeeeeend: ", a), this.data.durationMoving = !1, this.data.durationData.ePageX = a.changedTouches[0].pageX;
        var i = this.data.durationData.ePageX - this.data.durationData.sPageX;
        if (i > 0) {
            this.data.durationData.cOffestLeft = this.data.durationData.sOffestLeft + i;
            var s = this.data.durationData.cOffestLeft * this.data.pixelRatio / 498;
            this.data.durationData.cOffestLeft * this.data.pixelRatio > 498 && (s = 1), console.log("嘿嘿哈哈：", s), 
            this.setData({
                currentTime: (0, t.msToMin)(e.duration * s),
                audioProgress: 100 * s
            }, function(a) {
                e.seek(e.duration * s);
            });
        } else {
            this.data.durationData.cOffestLeft = this.data.durationData.sOffestLeft + i;
            var n = this.data.durationData.cOffestLeft * this.data.pixelRatio / 498;
            this.data.durationData.cOffestLeft * this.data.pixelRatio <= 0 && (n = 0), this.setData({
                currentTime: (0, t.msToMin)(e.duration * n),
                audioProgress: 100 * n
            }, function(a) {
                e.seek(e.duration * n);
            });
        }
    }
});