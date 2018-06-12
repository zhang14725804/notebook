var t = getApp();

t.createPage([ {
    methodOptions: {},
    data: {
        pageType: "web-view",
        pageName: "make-friends",
        dispLocalId: "",
        thirdKey: "",
        versionNormal: !1,
        routerPath: ""
    },
    _onLoad: function(e) {
        var a = this, i = "", r = t.constData.thirdKey || e.thirdKey || t.storage.getSync("wxThirdKey").thirdKey;
        console.log("进入交友的webview"), console.log(e);
        var s = "", o = "https://activity.58.com/wxa/love/index#/";
        if (e.scene) t.globalData.isFriendBack = !0, t.request("https://activity.58.com/wxa/love/friendquiz", {
            thirdKey: r,
            scene: e.scene
        }).then(function(t) {
            switch ((t.data && t.data.questions ? t : t.data).code) {
              case 0:
                s = "tacit-poster";
                break;

              case 1:
                s = "tacit-share";
                break;

              case 2:
                s = "tacit";
            }
            i = "" + o + s + "?thirdKey=" + r + "&scene=" + e.scene, a.setDataLazy({
                routerPath: i
            });
        }); else {
            if (s = "", "push" === e.friendType) {
                if ("chat" === e.friendPath) return o = "https://imwx.58.com/im/chat", i = o + "?thirdKey=" + r + "#/" + s + "?thirdKey=" + r, 
                void this.setDataLazy({
                    routerPath: i
                });
                if ("test" === e.friendPath) return s = "tacit", void t.request("https://activity.58.com/wxa/love/load", {
                    thirdKey: r
                }).then(function(t) {
                    !0 !== t.data.tacit && (s = "tacit-test"), i = "" + o + s + "?thirdKey=" + r, a.setDataLazy({
                        routerPath: i
                    });
                });
            }
            i = "" + o + s + "?thirdKey=" + r, this.setDataLazy({
                routerPath: i
            });
        }
    },
    _onShow: function() {}
} ]);