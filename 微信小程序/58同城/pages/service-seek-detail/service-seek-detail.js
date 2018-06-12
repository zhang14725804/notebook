function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
}, e = getApp(), i = require("../../data/priceData"), s = require("./template/vertify-info"), r = require("./template/labels-list"), n = e.APP_DATA.serviceSeekData, o = e.APP_DATA.educationData, c = e.APP_DATA.birthYearData, l = e.APP_DATA.experienceData, d = [], h = "", p = "", u = {
    bizParam: {}
}, m = "", y = "", b = "", f = {
    addressListMaxCount: 3,
    addressList: []
};

e.createPage([ {
    methodOptions: {
        e_submit: {
            type: "submit"
        },
        e_labelAdd: {
            type: "click"
        },
        e_labelSubmit: {
            type: "click"
        },
        e_verifySubmit: {
            type: "click"
        }
    },
    data: {
        operator: {
            showBanner: !1,
            modalType: 1,
            showModal: !1,
            money: 0
        },
        isFindJob: !1,
        pageType: "form",
        pageName: "service-seek-detail",
        cateid: 0,
        local: "",
        price: "不限",
        listShow: !1,
        wrapShow: !1,
        listArray: [],
        backType: 0,
        localTitle: "区域",
        serviceSeekData: [],
        tel: "",
        isLabelAlertShow: !1,
        labelTips: "",
        verifyTips: "",
        verifyTime: 60,
        isVerifyAlertShow: !1,
        position: "",
        birthYear: "1988年",
        education: "",
        experience: "1-3年",
        localObj: f,
        positionType: "",
        requireDetail: ""
    },
    _onLoad: function(t) {
        p = "", u = {
            bizParam: {}
        }, m = t.cateid, this.data.localObj.addressListMaxCount = "1" !== m ? 1 : 3, this.setDataLazy({
            cateid: m,
            price: "1" === m ? "面议" : "不限",
            serviceSeekData: "3" === m || "5" === m ? n[m] : [],
            localObj: this.data.localObj,
            isFindJob: "1" === m
        }), this.urlParams.isOperation && this.setDataLazy({
            isOperation: isOperation
        }), this.getBannerStatus(), "3" !== m && "5" !== m && this.getIntentionLable();
    },
    _onShow: function() {
        e.storage.setSync("pagetype", "");
    },
    getIntentionLable: function() {
        var t = this;
        e.request(e.pathData.serviceSeekDetail.GET_INTENTION_LABLE + "/" + this.data.cateid).then(function(a) {
            if (!a.error) {
                if (!a.data || !a.data.length) return;
                var e = a.data, i = {}, s = 1, r = [], n = "";
                switch (t.data.cateid) {
                  case "37":
                    n = "other";
                    break;

                  case "30":
                    n = "car";
                    break;

                  case "31":
                    n = "decorate";
                    break;

                  case "32":
                    n = "join";
                    break;

                  case "33":
                    n = "jiazheng";
                    break;

                  case "34":
                    n = "banjia";
                    break;

                  case "35":
                    n = "eduction";
                }
                e.forEach(function(t, a) {
                    i[t.type] || (i[t.type] = s++, r[r.length] = []);
                    var e = i[t.type] - 1, o = r[e];
                    o[o.length] = {};
                    var c = o.length - 1;
                    o[c].id = n + "-" + e + "-" + c, o[c].text = t.name, o[c].value = t.name, o[c].type = o.length, 
                    o[c].selected = !1;
                }), t.setDataLazy({
                    serviceSeekData: r
                });
            }
        });
    },
    getBannerStatus: function() {
        var t = this;
        e.request(e.pathData.serviceSeekDetail.GET_BANNER_STATUS).then(function(e) {
            e.error || t.setDataLazy({
                operator: a({}, t.data.operator, {
                    showBanner: e.data.gameOn
                })
            });
        });
    },
    removeAddress: function(t) {
        var a = t.currentTarget.dataset, e = a.key, i = a.dispLocalId;
        this.data.localObj.addressList = this.data.localObj.addressList.filter(function(t, a) {
            return t.key.toString() !== e.toString();
        }), u.bizParam.localList = u.bizParam.localList.filter(function(t, a) {
            return t !== i;
        }), this.setDataLazy({
            localObj: Object.assign({}, this.data.localObj)
        });
    },
    listClick: function(t) {
        h = t.currentTarget.dataset.type, this.setListDataByType(h);
    },
    setListDataByType: function(t) {
        switch (t) {
          case "positionType":
          case "position":
            this.getPositionData();
            break;

          case "price":
            this.setListShowData(i[this.data.cateid], "价格");
            break;

          case "year":
            this.setListShowData(c, "出生年份");
            break;

          case "education":
            this.setListShowData(o, "学历");
            break;

          case "experience":
            this.setListShowData(l, "工作时间");
            break;

          default:
            this.setListShowData([], "区域"), this.getLocalData();
        }
    },
    setListShowData: function(t, a) {
        this.setDataLazy({
            listArray: t,
            listShow: !0,
            wrapShow: !0,
            localTitle: a
        });
    },
    getPositionData: function(t) {
        var a = this, i = "2" === this.data.cateid ? "职位类别" : "职位";
        this.setListShowData([], i), e.request("" + (t ? e.pathData.serviceSeekDetail.GET_POSITION_LIST_PATH_SUB : e.pathData.serviceSeekDetail.GET_POSITION_LIST_PATH), {
            dispCateId: t
        }).then(function(t) {
            if (!t.error) {
                t.data = t.data || [];
                var e = t.data.map(function(t) {
                    return {
                        other: t,
                        id: t.dispCateId,
                        name: t.name
                    };
                });
                if (e.length) return void a.setListShowData(e, i);
                a.setListItemData({
                    position: b
                });
            }
        });
    },
    getLocalData: function() {
        var t = this;
        this.setDataLazy({
            listArray: []
        }), e.request(e.pathData.serviceSeekDetail.GET_LOCAL_LIST_PATH, {
            dispLocalId: this.urlParams.dispCityId || e.globalData.dispCityId
        }).then(function(a) {
            a.error ? e.alert("网络异常,请稍后重试") : (d = a.data, t.setDataLazy({
                listArray: a.data || [],
                listShow: !0,
                wrapShow: !0
            }));
        });
    },
    listBack: function(t) {
        switch (this.data.backType) {
          case 0:
            this.setDataLazy({
                listShow: !1,
                wrapShow: !1
            });
            break;

          case 1:
            this.setDataLazy({
                listArray: d,
                listShow: !0,
                wrapShow: !0,
                backType: 0
            });
        }
    },
    itemClick: e.throttle(300, function(t) {
        var a = t.currentTarget.dataset;
        this.setItemDataByType(a);
    }),
    setItemDataByType: function(t) {
        switch (h) {
          case "price":
            u.price = t.name, this.setListItemData({
                price: t.name
            });
            break;

          case "position":
            u.bizParam.cateList = [].concat(t.id), b = t.name, this.getPositionData(t.id);
            break;

          case "year":
            u.bizParam.birthYear = t.name, this.setListItemData({
                birthYear: t.name
            });
            break;

          case "education":
            u.bizParam.edu = t.name, this.setListItemData({
                education: t.name
            });
            break;

          case "experience":
            u.bizParam.exp = t.name, this.setListItemData({
                experience: t.name
            });
            break;

          case "positionType":
            u.positionType = t.name, this.setListItemData({
                positionType: t.name
            });
            break;

          default:
            this.getLocalSubData(t);
        }
    },
    getLocalSubData: function(t) {
        var a = this;
        this.setDataLazy({
            listArray: []
        });
        var i = t.dispLocalId, s = t.localId, r = t.name;
        e.request(e.pathData.serviceSeekDetail.GET_LOCAL_LIST_PATH, {
            dispLocalId: i
        }).then(function(t) {
            if (!t.error && t.data) p = r, a.setDataLazy({
                listArray: t.data,
                listShow: !0,
                wrapShow: !0,
                backType: 1
            }); else {
                if (a.data.isFindJob) {
                    var n = p ? p + r : r;
                    u.bizParam.localList ? u.bizParam.localList.push(s) : u.bizParam.localList = [ s ], 
                    u.bizParam.localNameList ? u.bizParam.localNameList.push(n) : u.bizParam.localNameList = [ n ];
                } else u.localId = s, u.localName = p ? p + r : r;
                var o = a.data.localObj.addressList;
                if (a.data.isFindJob) {
                    if (a.hasLocalById(o, i)) return void e.toastError("你已选择该区域");
                    o.push({
                        area: p,
                        street: r,
                        key: o.length,
                        dispLocalId: i
                    });
                } else o = [ {
                    area: p,
                    street: r,
                    key: o.length,
                    dispLocalId: i
                } ], a.data.localObj.addressList = o;
                a.setDataLazy({
                    listArray: [],
                    listShow: !1,
                    wrapShow: !1,
                    backType: 0,
                    localObj: a.data.localObj
                }), p = "";
            }
        });
    },
    hasLocalById: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], a = arguments[1];
        return !!(t = t.filter(function(t, e) {
            return t.dispLocalId === a;
        })).length;
    },
    setListItemData: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = Object.assign(t, {
            listArray: [],
            listShow: !1,
            wrapShow: !1
        });
        this.setDataLazy(a);
    },
    getTime: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, a = new Date();
        return a.setDate(a.getDate() + t), "" + a.getFullYear() + a.getMonth() + a.getDate();
    },
    getMilliseconds: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        return new Date().getTime() + 60 * t * 1e3;
    },
    textInput: function(t) {
        u.desc = t.detail.value;
    },
    textarea_blur: function(t) {
        console.log(t.detail.value), this.setDataLazy({
            requireDetail: u.desc
        });
    },
    contactInput: function(t) {
        u.contactUser = t.detail.value;
    },
    telInput: function(t) {
        u.tel = t.detail.value.trim();
    },
    companyNameInput: function(t) {
        u.companyName = t.detail.value;
    },
    positionNameInput: function(t) {
        u.position = t.detail.value;
    },
    checkPhone: function(t) {
        return !(t && !/^1[34578]\d{9}$/.test(t));
    },
    validate: function() {
        if (!u.localName && !this.data.isFindJob) return e.alert("请选择区域"), !1;
        if (this.data.isFindJob) {
            var t = u.bizParam;
            if (!t.cateList || t.cateList && 0 === t.cateList.length) return e.alert("请选择求职意向"), 
            !1;
            if (!t.localList || t.localList && 0 === t.localList.length) return e.alert("请选择求职区域"), 
            !1;
        }
        if ("2" === m) {
            if (!u.positionType) return e.alert("请选择职位类别"), !1;
            if (!(u.position || "").trim() || u.position && u.position.length < 2) return e.alert("职位名称至少两个字"), 
            !1;
            if (!(u.companyName || "").trim() || u.companyName && u.companyName.length < 2) return e.alert("企业名称至少两个字"), 
            !1;
        }
        var a = [];
        return [].concat.apply([], this.data.serviceSeekData).forEach(function(t, e) {
            t.selected && a.push(t.value);
        }), u.labels = a.join(","), this.data.serviceSeekData.length && !a.length ? (e.alert("请选择标签"), 
        !1) : !(u.desc || "").trim() || u.desc && u.desc.length < 2 ? (e.alert("描述至少两个字"), 
        !1) : !(u.contactUser || "").trim() || u.contactUser && u.contactUser.length < 2 ? (e.alert("联系人至少两个字"), 
        !1) : u.tel ? this.checkPhone(u.tel) ? !this.isSubmittedMax() : (e.alert("手机号有误，请重新输入"), 
        !1) : (e.alert("手机号不能为空"), !1);
    },
    isSubmittedMax: function() {
        y = "intention_submit";
        var t = new Date().getTime(), a = e.storage.getSync(y);
        return a && parseInt(this.getTime()) > parseInt(a.time) || !a ? (a && e.storage.removeSync(y), 
        !1) : a[m] && a[m] > 2 ? (e.alert("一天最多提交三次，今日已达上限"), !0) : a.expireTime > t && (e.alert("五分钟内最多提交一次"), 
        !0);
    },
    $e_submit: e.throttle(1e3, function(t) {
        var a = this;
        u.formId = t.detail.formId, e.eventHandle.emit("check-setting", function() {
            e.eventHandle.emit("check-ppu", function(t) {
                a.data.cateid;
                a.validate() && (a.setDataLazy({
                    tel: u.tel
                }), a.verifyAlertToggle(), a.getVerifyCode());
            }, t);
        });
    }),
    serviceDataSubmit: function(i) {
        var s = this;
        u.bizList = [].concat(m), u.cityId = this.urlParams.cityId || e.globalData.cityId, 
        (!u.price && 3 == m || 5 == m || 30 == m || "1" === m) && (u.price = this.data.price), 
        this.data.isFindJob && (u.bizParam.birthYear = this.data.birthYear, u.bizParam.exp = this.data.experience), 
        u.thirdId = e.getThirdKey(), e.requestPost(e.pathData.serviceSeekDetail.FORM_SUBMIT_PATH, u).then(function(i) {
            if (i.error) e.alert("网络异常,请稍后重试"); else {
                var r = e.storage.getSync(y) || {}, n = t({
                    expireTime: s.getMilliseconds(5),
                    time: s.getTime()
                }, m, r[m] ? r[m] + 1 : 1);
                if (e.storage.setSync(y, Object.assign(r, n)), s.data.operator.showBanner && i.data) return void s.setDataLazy({
                    operator: a({}, s.data.operator, {
                        modalType: i.data.winner ? 1 : 0,
                        showModal: !0,
                        money: i.data.change
                    })
                });
                s.urlParams.dispCityId || e.globalData.dispCityId;
                wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: "提交成功,商家收到消息会主动联系您",
                    confirmColor: "#FF552E",
                    success: function(t) {
                        t.confirm && wx.navigateBack();
                    }
                });
            }
        });
    },
    e_closeModal: function() {
        this.setDataLazy({
            operator: a({}, this.data.operator, {
                showModal: !1
            })
        });
        this.urlParams.dispCityId || e.globalData.dispCityId, this.urlParams.cityId || e.globalData.cityId;
        wx.navigateBack();
    }
}, s, r ]);