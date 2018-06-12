module.exports = {
    route: "/login",
    env: "",
    api: "portm",
    promise: null,
    appConfig: {
        appName: "group",
        risk_platform: 0,
        risk_partner: 0,
        persistKey: "logindata"
    },
    entryPageOption: {
        title: "登录",
        imageSrc: "https://p0.meituan.net/codeman/1d662d64d96895705a1d0b9433fd0fa8175649.png",
        imageMode: "aspectFit",
        wxLoginText: "微信用户一键登录",
        mobileLoginText: "手机号码登录/注册"
    },
    bindPageOption: {
        title: "绑定手机",
        sendCodeActiveStyle: "color: #06C1AE",
        loginActiveStyle: "background: #06C1AE; color: #FFF"
    },
    tips: {
        smsCodeSent: "验证码已发送",
        logining: "登录中...",
        loginSuccess: "登录成功",
        loginParamLoss: "验证信息丢失，请重新发送验证码！",
        relogin: "您已登录，是否重新登录？",
        refuseUserInfoAuth: "您已拒绝授权用户信息，请重新点击并授权！",
        refusePhoneNumberAuth: "您已拒绝授权，请重新点击并授权！",
        verifyFailed: "验证失败",
        networkTimeout: "网络连接超时，请重试",
        illegalVerifyType: "验证方式id不合法，请重试或联系客服",
        illegalPhoneNumber: "请输入正确的11位手机号",
        illegalSmsCode: "请输入正确的6位验证码",
        illegalAuthInfo: "获取的授权信息不正确，请重试"
    }
};