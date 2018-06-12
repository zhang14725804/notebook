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
        for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
    }
    return t;
}, e = getApp(), s = require("../enums"), i = 1, r = 1, o = 0;

e.createPage({
    methodOptions: {
        e_submit: {
            type: "submit"
        }
    },
    data: {
        pageName: "subscription-add",
        pageType: "form"
    },
    _onShow: function() {
        i = this.urlParams.pLine, r = this.urlParams.code, o = this.urlParams.newEntrance, 
        console.log("newEntrance 111111111111111", o), console.log("subscribeType", r), 
        this.setData(this.getData());
    },
    localList: null,
    getData: function() {
        return {
            selects: [ {
                title: s["salary_" + r + "_name"],
                eunmKey: "salary_" + r,
                data: s.getKeyValuePairs("salary_" + r, function(t) {
                    -1 === t.value.indexOf(s["salaryUnit_" + r]) && t.value !== s.emptyValue && (t.display = t.value + s["salaryUnit_" + r]);
                }),
                default: s.getKeyValueByIndex("salary_" + r, 0)
            }, {
                title: "学历",
                eunmKey: "education",
                data: s.getKeyValuePairs("education"),
                default: s.getKeyValueByIndex("education", 0)
            }, {
                title: "经验",
                eunmKey: "experience",
                data: s.getKeyValuePairs("experience"),
                default: s.getKeyValueByIndex("experience", 0)
            }, {
                title: "订阅时间",
                eunmKey: "subscribePush",
                data: s.getKeyValuePairs("subscribePush"),
                default: s.getKeyValueByIndex("subscribePush", 1)
            } ],
            listData: [],
            formData: {
                addressList: [],
                addressListMaxCount: "1" === r.toString() ? 3 : 1,
                job_disabled: "1" !== r.toString(),
                education_disabled: "1" !== r.toString(),
                experience_disabled: "1" !== r.toString()
            }
        };
    },
    removeAddress: function(t) {
        var a = t.currentTarget.dataset.key, e = void 0;
        this.data.formData.addressList.forEach(function(t, s) {
            t.key.toString() === a.toString() && (e = s);
        }), this.data.formData.addressList.splice(e, 1), this.setDataLazy({
            formData: Object.assign({}, this.data.formData)
        });
    },
    initData: function() {
        var a = this;
        this.data.selects.forEach(function(t) {
            a.data.formData["" + t.eunmKey] = t.default.key, a.data.formData[t.eunmKey + "_value"] = t.default.value;
        }), this.showCityList({}, function(e) {
            var s;
            a.setDataLazy({
                formData: Object.assign({}, a.data.formData, {
                    city: e.city.localId,
                    city_value: e.city.name,
                    addressList: [ (s = {
                        area: e.area.name,
                        street: e.business.name,
                        key: "3"
                    }, t(s, "key", e.area.dispLocalId + "-" + e.business.dispLocalId), t(s, "other", e.business), 
                    s) ]
                })
            });
        });
    },
    showCityList: function(t, a) {
        var s = this, i = function() {
            s.setDataLazy(Object.assign(t, {
                listData: s.cityList
            }));
        };
        this.cityList ? i() : e.request(e.pathData.ACTIVITY_DOMAIN + "/wxa/wxsub/locallist", {
            thirdKey: e.getThirdKey()
        }).then(function(t) {
            if (t.error) e.alert("网络异常,请稍后重试"); else {
                var r = t.data.cityList || [];
                s.cityList = r.map(function(t) {
                    return {
                        other: t,
                        key: t.dispLocalId,
                        value: t.name
                    };
                }), a ? a(t.data) : i();
            }
        });
    },
    showAreaList: function(t, a, s) {
        var i = this;
        e.request(e.pathData.ACTIVITY_DOMAIN + "/wxa/wxsub/bizlist", {
            dispLocalId: t || this.data.formData.city
        }).then(function(t) {
            if (!t.error && t.data) {
                var e = t.data.map(function(t) {
                    return {
                        other: t,
                        key: t.dispLocalId,
                        value: t.name
                    };
                });
                i.localList || (i.localList = e), i.setDataLazy([ {
                    listData: e
                }, a ]);
            } else s && s();
        });
    },
    showJob: function(t, a) {
        var s = this;
        this.setDataLazy({
            listData: []
        }), e.request(e.pathData.ACTIVITY_DOMAIN + (a ? "/wxa/wxsub/catelist" : "/wxa/wxsub/zplist"), {
            dispCateId: a
        }).then(function(a) {
            if (a.error) errorCb(); else {
                a.data = a.data || [];
                var e = a.data.map(function(t) {
                    return {
                        other: t,
                        key: t.dispCateId,
                        value: t.name
                    };
                });
                s._jobList || (s._jobList = e), s.setDataLazy([ {
                    listData: e
                }, t ]);
            }
        });
    },
    listClick: e.throttle(1e3, function(t) {
        var a = this, e = t.currentTarget.dataset, s = e.type, i = {
            listShow: !0,
            wrapShow: !0,
            listTitle: e.listTitle,
            listName: s
        };
        switch (s) {
          case "city":
            this.showCityList(i);
            break;

          case "area":
            this.showAreaList(this.data.formData.city, i);
            break;

          case "job":
            this.showJob(i);
            break;

          default:
            this.data.selects.forEach(function(t) {
                t.eunmKey.toString() === s.toString() && a.setDataLazy(Object.assign(i, {
                    listData: t.data
                }));
            });
        }
    }),
    listBack: function(t) {
        this.setDataLazy({
            listData: this._preList,
            listShow: !!this._preList,
            wrapShow: !!this._preList
        }), this._listBack && this._listBack(), this._preList && (this._preList = null, 
        this._preSelectData = null);
    },
    _preList: null,
    _preSelectData: null,
    itemClick: e.throttle(300, function(t) {
        var a = this, s = {
            listShow: !1,
            wrapShow: !1
        }, i = t.currentTarget.dataset, r = i.key, o = i.name, n = i.value, l = i.other;
        this.data.formData[o] = r, this.data.formData[o + "_value"] = n, this.data.formData[o + "_display"] = l.display, 
        this.data.formData[o + "_other"] = l;
        var u = function() {
            a.data.formData.addressList && a.data.formData.addressList.map(function(t) {
                return t.other.localId.toString();
            }).indexOf(l.localId.toString()) >= 0 ? e.toastError("你已选择该区域") : (Object.assign(a.data.formData, {
                addressList: a.data.formData.addressList.concat({
                    area: a._preSelectData.value,
                    areaId: a._preSelectData.key,
                    street: n.toString() === a._preSelectData.value.toString() ? "" : n,
                    streetId: r.toString() === a._preSelectData.key.toString() ? "" : r,
                    key: a._preSelectData.key + "-" + r,
                    other: l
                })
            }), a._preList = null, a._preSelectData = null, a.setDataLazy(Object.assign(s, {
                formData: Object.assign({}, a.data.formData)
            })));
        }, d = function() {
            a._preList = a.data.listData, a._preSelectData = {
                key: r,
                name: o,
                value: n,
                other: l
            };
        };
        switch (o) {
          case "city":
            if ("-1" === r.toString()) return;
            this.data.formData.city_id !== r && (this.data.formData.addressList = []);
            break;

          case "area":
            return void (this._preList ? u() : (d(), this.showAreaList(r, null, u)));

          case "job":
            if (!this._preList) return d(), this.showJob({}, r);
            this.data.formData.job = {
                data: [ this._preSelectData.other, l ]
            };
        }
        this._preList = null, this._preSelectData = null, this.setDataLazy(Object.assign(s, {
            formData: Object.assign({}, this.data.formData)
        }));
    }),
    $e_submit: e.throttle(2e3, function(t) {
        var i = this, o = s["salaryUnit_" + r], n = s["salary_" + r][this.data.formData["salary_" + r]];
        this.data.formData.job_other = this.data.formData.job_other || {};
        var l = n.indexOf(o) === n.length - o.length, u = {
            type: s.subscribeType[r],
            typeNum: r,
            post: this.data.formData.job_other.name,
            areas: this.data.formData.addressList.map(function(t) {
                return t.area + (t.street ? "/" + t.street : "");
            }),
            priceNum: l ? n.replace(o, "") : n
        };
        u.unit = l ? o : "", u = JSON.stringify(u);
        var d = this.data.formData.addressList.map(function(t) {
            return t.other.localId;
        }), c = {
            formId: t.detail.formId,
            thirdId: e.getThirdKey(),
            subscribeType: r,
            pushType: this.data.formData.subscribePush,
            localIds: "1" === r.toString() ? d : d.length && d[0] + "",
            params: u,
            bizParams: a({}, "1" === r.toString() ? {
                position: this.data.formData.job_other && this.data.formData.job_other.cateId,
                salary: this.data.formData["salary_" + r],
                edu: this.data.formData.education,
                exp: this.data.formData.experience
            } : {
                price: parseInt(this.data.formData["salary_" + r])
            })
        }, h = void 0;
        c.bizParams.position || this.data.formData.job_disabled ? c.localIds && 0 !== c.localIds.length || (h = "区域") : h = "职位", 
        h ? e.toastError("请选择" + h) : e.requestPost(e.pathData.ACTIVITY_DOMAIN + "/wxa/wxsub/add", c).then(function(t) {
            if (t.error) e.alert("网络异常,请稍后重试"); else {
                var a = t.data;
                e.toast("添加成功", {
                    close: function() {
                        e.eventHandle.emit("subscription-change", {
                            pLine: i.urlParams.pLine
                        });
                        var t = e.pathData.youxuan.SUB_LIST_PATH + "/" + a + "/1";
                        e.request(t).then(function(t) {
                            t.error ? i.gotoSub() : t.data.list && t.data.list.length ? i.gotoYX(a) : i.gotoSub();
                        });
                    }
                });
            }
        });
    }),
    gotoSub: function() {
        wx.redirectTo({
            url: "/pages/subscription/subscription"
        });
    },
    gotoYX: function(t) {
        var a = "1" === o && "1" === r ? "1" : "0";
        wx.redirectTo({
            url: "/pages/youxuan/youxuan?youxuan=" + s.subscribeTypeToYouXuanType[r] + "&type=" + r + "&subId=" + t + "&newEntrance=" + a + "&sort=1"
        });
    }
});