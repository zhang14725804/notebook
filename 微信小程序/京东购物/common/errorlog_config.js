var e = {
    "wxapp/login": {
        codeField: "retCode",
        ignoreCode: [ "0", "100" ]
    },
    "vipplus/GetPlusVerifyStatusInfo": {
        codeField: "retcode",
        ignoreCode: [ "0", "2", "4" ]
    },
    "seckill/show": {
        codeField: "errCode",
        ignoreCode: [ "0" ]
    }
};

exports.errorLogWhiteList = e;