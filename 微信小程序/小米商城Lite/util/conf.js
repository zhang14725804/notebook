module.exports = {
    apiUrl: "https://app.m.mi.com/v2/",
    client_id: "180100041089",
    channel_id: "1044.1000",
    mishop_wx_version: 1.3,
    keyStr: "JF)#Poga3_agq638",
    accountUrl: "https://account.xiaomi.com",
    visitorUrl: "https://v.id.mi.com",
    sid: "mieshop_weixin",
    appid: "wx17ea87763491620f",
    passportRoot: {
        dev: {
            root: "http://account.preview.n.xiaomi.net"
        },
        pro: {
            root: "https://account.xiaomi.com"
        }
    },
    visitorRoot: {
        dev: {
            root: "http://visitor.preview.n.xiaomi.net"
        },
        pro: {
            root: "https://v.id.mi.com"
        }
    },
    appInfo: {
        sid: "mieshop_weixin",
        appid: "wx17ea87763491620f",
        authType: 0,
        psid: "mieshop_weixin",
        appPackage: "mieshop_weixin"
    },
    conf: {
        env: "pro",
        loginType: "smsLogin",
        loginPage: "/pages/milogin/milogin"
    }
};