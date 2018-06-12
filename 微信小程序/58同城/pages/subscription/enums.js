var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

module.exports = {
    salary_1_name: "薪资",
    salaryUnit_1: "元",
    salary_1: {
        0: "不限",
        1: "1000元以下",
        2: "1000-2000元",
        3: "2000-3000元",
        4: "3000-5000元",
        5: "5000-8000元",
        6: "8000-12000元",
        7: "12000-20000元",
        8: "20000-25000元",
        9: "25000元以上"
    },
    salary_3_name: "租金",
    salaryUnit_3: "元",
    salary_3: {
        0: "不限",
        1: "600元以下",
        2: "600-1000元",
        3: "1000-1500元",
        4: "1500-2000元",
        5: "2000-3000元",
        6: "3000-5000元",
        7: "5000-8000元",
        8: "8000元以上"
    },
    salary_4_name: "租金",
    salaryUnit_4: "元",
    salary_4: {
        0: "不限",
        1: "500元以下",
        2: "500-1000元",
        3: "1000-1500元",
        4: "1500-2000元",
        5: "2000-2500元",
        6: "2500-3000元",
        7: "3000元以上"
    },
    salaryUnit_5: "万",
    salary_5_name: "总价",
    salary_5: {
        0: "不限",
        1: "60万以下",
        2: "60-80万",
        3: "80-100万",
        4: "100-150万",
        5: "150-200万",
        6: "200-300万",
        7: "300-500万",
        8: "500-1000万",
        9: "1000万以上"
    },
    emptyValue: "不限",
    education: {
        0: "不限",
        1: "高中",
        2: "技校",
        3: "中专",
        4: "大专",
        5: "本科",
        6: "硕士",
        7: "博士"
    },
    experience: {
        0: "不限",
        1: "1年以下",
        2: "1-2年",
        3: "3-5年",
        4: "6-7年",
        5: "8-10年",
        6: "10年以上"
    },
    subscribePush: {
        0: "每天中午12点",
        1: "每天晚上20点",
        2: "中午晚上各一次"
    },
    subscribeType: {
        1: "全职招聘",
        2: "兼职招聘",
        3: "整租",
        4: "合租",
        5: "二手房",
        6: "二手车"
    },
    subscribeTypeToYouXuanType: {
        1: 1,
        2: 1,
        3: 2,
        4: 2,
        5: 3
    },
    subscribePLine: {
        1: "招聘",
        2: "房产",
        3: "二手车"
    },
    getEnumObj: function(t) {
        return "object" === (void 0 === t ? "undefined" : e(t)) ? t : this[t] || {};
    },
    getKeys: function(e) {
        var t = this.getEnumObj(e);
        return Object.keys(t);
    },
    getValues: function(e) {
        var t = this.getEnumObj(e);
        return Object.keys(t).map(function(e) {
            return t[e];
        });
    },
    getKeyByValue: function(e, t) {
        var n = this.getEnumObj(e), r = null;
        return Object.keys(n).forEach(function(e) {
            n[e] === t && (r = e);
        }), r;
    },
    getValueByKey: function(e, t) {
        return this.getEnumObj(e)[t];
    },
    getKeyValueByIndex: function(e, t) {
        return this.getKeyValuePairs(e)[t];
    },
    getKeyValuePairs: function(e, t) {
        var n = this.getEnumObj(e);
        return Object.keys(n).map(function(e, r) {
            var u = {
                key: e,
                value: n[e]
            };
            return t && t(u), u;
        });
    }
};