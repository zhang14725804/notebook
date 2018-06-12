getApp();

Page({
    data: {
        piwikSource: "",
        imagePath: getApp().globalData.imagePath + "unlock/",
        phonetype: "苹果账号",
        unlockTutorials: [ {
            type: "苹果账号",
            labelClass: "selected",
            sections: [ {
                title: "苹果账号密码解除",
                steps: [ {
                    src: "iphone-1.png",
                    num: "01",
                    text: "进入设置-iCloud"
                }, {
                    src: "iphone-2.png",
                    num: "02",
                    text: "点击“注销”按钮"
                }, {
                    src: "iphone-3.png",
                    num: "03",
                    text: "点击“从我的iPhone”删除"
                } ]
            }, {
                title: "关闭开机密码",
                steps: [ {
                    src: "iphone-boot-1.png",
                    num: "01",
                    text: "设置-Touch ID"
                }, {
                    src: "iphone-boot-2.png",
                    num: "02",
                    text: "点击“关闭密码”"
                } ]
            } ]
        }, {
            type: "三星账号",
            labelClass: "",
            sections: [ {
                title: "三星账号密码解除",
                steps: [ {
                    src: "samsung-1.png",
                    num: "01",
                    text: "选择“设置”"
                }, {
                    src: "samsung-2.png",
                    num: "02",
                    text: "选择“账户”"
                }, {
                    src: "samsung-3.png",
                    num: "03",
                    text: "选择“三星账户”"
                }, {
                    src: "samsung-4.png",
                    num: "04",
                    text: "选择“账户抬头”"
                }, {
                    src: "samsung-5.png",
                    num: "05",
                    text: "点击右上角其他"
                }, {
                    src: "samsung-6.png",
                    num: "06",
                    text: "删除账户"
                } ]
            } ]
        }, {
            type: "小米账号",
            labelClass: "",
            sections: [ {
                title: "小米账号密码解除",
                steps: [ {
                    src: "xiaomi-1.png",
                    num: "01",
                    text: "进入设置-账户"
                }, {
                    src: "xiaomi-2.png",
                    num: "02",
                    text: "点击“退出账户”"
                }, {
                    src: "xiaomi-3.png",
                    num: "03",
                    text: "选择“从手机上删除”"
                } ]
            } ]
        }, {
            type: "魅族账号",
            labelClass: "",
            sections: [ {
                title: "魅族账号密码解除",
                steps: [ {
                    src: "meizu-1.png",
                    num: "01",
                    text: "进入设置-选择我的Flyme账户"
                }, {
                    src: "meizu-2.png",
                    num: "02",
                    text: "点击用户头像栏"
                }, {
                    src: "meizu-3.png",
                    num: "03",
                    text: "点击“退出账户”"
                } ]
            } ]
        }, {
            type: "乐视账号",
            labelClass: "",
            sections: [ {
                title: "乐视账号密码解除",
                steps: [ {
                    src: "letv-1.png",
                    num: "01",
                    text: "进入我的，点击“退出账号”"
                }, {
                    src: "letv2.png",
                    num: "02",
                    text: "输入密码退出账号"
                } ]
            } ]
        } ]
    },
    onLoad: function(t) {
        this.setClass();
    },
    setClass: function() {
        var t = this, s = t.data.unlockTutorials;
        s && s.forEach(function(s, e) {
            s.sections && s.sections.forEach(function(s, e) {
                s.clazz = "section", s.steps && s.steps.forEach(function(s, e) {
                    s.src = t.data.imagePath + s.src, s.clazz = (e + 1) % 2 == 1 ? "process" : "process reverse";
                }), s.steps[0].clazz += " process-first";
            }), s.sections[0].clazz += " section-first";
        }), t.setData({
            unlockTutorials: s
        });
    },
    handleOnTapRadio: function(t) {
        var s = this, e = t.target.dataset.index, n = s.data.unlockTutorials[e].type;
        s.data.unlockTutorials.forEach(function(t, s) {
            t.labelClass = "";
        }), s.data.unlockTutorials[e].labelClass = "selected", s.setData({
            phonetype: n,
            unlockTutorials: this.data.unlockTutorials
        });
    }
});