function e(e, i, t) {
    var d = s(e, i, t);
    O.get(R ? Ye.globalPay_view : Ye.orderinfo, d, ii);
}

function i(e, i, t, d) {
    var n = s(e, i, t, d);
    O.get(R ? Ye.globalPay_venderinfo : Ye.venderinfo, n, ii);
}

function s(e, i, s, t) {
    var d = {};
    return d.action = z || P ? 1 : 0, d.cmdyop = 0, d.type = N, d.useaddr = i, d.paytype = e, 
    d.reg = 1, d.clearbeancard = s, G && (d.action = 3, d.bizval = M, d.bizkey = A, 
    d.activeid = q), R && (d.action = 1 == E ? 5 : 6), R && G && (d.action = 17), J = d.action, 
    P ? d.commlist = P : z && (d.commlist = z + ",," + w + "," + z + ",1,0,0"), d.commlist && _ && (d.ybcommlist = _), 
    d.commlist && C && (d.commlist = d.commlist + "," + C), 1 == s && (d.firstin = 1), 
    t && (d.skuidlist = t), d.t = Date.parse(new Date()), void 0 != L && 0 != L ? (d.addressid = L, 
    d.addrType = "1") : (d.addressid = "", d.addrType = ""), d.r = Math.random(), d;
}

function t(e) {
    var i = void 0, s = void 0, t = void 0, d = void 0, n = e.vender, p = e.from, a = e.ship, o = e.shipData, r = void 0, c = void 0, l = void 0, h = void 0, m = void 0, S = !1, y = !1, g = !1, b = void 0, I = void 0, k = void 0, O = {}, D = void 0, T = void 0, z = void 0, P = {}, w = void 0, _ = void 0, C = !0;
    for (i = 0, d = n.products.length; i < d; i++) "1" != n.products[i].mainSku.isLA ? r = !0 : c = !0, 
    [ "1", "2" ].indexOf(n.products[i].mainSku.locType) > -1 && (n.isloc = !0);
    n.shipjd = !1, n.ship311 = !1, n.shipjzd = !1, n.ship411 = !1, n.isla = !1, n.shipla = !1, 
    n.shipla2 = !1, n.shiplajzd = !1, n.shipType = "", n.selectedShip = "", n.selectedlaShip = "", 
    n.shipData = {}, n.shipIns = {}, n.ship311Obj = {}, n.shipjzdObj = {}, n.shipzitiObj = {}, 
    n.shipla2calendar = {}, n.shiplaObj = {}, n.shipla2Obj = {}, n.shiplajzdObj = {}, 
    n.shipSopjdObj = !1, n.shipSopObj = !1;
    var L = "", F = void 0, N = "";
    if (a || (a = V.order.payment || []), !o) for (i = 0, d = a.length; i < d; i++) "4" == a[i].id && (o = a[i]);
    for (0 == n.shipment.length && ("1" == n.jdShipment ? N = "京东快递" : "0" == n.jdShipment && (N = "快递运输")), 
    i = 0, s = n.shipment.length; i < s; i++) if ("0" == (l = n.shipment[i]).type && "1" == n.jdShipment) {
        if (n.shipData.shipjd = l, n.shipjd = l, n.shipjd.isSup = !0, n.shipjd.shipId = l.id, 
        n.shipjd.shipType = l.type, n.shipjdObj = l, "1" == l.selected && (N = "京东快递", n.shipType = l.type, 
        _ = l.id, r && c ? (h = "工作日、双休日与节假日均可送货", m = "工作日、双休日与节假日均可送货", S = !1) : r ? h = "工作日、双休日与节假日均可送货" : (m = "工作日、双休日与节假日均可送货", 
        S = !1), n.selectedShip = "shipjd"), p || "4" != l.shipTimeType || (n.ship311 = !0, 
        "1" == l.selected && (n.ship311Obj = {
            date: l.promiseDate,
            time: l.promiseTimeRange,
            week: l.promiseWeekDay || 1,
            sendpay: l.promiseSendPay
        }, h = "送货时间：" + f(l.promiseDate) + " " + Ze[l.promiseWeekDay] + " " + l.promiseTimeRange, 
        n.selectedShip = "ship311", be.selShip = "ship311", be.selShipObj = n.ship311Obj)), 
        p || "6" != l.shipTimeType || (n.shipjzd = !0, "1" == l.selected && (n.shipjzdObj = {
            date: l.promiseDate,
            time: l.promiseTimeRange,
            week: l.promiseWeekDay || 1,
            sendpay: l.promiseSendPay
        }, h = "【京准达】送货时间：" + f(l.promiseDate) + " " + Ze[l.promiseWeekDay] + " " + l.promiseTimeRange, 
        n.selectedShip = "shipjzd", be.selShip = "shipjzd", be.selShipObj = n.shipjzdObj)), 
        p || "5" != l.shipTimeType || (n.ship411 = !0, "1" == l.selected && (n.ship411Obj = {
            sendpay: l.promiseSendPay
        }, n.selectedShip = "ship411", h = "【极速达】下单成功后2小时送达", be.selShip = "ship411", be.selShipObj = n.ship411Obj, 
        y = !0)), (D = l.laCalendar) && c && (n.isla = !0), !p && D && D.delvDates && c) {
            if (n.isla = !0, n.supShipInstall = D.supShipInstall, "1" == n.supShipInstall && D.instlDateMap) for (var q in D.instlDateMap) if (q == D.instlDateMap[q][0]) {
                n.supDfShipInstall = q;
                break;
            }
            if (Xe = "1" == n.supShipInstall && D.defaultDOffset == D.iOffset, "4" == D.promiseType) if ("1" == D.type) {
                if (n.shipla2 = {
                    isSup: !0,
                    shipId: l.id,
                    shipType: l.type
                }, n.selectedlaShip = "shipla2", D.promiseDate && D.promiseTimeRange) for (t = 0, 
                d = D.calendar.length; t < d; t++) if ((z = D.calendar[t]).date == D.promiseDate && z.time == D.promiseTimeRange) {
                    O = z;
                    break;
                }
                O || (O = D.calendar.calendar[0]), n.shipla2Obj = O, m = "送货时间：" + f(O.date) + " " + Ze[O.week] + " " + O.time, 
                S = v(O.date), be.selLaShip = "shipla2", be.selLaShipObj = O;
            } else n.shipla = {
                isSup: !0,
                shipId: l.id,
                shipType: l.type
            }, n.shiplaObj = D, n.selectedlaShip = "shipla", "1" == D.supDelive && D.defaultDDate && (D.defaultDDate = D.defaultDDate.substr(0, 10), 
            m = "送货时间：" + f(D.defaultDDate), S = v(D.defaultDDate)), be.selLaShip = "shipla", 
            be.selLaShipObj = D; else "5" == D.promiseType && (n.shiplajzd = {
                isSup: !0,
                shipId: l.id,
                shipType: l.type
            }, n.selectedlaShip = "shiplajzd", n.shiplajzdObj = {
                date: l.promiseDate,
                time: l.promiseTimeRange,
                week: l.promiseWeekDay || 1,
                sendpay: l.promiseSendPay
            }, m = "【京准达】送货时间：" + f(D.promiseDate) + " " + Ze[D.promiseWeekDay] + " " + D.promiseTimeRange, 
            S = v(D.promiseDate), n.selectedlaShip = "shiplajzd", be.selLaShip = "shiplajzd", 
            be.selLaShipObj = n.shiplajzdObj);
            n.shipIns = {
                iOffset: D.iOffset
            }, "1" == D.supInstall && D.instlDateMap[D.defaultDOffset] && ((T = new Date(D.defaultDDate.replace(/-/g, "/"))).setDate(T.getDate() + (D.iOffset - D.defaultDOffset)), 
            b = "安装时间：" + (T.getMonth() + 1) + "月" + T.getDate() + "日"), n._selectedShip = "shipla";
        }
        if (r && o && o.jd311shipment && "1" == o.jd311shipment.isSupport) {
            if (n.ship311 = !0, n.jd311shipment = o.jd311shipment, o.jd311shipment.selectDate && o.jd311shipment.selectTime) for (t = 0, 
            d = o.jd311shipment.calendar.length; t < d; t++) (z = o.jd311shipment.calendar[t]).date == o.jd311shipment.selectDate && z.time == o.jd311shipment.selectTime && (O = z);
            O || (O = o.jd311shipment.calendar[0]), "1" == o.jd311shipment.selected ? (n.shipType = l.type, 
            _ = l.id, n.ship311Obj = O, h = "送货时间：" + f(O.date) + " " + Ze[O.week] + " " + O.time, 
            n.selectedShip = "ship311", be.selShip = "ship311", be.selShipObj = O) : n.ship311Obj = O;
        }
        if (r && o && o.zxjjzdshipment && "1" == o.zxjjzdshipment.isSupport) {
            if (n.shipjzd = !0, n.zxjjzdshipment = o.zxjjzdshipment, o.zxjjzdshipment.selectDate && o.zxjjzdshipment.selectTime) for (t = 0, 
            d = o.zxjjzdshipment.calendar.length; t < d; t++) (z = o.zxjjzdshipment.calendar[t]).date == o.zxjjzdshipment.selectDate && z.time == o.zxjjzdshipment.selectTime && (O = z);
            O || (O = o.zxjjzdshipment.calendar[0]), "1" == o.zxjjzdshipment.selected ? (n.shipType = l.type, 
            _ = l.id, n.shipjzdObj = O, h = "【京准达】送货时间：" + f(o.zxjjzdshipment.selectDate) + " " + Ze[o.zxjjzdshipment.week] + " " + o.zxjjzdshipment.selectTime, 
            n.selectedShip = "shipjzd", be.selShip = "shipjzd", be.selShipObj = O) : n.shipjzdObj = O;
        }
        if (r && o && o.jd411shipment && "1" == o.jd411shipment.isSupport && (n.ship411 = !0, 
        n.jd411shipment = o.jd411shipment, "1" == o.jd411shipment.selected && "0" == o.jd411shipment.isGray ? (n.ship411Obj = o.jd411shipment, 
        n.shipType = l.type, _ = l.id, n.selectedShip = "ship411", h = "【极速达】下单成功后2小时送达", 
        "1" == o.jd411shipment.dataFlag && o.jd411shipment.promiseTime && (h = "【极速达】" + o.jd411shipment.promiseTime.replace(/\d{4}-(\d+)-(\d+) (\d+:\d+):\d+/, "$1月$2日$3") + "前送达"), 
        be.selShip = "ship411", be.selShipObj = o.jd411shipment, y = !0) : n.ship411Obj = o.jd411shipment), 
        o && o.djdbzdshipment && o.djdbzdshipment.delvDates && c) {
            if (n.isla = !0, o.djdbzdshipment.calendar.length > 0) {
                if (n.shipla2 = {
                    isSup: !0,
                    shipId: l.id,
                    shipType: l.type
                }, n.djdbzdshipment = o.djdbzdshipment, o.djdbzdshipment.promiseDate && o.djdbzdshipment.promiseTimeRange) for (t = 0, 
                d = o.djdbzdshipment.calendar.length; t < d; t++) (z = o.djdbzdshipment.calendar[t]).date == o.djdbzdshipment.promiseDate && z.time == o.djdbzdshipment.promiseTimeRange && (O = z);
                "1" == o.djdbzdshipment.selected && (n.selectedlaShip = "shipla2", n.shipla2Obj = O, 
                n.shipIns.iOffset = o.djdbzdshipment.iOffset, m = "送货时间：" + f(O.date) + " " + Ze[O.week] + " " + O.time, 
                S = v(O.date), n.shipIns = {
                    iOffset: o.djdbzdshipment.iOffset
                }, be.selLaShip = "shipla2", be.selLaShipObj = O);
            } else n.shipla = {
                isSup: !0,
                shipId: l.id,
                shipType: l.type
            }, n.djdbzdshipment = o.djdbzdshipment, n.shiplaObj = o.djdbzdshipment, "1" == o.djdbzdshipment.selected && "1" == o.djdbzdshipment.supDelive && o.djdbzdshipment.defaultDDate && (o.djdbzdshipment.defaultDDate = o.djdbzdshipment.defaultDDate.substr(0, 10), 
            n.shipIns = {
                iOffset: o.djdbzdshipment.iOffset
            }, n.selectedlaShip = "shipla", m = "送货时间：" + f(o.djdbzdshipment.defaultDDate), 
            S = v(o.djdbzdshipment.defaultDDate), be.selLaShip = "shipla", be.selLaShipObj = o.djdbzdshipment, 
            be.selShipIn = n.shipIns);
            if (n.supShipInstall = o.djdbzdshipment.supShipInstall, o && "1" == o.djdbzdshipment.selected ? (Xe = "shipla" == n.selectedlaShip && n.shiplaObj.defaultDOffset == n.shipIns.iOffset || "shipla2" == n.selectedlaShip && n.shipla2Obj.reservingDate == n.shipIns.iOffset, 
            n.shipType = l.type, _ = l.id, "1" == o.djdbzdshipment.supInstall && o.djdbzdshipment.instlDateMap[o.djdbzdshipment.defaultDOffset] && ((T = new Date(o.djdbzdshipment.defaultDDate.replace(/-/g, "/"))).setDate(T.getDate() + (o.djdbzdshipment.iOffset - o.djdbzdshipment.defaultDOffset)), 
            b = "安装时间：" + (T.getMonth() + 1) + "月" + T.getDate() + "日"), n._selectedShip = "shipla") : Xe = !1, 
            o && o.djdjzdshipment && o.djdjzdshipment.delvDates && c) {
                if (n.isla = !0, n.shiplajzd = {
                    isSup: !0,
                    shipId: l.id,
                    shipType: l.type
                }, n.djdjzdshipment = o.djdjzdshipment, o.djdjzdshipment.promiseDate && o.djdjzdshipment.promiseTimeRange) for (t = 0, 
                d = o.djdjzdshipment.calendar.length; t < d; t++) (z = o.djdjzdshipment.calendar[t]).date == o.djdjzdshipment.promiseDate && z.time == o.djdjzdshipment.promiseTimeRange && (O = z);
                if ("1" == o.djdjzdshipment.selected) {
                    n.shipType = l.type, _ = l.id, m = "【京准达】送货时间：" + f(O.date) + " " + Ze[O.week] + " " + O.time, 
                    S = v(O.date), n.selectedlaShip = "shiplajzd", n.shiplajzdObj = O, n.shipIns = {
                        iOffset: o.djdjzdshipment.iOffset
                    }, be.selLaShip = "shiplajzd", be.selLaShipObj = O, be.selShipIn = n.shipIns, "1" == o.djdbzdshipment.supInstall && o.djdbzdshipment.instlDateMap[o.djdbzdshipment.defaultDOffset] && ((T = new Date(o.djdbzdshipment.defaultDDate.replace(/-/g, "/"))).setDate(T.getDate() + (o.djdbzdshipment.iOffset - o.djdbzdshipment.defaultDOffset)), 
                    b = "安装时间：" + (T.getMonth() + 1) + "月" + T.getDate() + "日"), n._selectedShip = "shipla";
                }
            }
        }
        "1" == n.isSupShipSvc && n.selShipSvc && (I = n.selShipSvc, k = "", N += "和安装");
    } else if ("5" == l.type) n.shipData.shipSopjd = l, n.shipSopjd = l, n.shipSopjd.shipId = l.id, 
    n.shipSopjd.shipType = l.type, "1" == l.selected && (N = "京东快递", n.shipType = l.type, 
    _ = l.id, n.selectedShip = "shipSopjd"); else if ("1" != l.type && "2" != l.type || "0" != n.jdShipment) if ("3" == l.type || "6" == l.type) {
        o.pickshipment && "3" == l.type ? l = o.pickshipment : o.vendershiptime && o.vendershiptime[n.venderId] && "6" == l.type && (l = o.vendershiptime[n.venderId].pickshipment);
        for (var A = 0, M = l.notSupSkuids.length; A < M; A++) n.skuIds.indexOf(l.notSupSkuids[A] + "") >= 0 && (C = !1);
        if (!C) continue;
        if (n.shipziti = {
            isSup: !0,
            shipId: l.id,
            shipType: l.type
        }, n.shipData.shipziti = l, n.pickshipment = l, "1" == l.selected) {
            N = "上门自提", n.shipType = l.type, _ = l.id, n.selectedShip = "shipziti";
            for (var x = null, G = 0, R = l.pickList.length; G < R; G++) "1" == (F = l.pickList[G]).selected && (L = F), 
            x || "1" != F.available || (x = F);
            if (L ? l.picked = L : (l.pickList[0].selected = "1", l.picked = l.pickList[0]), 
            "0" == l.picked.available && (l.picked = x), h = l.picked.pickName, "3" != l.shipmentTimeType && l.shipmentTimeType) {
                var E = new Date(l.date.substr(0, 10)).getDay(), B = E == new Date().getDay() ? "今天" : ei[E], H = l.date.substr(0, 10).split("-");
                h += " " + H[1] + "月" + H[2] + "日(" + B + ")";
            }
            "46" != l.picked.siteType && "48" != l.picked.siteType || (je = !1), n.shipzitiObj = {
                addr: l.picked,
                date: l.date,
                shipmentTimeType: l.shipmentTimeType,
                item: l
            };
        } else {
            var J = l.pickList[0];
            l.pickList.forEach(function(e) {
                "1" == e.selected && "1" == e.available && (J = e);
            }), n.shipzitiObj = {
                addr: J,
                date: l.dateList[0] ? l.dateList[0].date : "",
                shipmentTimeType: l.shipmentTimeType,
                item: l
            };
        }
    } else "8" == l.type ? ([ "1", "3" ].indexOf(l.supportGSDInfo) > -1 && (n.shipGsd = l, 
    n.shipGsd.shipId = l.id, n.shipGsd.shipType = l.type), "2" == l.supportGSDInfo && (n.gsdPart = !0), 
    n.shipData.shipGsd = l, p ? o && o.gsdshipment && "1" == o.gsdshipment.isSupport && (n.gsdshipment = o.gsdshipment, 
    n.shipGsdObj = o.gsdshipment, "1" == o.gsdshipment.selected && (n.shipType = l.type, 
    _ = l.id, N = "同城速配", h = "0" == o.gsdshipment.isWorkIn ? o.gsdshipment.promiseTime ? "超出同城速配运营时间<br>下单后预计" + j(o.gsdshipment.promiseTime) + "前送达" : "工作日、双休日与节假日均可送货" : o.gsdshipment.timeRange ? "下单后预计" + o.gsdshipment.timeRange + "小时内送达" : "工作日、双休日与节假日均可送货", 
    n.selectedShip = "shipGsd", be.selShip = "shipGsd", be.selShipObj = o.gsdshipment)) : (n.shipGsdObj = {}, 
    "1" == l.selected && (N = "同城速配", n.shipType = l.type, _ = l.id, n.selectedShip = "shipGsd", 
    h = "下单后将尽快送达"))) : "4" == l.type && "1" == l.selected && "0" == n.jdShipment && (n.shipType = l.type, 
    _ = l.id); else "1" == l.type ? (n.ship3 = l, n.ship3.shipId = l.id, n.ship3.shipType = l.type, 
    n.shipData.ship3 = l) : "2" == l.type && (n.shipSop = l, n.shipSop.shipId = l.id, 
    n.shipSop.shipType = l.type, n.shipData.sopShip3 = l), "1" == l.selected && (N = "快递运输", 
    n.shipType = l.type, _ = l.id, n.selectedShip = "1" == l.type ? "ship3" : "shipSop"), 
    "1" == n.isSupShipSvc && n.svcAndShip && (h = "工作日、双休日与节假日均可送货"), "1" == n.isSupShipSvc && n.selShipSvc ? (n.venderShipSvcFee, 
    I = n.selShipSvc, k = "0" == n.venderId ? "" : "shipSvc") : n.svcAndShip || (h = "工作日、双休日与节假日均可送货");
    var U = [ "今天", "周一", "周二", "周三", "周四", "周五", "周六", "周日" ];
    if (o && o.vendershiptimeMap && o.vendershiptimeMap[n.venderId] && ("1" != n.isSupShipSvc || !n.selShipSvc)) {
        var W = o.vendershiptimeMap[n.venderId], $ = W.shipType;
        if ("2" == $ || "5" == $) if (W.calendar) {
            for (var Q = void 0, K = 0, X = W.calendar.length; K < X; K++) {
                var Y = W.calendar[K];
                Y.date == W.promiseDate && Y.time == W.promiseTimeRange && (Q = Y);
            }
            "2" == $ ? (n.sopCalendar = W.calendar, n.shipSopObj = Q) : "5" == $ && (n.sopjdCalendar = W.calendar, 
            n.shipSopjdObj = Q), n.sopDefault = {
                sendHtml: Q ? "送货时间：" + [ f(Q.date), U[Q.week], Q.time ].join(" ") : "工作日、双休日与节假日均可送货"
            };
        } else n.sopDefault = {
            sendHtml: W.promiseMsg || "工作日、双休日与节假日均可送货"
        }; else "1" == $ && (n.sopDefault = {
            sendHtml: W.promiseMsg || "工作日、双休日与节假日均可送货"
        });
        "1" != W.selPick && (h = n.sopDefault.sendHtml);
    }
    n.shipHonor = o && o.venderhonorfreightInsureMap ? o.venderhonorfreightInsureMap["0" == n.venderType || "1" == n.venderType ? 0 : n.venderId] : null, 
    n.shipHonor ? "1" == n.shipHonor.canCheckFlag ? "1" == n.shipHonor.checkedFlag ? (N = "京尊达", 
    g = !0, n.honortag = 1) : n.honortag = 2 : n.honortag = 0 : n.shipHonor = {}, N || (N = "快递运输"), 
    N && (P.titlehtml = N), h && (-1 == h.indexOf("<br>") ? (P.zxjdesc = h, P.zxjdesc_isArray = !1) : (P.zxjdesc = h.split("<br>"), 
    P.zxjdesc_isArray = !0)), P.jsdHideHDFK = y, P.isHonorChecked = g, m && (P.djddesc = m, 
    P.djdIsHideHDFK = S), b && (P.djdIndesc = b), I && (P.svchtml = I, P.shipClickTag = k), 
    n.selectShipId = _, n.shipHtml = P, w = "0" == n.shipType || "3" == n.shipType ? "0" : n.venderId, 
    (n.ship311 || n.ship411 || n.shipjzd || n.shipla2 || n.shipla || n.shiplajzd || n.shipziti) && (Se = !0), 
    be.setPayShipData[w] = u({
        vender: n,
        shipType: n.shipType,
        selectShipId: _
    });
}

function d() {
    var e = {};
    return e.action = J, e.reg = 1, W ? (e.reset = 1, W = !1) : e.reset = 0, e.t = Date.parse(new Date()), 
    new T(function(i, s) {
        O.get(R ? Ye.globalPay_getShipeffect : Ye.shipeffect, e, {
            success: function(e) {
                var s = void 0, d = void 0, n = void 0;
                if (0 == e.errId) {
                    for (n = e.order.orderprice.venderFreight, s = 0; s < n.length; s++) for (d = 0; d < $.length; d++) if (n[s].venderId == $[d].venderId || ("0" == $[d].venderType || "1" == $[d].venderType) && "0" == n[s].venderId) {
                        $[d].freight = n[s].freight, $[d].overLimitFee = n[s].overLimitFee || 0;
                        break;
                    }
                    var p = void 0;
                    if (e.vendershiptime && e.vendershiptime.length > 0) for (p = {}, s = 0; s < e.vendershiptime.length; s++) {
                        var a = e.vendershiptime[s];
                        p[a.venderId] = a;
                    }
                    e.vendershiptimeMap = p || null;
                    var o = void 0;
                    if (e.venderhonorfreightInsure && e.venderhonorfreightInsure.length > 0) for (o = {}, 
                    s = 0; s < e.venderhonorfreightInsure.length; s++) {
                        var r = e.venderhonorfreightInsure[s];
                        o[r.venderId] = r;
                    }
                    e.venderhonorfreightInsureMap = o || null;
                    var c = null;
                    if (e.freightInsure) for (s = 0; s < e.freightInsure.length; s++) {
                        var l = e.freightInsure[s];
                        if ("1" == l.showFlag && "0" == l.venderId) {
                            c = l;
                            break;
                        }
                    }
                    for (s = 0; s < $.length; s++) "0" == $[s].venderId && ($[s].thwyInfo = c), t({
                        from: "shipeffect",
                        shipData: e,
                        vender: $[s]
                    });
                    Te = !(!e.order.orderprice || !(e.order.orderprice.giftDiscount > 0 || e.order.orderprice.consignCardDiscount > 0));
                }
                i(e);
            },
            fail: function(e) {
                i(e);
            }
        });
    });
}

function n() {
    var e = {}, i = [ "", "normal", "vat", "electronic" ], s = void 0, t = void 0;
    return e = {
        reg: 1,
        action: J,
        r: Math.random()
    }, be.fpObj || be.vatFpObj || be.lineFpObj ? ("1" == be.selInvoiceType && be.fpObj ? t = be.fpObj : "2" == be.selInvoiceType && be.vatFpObj ? t = be.vatFpObj : "3" == be.selInvoiceType && be.lineFpObj && (t = be.lineFpObj), 
    t && (e.selectedType = t.type, e.hasBookSku = t.hasBookSku || "0", e.hasCommonSku = t.hasCommonSku || "0", 
    e.selectedTitle = t.title || "", e.selectContent = t.content || "", e.selectBookContent = t.bookcontent || "")) : V.order.invoice && (e.selectedType = V.order.invoice.selectedType, 
    e.hasBookSku = V.order.invoice.hasBookSku, e.hasCommonSku = V.order.invoice.hasCommonSku, 
    V.order.invoice[i[e.selectedType]] && (s = V.order.invoice[i[e.selectedType]], e.selectedTitle = s.selectedTitle || "", 
    e.selectContent = s.selectContent, e.selectBookContent = s.selectBookContent, e.company = s.companyName || "", 
    "3" == e.selectedType && (e.company = s.electrocompanyName || ""))), e.vid = K.join(","), 
    e.lsids = ne.join(","), e.scene = 1, new T(function(i, s) {
        O.get(R ? Ye.globalPay_assitInfo : Ye.assitinfo, e, {
            success: function(e) {
                !function() {
                    var i = void 0, s = void 0;
                    for (i = 0; i < $.length; i++) if ("0" != $[i].venderId) for (s = 0; s < e.venInfos.length; s++) $[i].venderId == e.venInfos[s].vid && ($[i].venderName = e.venInfos[s].shopname); else $[i].venderName = "京东自营";
                    if (e.locShops) for (var t = 0, d = e.locShops.length; t < d; t++) {
                        var n = e.locShops[t];
                        pe[n.id] = n.name, "1" != n.status && (pe.isLocDisable = !0);
                    }
                }(), function(e) {
                    var i = "", s = {}, t = "", d = "", n = "", p = "", a = V.order.invoice || {};
                    switch (be.selInvoiceType = e.selectedType, a.selectedType = e.selectedType, s.type = e.selectedType, 
                    s.content = e.selectContent, s.bookcontent = e.selectBookContent, s.hasBookSku = e.hasBookSku, 
                    s.hasCommonSku = e.hasCommonSku, e.selectedType) {
                      case "1":
                        a.normal = a.normal ? a.normal : {}, a.selectedTypeName = "普通发票", p = "normal", 
                        s.type = "1", s.title = e.selectedTitle, "4" == e.selectedTitle ? (i += "个人（普通发票）", 
                        a.normal.selectedTitleName = "个人") : "5" == e.selectedTitle && (be.fpObj ? t = be.fpObj.company : a && a.normal && (t = a.normal.companyName), 
                        i += t + "（普通发票）", a.normal.selectedTitleName = "公司", a.normal.selectedCompanyName = t, 
                        s.company = t), e.selectContent && (i += e.selectContentName, s.content = e.selectContent), 
                        be.fpObj = s;
                        break;

                      case "2":
                        p = "vat", a.selectedTypeName = "增值税专用发票", a.vat = a.vat ? a.vat : {}, be.vatFpObj ? d = be.vatFpObj.company : a && a.vat && (d = a.vat.companyName), 
                        s.company = d, i += d + "（增值税专用发票）", i += e.selectContent > 0 ? e.selectContentName : e.selectBookContent > 0 ? e.selectBookContentName : "", 
                        be.vatFpObj = s;
                        break;

                      case "3":
                        a.selectedTypeName = "电子普通发票", p = "electronic", a.electronic = a.electronic ? a.electronic : {}, 
                        s.type = 3, s.title = e.selectedTitle, 5 == e.selectedTitle ? (be.lineFpObj ? n = be.lineFpObj.company : a && a.electronic && (n = a.electronic.electrocompanyName), 
                        a.electronic.selectedTitleName = "公司", a.electronic.selectedCompanyName = n, i += n + "（电子普通发票）", 
                        s.company = n, a.electronic.electrocompanyName = n) : (i += "个人（电子普通发票）", a.electronic.selectedTitleName = "个人"), 
                        e.selectContent && (i += e.selectContentName, s.content = e.selectContent), be.lineFpObj ? (s.phone = be.lineFpObj.phone, 
                        s.email = be.lineFpObj.email) : a && a.electronic && (s.phone = a.electronic.phone, 
                        s.email = a.electronic.email), be.lineFpObj = s;
                        break;

                      default:
                        i += "不开发票";
                    }
                    a.selectedType = e.selectedType, a[p] && (a[p].selectedTitle = e.selectedTitle, 
                    a[p].selectContent = e.selectContent, a[p].selectBookContent = e.selectBookContent, 
                    a[p].selectContentName = e.selectContentName, a[p].selectBookContentName = e.selectBookContentName, 
                    a[p].invoiceCode = e.invoiceCode), "2" == e.selectedType || "5" != e.selectedTitle || e.invoiceCode || (V.order.showTaxTip = !0), 
                    V.order.invoice = a, V.order.invoiceHtml = i;
                }(e.invoice), function(e) {
                    for (var i = 0, s = e.length; i < s; i++) {
                        var t = e[i].venderId;
                        Q[t] && (Q[t].show = "1" == e[i].isShow);
                    }
                }(e.VendorRemarkInfos || []), i(e);
            },
            fail: function(e) {
                i(e);
            }
        });
    });
}

function p(e) {
    var i = {};
    return i.action = J, i.setdefcoupon = e ? 0 : 1, G && M && (i.bizval = M), i.t = Date.parse(new Date()), 
    new T(function(e, s) {
        O.get(R ? Ye.globalPay_getcouponlist : Ye.userasset, i, {
            success: function(i) {
                if (0 == i.errId) if (R) {
                    var s = i.couponList, t = s.length, d = 0;
                    De = !1;
                    for (p = 0; p < s.length; p++) {
                        var n = s[p];
                        1 == n.selected && (d++, n.type == Be && (De = !0));
                    }
                    i.usableCouponCount = t, i.usedCouponCount = d, i.jingQuanUsed = De, i && (V.order.coupon = i), 
                    V.order.pinGouFreeDeal = i.pinGouFreeDeal, Te = !(!i.order.orderprice || !(i.order.orderprice.giftDiscount > 0 || i.order.orderprice.consignCardDiscount > 0)), 
                    Ce = i.order.orderprice;
                } else {
                    var t = (s = i.coupon.couponList).length, d = 0;
                    De = !1;
                    for (var p = 0; p < s.length; p++) 1 == (n = s[p]).selected && (d++, n.type == Be && (De = !0));
                    i.coupon.usableCouponCount = t, i.coupon.usedCouponCount = d, i.coupon.jingQuanUsed = De, 
                    i.coupon && (V.order.coupon = i.coupon), V.order.pinGouFreeDeal = i.pinGouFreeDeal, 
                    Te = !(!i.order.orderprice || !(i.order.orderprice.giftDiscount > 0 || i.order.orderprice.consignCardDiscount > 0)), 
                    i.giftcardList && (V.order.giftcardList = i.giftcardList), i.jdbean && (V.order.jdbean = i.jdbean, 
                    ze = parseInt(i.jdbean.used || 0, 10) > 0), i.balance && (V.order.balance = i.balance, 
                    Pe = "1" == i.balance.isChecked), Ce = i.order.orderprice;
                }
                e(i);
            },
            fail: function(i) {
                e(i);
            }
        });
    });
}

function a() {
    var e = {};
    return e.source = 5, e.t = Date.parse(new Date()), new T(function(i, s) {
        O.get(Ye.PwdIsActive, e, {
            success: function(e) {
                0 == e.retcode && ((U = {}).isLongPwdActive = e.isLongPwdActive, U.isShortPwdActive = e.isShortPwdActive), 
                i(e);
            },
            fail: function(e) {
                i(e);
            }
        });
    });
}

function o() {
    return ae = "0", new T(function(e, i) {
        if (oe) if ("0" != V.order.address.aid && V.order.address.aid) {
            var s = V.order.address, t = (s.aid, s.jdaddrid, s.jdaddrname, s.full, {
                adid: s.aid,
                type: "1",
                r: Math.random()
            });
            O.get(Ye.getrecvaddrV3, t, {
                success: function(i) {
                    "0" == i.errCode && i.list && i.list.length > 0 && (V.order.address.email = i.list[0].email, 
                    V.order.address.postcode = i.list[0].postcode, V.order.address.phone = i.list[0].phone, 
                    "1" == i.list[0].need_upgrade && (ae = "1"), oe = !1), e(i);
                },
                fail: function(i) {
                    e(i);
                }
            });
        } else e({}); else e({});
    });
}

function r() {
    if (Ce) {
        var e = Ce;
        e.shippingFee = parseInt(e.shippingFee) + parseInt(e.freeFreight), V.order.orderprice = e, 
        Ce = null;
    }
    V.order.supportPayUponArrival = je;
    var i = {
        pwdinfo: U,
        productObj: {
            products: Y,
            gifts: se,
            zengGifts: te
        },
        mainNum: Z,
        iType: ee,
        venders: $,
        initVenderRemark: Q,
        locShopNameMap: pe,
        orderinfo: V.order,
        defaultPin: V.defaultPin,
        orderPromotion: V.orderPromotion,
        addrUpgrade: ae,
        mzsuitsgifts: re,
        mzsuitsgifts_isAchieved: ce,
        mzsuits: le,
        mhgsuitsgifts: ue,
        mhgsuits: me,
        skulist: ye,
        samsVipGoods: fe,
        chgGoods: ve,
        usedJBeanPromo: we,
        isChgArea: H,
        selShipInstall: Xe,
        supSelShipTime: Se
    };
    Ie(null, i);
}

function c(e, i, s, t) {
    var d = {};
    d.paytype = "" + i, d.paychannel = "" + s, d.reg = "1", d.seq = "", d.cid = "3", 
    d.sid = "", d.unpl = "", d.type = "0", d.token2 = V.token2, d.skulist = V.skulist, 
    d.totalprice = (V.order.orderprice.totalPrice / 100).toFixed(2) + "", d.gpolicy = "", 
    d.valuableskus = X, d.action = J, d.promoid = "", d.ship = h()[0], d.pick = h()[1], 
    d.savepayship = "0", G && (d.bizval = M, d.bizkey = A, d.activeid = q), x && (d.extInfo = A + "=" + M), 
    d.t = Date.parse(new Date()), (De || Te || ze || Pe || we) && (d.pwd = "" + k.hexMD5(_e));
    var n = [];
    for (var p in e) {
        var a = (e[p].value || "").trim().replace(/[<>]/g, "");
        e[p].show && a && n.push(p + "|" + encodeURIComponent(a));
    }
    d.venderremark = n.join(","), g.default.addPtag(y.CONFIRM_ORDER_SEND), O.get(R ? Ye.globalPay_confirm : Ye.confirm, d, t);
}

function l(e, i) {
    var s = {};
    s.paytype = e, s.paychannel = "0", s.ship = h()[0], s.pick = h()[1], s.reg = 1, 
    s.action = J, "1" == be.usePcPrice && (_data.platprice = 1), s.t = Date.parse(new Date()), 
    O.get(Ye.setpayship, s, i);
}

function h() {
    var e = [], i = [], s = void 0, t = be.setPayShipData;
    for (s in t) t[s].ship && e.push(t[s].ship), t[s].pick && i.push(t[s].pick);
    return [ e.join("$"), i.join("$") ];
}

function u(e) {
    var i = void 0, s = void 0, t = new Array(6), d = new Array(20), n = void 0, p = void 0, a = e.vender, o = e.selectShipId, r = e.shipType;
    for (e.resetShip, "0" == r ? d = new Array(20) : "1" == r ? d = new Array(7) : "2" != r && "5" != r || (d = new Array(14)), 
    i = 0, s = t.length; i < s; i++) t[i] = "";
    for (i = 0, s = d.length; i < s; i++) d[i] = "";
    return d[0] = r, d[1] = o, "1" == r || "2" == r || "5" == r ? d[2] = a.venderId : "8" == r ? d[2] = "0" : d[17] = "0", 
    a.selectedShip && !a.isla && be.selLaShip && (n = !0), !a.selectedlaShip || a.selectedShip && "shipjd" != a.selectedShip || !be.selShip || (p = !0), 
    "0" == r || p ? ("ship411" == a.selectedShip || p && "ship411" == be.selShip ? (d[2] = 5, 
    d[7] = 2, d[11] = a.ship411Obj.sendpay || be.selShipObj.sendpay || "") : "ship311" == a.selectedShip || p && "ship311" == be.selShip ? (d[2] = 4, 
    d[7] = 1, d[9] = a.ship311Obj.date || be.selShipObj.date || "", d[10] = a.ship311Obj.time || be.selShipObj.time || "", 
    d[11] = a.ship311Obj.sendpay || be.selShipObj.sendpay || "", d[12] = a.ship311Obj.batchId || be.selShipObj.batchId || "") : ("shipjzd" == a.selectedShip || p && "shipjzd" == be.selShip) && (d[2] = 6, 
    d[7] = 3, d[9] = a.shipjzdObj.date || be.selShipObj.date || "", d[10] = a.shipjzdObj.time || be.selShipObj.time || "", 
    d[11] = a.shipjzdObj.sendpay || be.selShipObj.sendpay || "", d[12] = a.shipjzdObj.batchId || be.selShipObj.batchId || "", 
    d[18] = ""), d[5] = 0, d[19] = a.honortag, t = []) : "3" == r || "6" == r ? (t[0] = r, 
    t[1] = o, t[2] = a.shipzitiObj.addr.pickId, t[3] = 0, t[5] = a.shipzitiObj.date, 
    t[6] = a.venderId, d = []) : "1" == r || "4" == r || "8" == r ? t = [] : "2" == r ? (d[3] = a.shipSopObj.date || "", 
    d[4] = a.shipSopObj.time || "", d[5] = a.shipSopObj.sendpay || "", d[6] = a.shipSopObj.batchId || "", 
    d[13] = a.honortag, t = []) : "5" == r && (d[3] = a.shipSopjdObj.date || "", d[4] = a.shipSopjdObj.time || "", 
    d[5] = a.shipSopjdObj.sendpay || "", d[6] = a.shipSopjdObj.batchId || "", d[13] = a.honortag, 
    t = []), (a.isla || n) && ("shipla" == a.selectedlaShip || n && "shipla" == be.selLaShip ? (d[3] = a.shiplaObj.defaultDOffset || be.selLaShipObj.defaultDOffset || "", 
    d[4] = a.shipIns.iOffset || be.selShipIn.iOffset || "", d[8] = 4) : "shipla2" == a.selectedlaShip || n && "shipla2" == be.selLaShip ? (d[3] = a.shipla2Obj.reservingDate || be.selLaShipObj.reservingDate || "", 
    d[4] = a.shipIns.iOffset || be.selShipIn.iOffset || "", d[8] = 4, d[13] = a.shipla2Obj.date || be.selLaShipObj.date || "", 
    d[14] = a.shipla2Obj.time || be.selLaShipObj.time || "", d[15] = a.shipla2Obj.sendpay || be.selLaShipObj.sendpay || "", 
    d[16] = a.shipla2Obj.batchId || be.selLaShipObj.batchId || "") : ("shiplajzd" == a.selectedlaShip || n && "shiplajzd" == be.selLaShip) && (d[3] = a.shiplajzdObj.reservingDate || be.selLaShipObj.reservingDate || "", 
    d[4] = a.shipIns.iOffset || be.selShipIn.iOffset || "", d[8] = 5, d[13] = a.shiplajzdObj.date || be.selLaShipObj.date || "", 
    d[14] = a.shiplajzdObj.time || be.selLaShipObj.time || "", d[15] = a.shiplajzdObj.sendpay || be.selLaShipObj.sendpay || "", 
    d[16] = a.shiplajzdObj.batchId || be.selLaShipObj.batchId || "", d[18] = ""), t = []), 
    {
        paytype: "0",
        paychannel: "0",
        reg: 1,
        ship: d.join("|"),
        pick: t.join("|"),
        action: J
    };
}

function m(e) {
    if ("object" != (void 0 === e ? "undefined" : S(e))) return e;
    if (null == e) return e;
    var i = new Object();
    for (var s in e) i[s] = e[s];
    return i;
}

function f(e) {
    var i = e.split("-");
    return parseInt(i[1]) + "月" + parseInt(i[2]) + "日";
}

function v(e) {
    var i = new Date(e).getTime();
    return !!i && (i - b.getServerTime() >= 6048e5 || void 0);
}

function j(e) {
    var i = e.split(" "), s = i[0].split("-"), t = (i[1] || "").split(":");
    return parseInt(s[1]) + "月" + parseInt(s[2]) + "日" + (t[0] || "00") + ":" + (t[1] || "00");
}

var S = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, y = function(e) {
    if (e && e.__esModule) return e;
    var i = {};
    if (null != e) for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (i[s] = e[s]);
    return i.default = e, i;
}(require("../../api/Ptag/Ptag_constants")), g = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../api/Ptag/Ptag_utils.js")), b = require("../../common/fe_helper"), I = require("./wechat_pay.js"), k = (require("../../common/cookie-v2/cookie.js"), 
require("../../libs/md5.js")), O = require("./pay_request.js"), D = require("../../common/login/login.js"), T = require("../../libs/promise.min.js"), z = void 0, P = void 0, w = void 0, _ = void 0, C = void 0, L = void 0, F = void 0, N = 0, q = void 0, A = void 0, M = void 0, x = void 0, G = void 0, R = void 0, E = void 0, B = !0, H = 0, J = 0, V = null, U = null, W = !0, $ = [], Q = {}, K = [], X = [], Y = [], Z = 0, ee = "", ie = [], se = [], te = [], de = [], ne = [], pe = {
    disabledValueAddedServieList: [],
    isLocDisable: !1
}, ae = 0, oe = !0, re = [], ce = !1, le = [], he = [], ue = [], me = [], fe = [], ve = [], je = !1, Se = !1, ye = "", ge = 0, be = {
    setPayShipData: {},
    shipData: {},
    fpObj: !1,
    vatFpObj: !1,
    lineFpObj: !1,
    selLaShip: !1,
    selShip: !1,
    selLaShipObj: !1,
    selShipObj: !1,
    selShipIn: !1
}, Ie = null, ke = null, Oe = null, De = !1, Te = !1, ze = !1, Pe = !1, we = !1, _e = "", Ce = null, Le = null, Fe = null, Ne = 1, qe = 4, Ae = 1, Me = -2, xe = 0, Ge = 1, Re = 3, Ee = 0, Be = 0, He = Ae, Je = "明细", Ve = void 0, Ue = void 0, We = Me, $e = "不开图书发票", Qe = !1, Ke = !1, Xe = !1, Ye = {
    orderinfo: "https://wqdeal2.jd.com/deal/minfo/orderinfo",
    venderinfo: "https://wqdeal2.jd.com/deal/minfo/venderinfo",
    shipeffect: "https://wqdeal2.jd.com/deal/mship/shipeffect",
    vshipsvc: "https://wqdeal2.jd.com/deal/mship/vshipsvc",
    vshipfee: "https://wqdeal2.jd.com/deal/mship/vshipfee",
    itemchargelist: "https://wqdeal2.jd.com/deal/mship/getitemchargelist",
    orderdelivery: "https://wqdeal2.jd.com/deal/mship/updateorderdelivery",
    userasset: "https://wqdeal2.jd.com/deal/masset/userasset",
    assitinfo: "https://wqdeal2.jd.com/deal/massit/assitinfo",
    getrecvaddrV3: "https://wq.jd.com/deal/recvaddr/getrecvaddrV3",
    getinvoicelist: "https://wqdeal2.jd.com/deal/massit/getinvoicelist",
    saveinvoice: "https://wqdeal2.jd.com/deal/massit/saveinvoice",
    chooseship: "https://wqdeal2.jd.com/deal/mship/chooseship",
    uncheckcmdy: "https://wqdeal2.jd.com/deal/mshopcart/uncheckcmdy",
    rmvcmdy: "https://wqdeal2.jd.com/deal/mshopcart/rmvcmdy",
    confirm: "https://wqdeal2.jd.com/deal/msubmit/confirm",
    setpayship: "https://wqdeal2.jd.com/deal/mship/setpayship",
    setbean: "https://wqdeal2.jd.com/deal/masset/setbean",
    setbalance: "https://wqdeal2.jd.com/deal/masset/setbalance",
    modifycmdypromo: "https://wqdeal2.jd.com/deal/mshopcart/modifycmdypromo",
    setgiftcard: "https://wqdeal2.jd.com/deal/masset/setgiftcard",
    freightinsure: "https://wqdeal2.jd.com/deal/mship/selectbuyerfreightinsure",
    PwdIsActive: "https://wq.jd.com/user/info/PwdIsActive",
    getpicksitelist: "https://wqdeal2.jd.com/deal/mship/getpicksitelist",
    orderdetailstate: "https://wq.jd.com/bases/orderdetail/state",
    orderdetailmoneyflow: "https://wq.jd.com/bases/xuniorder/orderdetail",
    querywxlborder: "https://wq.jd.com/activepersistent/gwlb/querywxlborder",
    setgbuyaut: "https://wqdeal2.jd.com/deal/globalpurchase/setgbuyaut",
    globalPay_view: "https://wqdeal2.jd.com/deal/globalpurchase/orderinfo",
    globalPay_venderinfo: "https://wqdeal2.jd.com/deal/globalpurchase/venderinfo",
    globalPay_confirm: "https://wqdeal2.jd.com/deal/globalpurchase/confirm",
    globalPay_getShipeffect: "https://wqdeal2.jd.com/deal/globalpurchase/shipeffect",
    globalPay_assitInfo: "https://wqdeal2.jd.com/deal/globalpurchase/assitinfo",
    globalPay_chooseship: "https://wqdeal2.jd.com/deal/globalpurchase/chooseship",
    globalPay_getcouponlist: "https://wqdeal2.jd.com/deal/globalpurchase/getcouponlist",
    globalPay_setpayship2: "https://wqdeal2.jd.com/deal/globalpurchase/setpayship",
    globalPay_getpicksitelist: "https://wqdeal2.jd.com/deal/globalpurchase/getpicksitelist"
}, Ze = [ "今天", "周一", "周二", "周三", "周四", "周五", "周六", "周日" ], ei = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ], ii = {
    success: function(e) {
        function i(e) {
            var i, s, t, d, n, p = [];
            if (d = (i = e).mainSku.cid.indexOf("_") > -1 ? i.mainSku.cid.split("_")[2] : i.mainSku.cid, 
            X.push(i.mainSku.id + "," + i.mainSku.num + "," + (parseInt(i.mainSku.promotion.price, 10) - parseInt(i.mainSku.promotion.discount, 10)) + "," + d), 
            h.push(i.mainSku.id), u.push(i.mainSku.id + "|" + i.mainSku.shipSvcItemId + "|" + i.mainSku.shipSvcTemplateId), 
            m[i.mainSku.shipSvcItemId] = i.mainSku.shipSvcItemName, "1" == i.mainSku.isFreeload && (j = !0, 
            v.push(i.mainSku.id + "|" + i.mainSku.shipSvcTemplateId + "|" + i.mainSku.num)), 
            i.isJiaJiaGou || Z++, i.gifts) for (s = 0, t = i.gifts.skus.length; s < t; s++) "1" == (n = i.gifts.skus[s]).zxLx && fe.push(n.id), 
            "1" == n.isAccessory ? ie.push(n) : (n.productID = i.mainSku.id, n._suitId = i._suitId || "0", 
            0 != n._suitId && (n.num *= i.suitNum || 1), se.push(n)), "1" == n.plusGiftPromo && (i.c_plusGift = !0), 
            i.c_giftTitle = n.giftName || "赠品";
            if (i.servicePrjInfo && ("0" == i.servicePrjInfo.status ? pe.disabledValueAddedServieList.push({
                mainSkuId: i.mainSku.id,
                mainSkuNum: i.mainSku.num,
                serviceName: i.servicePrjInfo.serviceProjectName
            }) : "-1" == i.servicePrjInfo.status && (pe.isLocDisable = !0)), "1" == i.mainSku.locType && i.mainSku.lsId && ne.push(i.mainSku.lsId), 
            "0" != i.mainSku.shipSvcItemId || i.isJiaJiaGou || (f = !0), "1" == i.usedJBeanPromo && (we = !0), 
            p = [], i.mainSku.color && p.push(i.mainSku.color), i.mainSku.size && p.push(i.mainSku.size), 
            i.mainSku.saleProps && i.mainSku.saleProps.length > 0) for (var a = 0; a < i.mainSku.saleProps.length; a++) p.push(i.mainSku.saleProps[a].saleValue);
            p.length > 0 && (i.mainSku.skuString = p.join("，")), "1" == i.mainSku.isChgArea && ve.push(i), 
            "1" == i.mainSku.zxLx && fe.push(i.mainSku.id), Y.push(i);
        }
        if (0 == e.errId) {
            be.usePcPrice = e.order.usePcPrice, void 0 == e.order.address && (e.order.address = {}), 
            L = e.order.address.aid || 0, Te = !(!e.order.orderprice || !(e.order.orderprice.giftDiscount > 0 || e.order.orderprice.consignCardDiscount > 0)), 
            H = e.order.isChgArea || e.order.isSamChgArea ? 1 : 0;
            var s = void 0, c = void 0, l = void 0, h = [], u = [], m = {}, f = !1, v = [], j = !1, S = 0, y = 0, g = "";
            for (l = e.order.venderCart, Z = 0, ee = "", $ = [], Q = {}, K = [], Y = [], ie = [], 
            se = [], te = [], de = [], ne = [], pe = {
                disabledValueAddedServieList: [],
                isLocDisable: !1
            }, X = [], re = [], ce = !1, le = [], he = [], ue = [], me = [], fe = [], ve = [], 
            be.shipData = {}, be.setPayShipData = {}, we = !1, Se = !1, ye = e.skulist ? e.skulist : "", 
            s = 0, c = l.length; s < c; s++) $[s] = {
                products: [],
                venderId: l[s].venderId,
                venderName: l[s].venderName,
                isSams: l[s].isSams,
                venderType: l[s].venderType,
                jdShipment: l[s].jdShipment,
                freight: l[s].freight,
                venderShipSvcFee: l[s].venderShipSvcFee,
                venderCashBack: l[s].venderCashBack,
                isSupShipSvc: l[s].isSupShipSvc,
                shipment: l[s].shipment
            }, Q[l[s].venderId] = {
                num: 0,
                value: "",
                show: !1
            }, function(e, s) {
                var t = void 0, d = void 0, n = void 0, p = void 0, a = [], o = void 0, r = [];
                if (u = [], a = [], m = {}, f = !1, v = [], j = !1, g = "", e.products) for (ee = 1, 
                t = 0, d = e.products.length; t < d; t++) i(e.products[t]), s.push(e.products[t]), 
                e.products[t].mainSku._promo_type = 1;
                if (e.suits) for (ee = 4, t = 0, d = e.suits.length; t < d; t++) for (g = e.suits[t].suitType || "", 
                n = 0, p = e.suits[t].products.length; n < p; n++) (o = e.suits[t].products[n]).isTaozhuang = !0, 
                o.suitNum = e.suits[t].num, o._suitId = e.suits[t].promotion ? e.suits[t].promotion.pid : "0", 
                o.mainSku.num = o.mainSku.num * e.suits[t].num, o.mainSku._promo_type = 4, 0 == n && (o.suitStart = !0, 
                o.suitName = e.suits[t].name), n == p - 1 && (o.suitEnd = !0, o.suitPrice = (e.suits[t].promotion.discountPrice / 100).toFixed(2)), 
                i(o), s.push(o);
                if (e.mfsuits) for (ee = 11, t = 0, d = e.mfsuits.length; t < d; t++) {
                    var c = e.mfsuits[t];
                    for (n = 0, p = e.mfsuits[t].products.length; n < p; n++) (o = e.mfsuits[t].products[n]).mainSku._promo_type = 11, 
                    o.mainSku._promo_pid = e.mfsuits[t].promotion.pid, "7" == e.mfsuits[t].multiPromo && "1" == e.mfsuits[t].isAchieved && (o.isManmian = !0), 
                    i(o), s.push(o);
                    if (c.suits && c.suits.length > 0) for (var l = 0, h = c.suits.length; l < h; l++) for (var S = 0, y = c.suits[l].products.length; S < y; S++) (o = c.suits[l].products[S]).isTaozhuang = !0, 
                    o.isMfVSuit = !0, o.vskuId = c.suits[l].vskuId, o.pid = c.promotion ? c.promotion.pid : "0", 
                    o.suitNum = c.suits[l].num, o._suitId = c.suits[l].promotion ? c.suits[l].promotion.pid : "0", 
                    o.mainSku._promo_type = 4, 0 == S && (o.suitStart = !0, o.suitName = c.suits[l].name), 
                    S == y - 1 && (o.suitEnd = !0, o.suitPrice = (c.suits[l].promotion.discountPrice / 100).toFixed(2)), 
                    i(o), s.push(o);
                }
                if (e.mzsuits) for (ee = 13, ce = !1, t = 0, d = e.mzsuits.length; t < d; t++) !function() {
                    var d = e.mzsuits[t];
                    for (n = 0, p = d.products.length; n < p; n++) (o = d.products[n]).mainSku._promo_type = 13, 
                    o.mainSku._promo_pid = d.promotion.pid, i(o), s.push(o);
                    if ("0" != d.promotion.addMoney || d.fullType && "24" == d.fullType) {
                        for (n = 0, p = d.selectedGiftSkus.length; n < p; n++) d.selectedGiftSkus[n].isJiaJiaGou = !0, 
                        d.selectedGiftSkus[n].fullType = d.fullType, i(d.selectedGiftSkus[n]), s.push(d.selectedGiftSkus[n]), 
                        ue.push(d.selectedGiftSkus[n]);
                        me.push(d);
                    } else if ("1" == d.isAchieved) {
                        for (n = 0, p = d.selectedGiftSkus.length; n < p; n++) re.push(d.selectedGiftSkus[n]);
                        ce = !0;
                    }
                    if ("1" == d.isAchieved && ("0" == d.promotion.addMoney ? le.push(d) : d.promotion.manfan > 0 && he.push(d), 
                    d.selectedGiftSkus && d.selectedGiftSkus.length > 0 && d.selectedGiftSkus.forEach(function(e) {
                        e.mainSku.nostockPid = d.promotion.pid, te.push(e.mainSku);
                    })), d.suits && d.suits.length > 0) for (var a = 0, r = d.suits.length; a < r; a++) for (var c = 0, l = d.suits[a].products.length; c < l; c++) (o = d.suits[a].products[c]).isTaozhuang = !0, 
                    o.isMzVSuit = !0, o.vskuId = d.suits[a].vskuId, o.pid = d.promotion ? d.promotion.pid : "0", 
                    o.suitNum = d.suits[a].num, o._suitId = d.suits[a].promotion ? d.suits[a].promotion.pid : "0", 
                    o.mainSku._promo_type = 4, 0 == c && (o.suitStart = !0, o.suitName = d.suits[a].name), 
                    c == l - 1 && (o.suitEnd = !0, o.suitPrice = (d.suits[a].promotion.discountPrice / 100).toFixed(2)), 
                    i(o), s.push(o);
                }();
                for (var b in m) m[b] && r.push(m[b]);
                f && "1" == e.isSupShipSvc && (e.svcAndShip = !0), e.selShipSvc = r.join("+"), e.skuIds = a, 
                e.svcIds = u, e.supService = j, e.serviceIds = v, e.suitType = g, de = de.concat(u);
            }(l[s], $[s].products), $[s].selShipSvc = l[s].selShipSvc, $[s].skuIds = l[s].skuIds, 
            $[s].svcIds = l[s].svcIds, $[s].supService = l[s].supService, $[s].serviceIds = l[s].serviceIds, 
            $[s].svcAndShip = l[s].svcAndShip, $[s].suitType = l[s].suitType, t({
                vender: $[s],
                ship: e.order.payment
            }), l[s].venderId > 0 && K.push(l[s].venderId);
            if (!R) {
                $.sort(function(e, i) {
                    return e.venderType - i.venderType;
                });
                var b = void 0, I = [];
                for (s = 0, c = $.length; s < c; s++) !function() {
                    var e = $[s];
                    (0 == e.venderId || [ "0", "1" ].indexOf(e.venderType) > -1) && !e.isloc && (e.products.forEach(function(i) {
                        i.venderId = e.venderId;
                    }), b ? (b.products = b.products.concat(e.products), e.combed = !0) : b = e, I.push(e.venderId));
                }();
                I.length > 1 && (b.combVid = I.join("_"));
            }
            if (void 0 != e.order.payment) {
                je = !1;
                for (var k = 0; k < e.order.payment.length; k++) {
                    var O = e.order.payment[k];
                    4 == O.id && (S = O.supSkuids.length), 1 == O.id && (y = O.supSkuids.length);
                }
                y == S && (je = !0);
            }
            void 0 != e.order.invoice && (Qe = 1 == e.order.invoice.hasBookSku, Ke = 1 == e.order.invoice.hasCommonSku), 
            V = e, T.all([ d(), p(B), n(), a(), o() ]).then(function(e) {
                r();
            }), B = !1;
        } else Ie(e, e);
    },
    fail: function(e) {
        Ie(e, e);
    }
}, si = {
    success: function(e) {
        if (0 == e.errId) {
            var i = getApp().appId;
            if (ge = e.dealId, g.default.addPtag(y.CONFIRM_WECHAT_ORDER_FINISHED, {
                dealId: e.dealId
            }), "0" == V.order.orderprice.totalPrice) return void ke(null, e.dealId);
            I.requestPay(i, ge, ke);
        } else ke(e, ge);
    },
    fail: function(e) {
        ke(e, ge);
    }
}, ti = {
    success: function(e) {
        0 == e.errId ? (ge = e.dealId, g.default.addPtag(y.CONFIRM_QRTJ_ORDER_FINISHED, {
            dealId: e.dealId
        }), ke(null, ge)) : ke(e, ge);
    },
    fail: function(e) {
        ke(e, ge);
    }
}, di = {
    success: function(e) {
        0 == e.errId ? (ge = e.dealId, g.default.addPtag(y.CONFIRM_ARRIVAL_ORDER_FINISHED, {
            dealId: e.dealId
        }), ke(null, ge)) : ke(e, ge);
    },
    fail: function(e) {
        ke(e, ge);
    }
}, ni = {
    success: function(e) {
        if (0 == e.errId) {
            var i = e.order.orderprice;
            i.shippingFee = parseInt(i.shippingFee) + parseInt(i.freeFreight), Le ? Le(null, {
                orderprice: i
            }) : Fe && Fe(null, {
                orderprice: i
            });
        } else Le ? Le(e, e) : Fe && Fe(e, e);
    },
    fail: function(e) {
        Le ? Le(e, e) : Fe && Fe(e, e);
    }
}, pi = {
    success: function(e) {
        0 == e.errId ? (ge = e.dealId, g.default.addPtag(y.CONFIRM_DAIFU_ORDER_FINISHED, {
            dealId: e.dealId
        }), ke(null, e.dealId)) : ke(e, ge);
    },
    fail: function(e) {
        ke(e, ge);
    }
};

module.exports = {
    initialize: function(i, s) {
        L = 0, _e = "", V = null, ge = 0, ke = null, Oe = null, De = !1, Te = !1, ze = !1, 
        Pe = !1, _e = "", He = Ae, Je = "明细", We = Me, $e = "不开图书发票", Qe = !1, Ke = !1, 
        W = !0, ae = "0", oe = !0, Ve = Ne, Ue = qe, P = i.commlist || "", z = i.sku, w = i.quantity, 
        _ = i.ybcommlist || "", C = i.zpcommlist || "", we = !1, N = i.type || 0, q = i.activeid, 
        A = i.bizkey, M = i.bizval, x = i.isFromPingou, G = i.isPingou, R = i.isGlobalPay, 
        E = i.globalPaySource, B = !0, be.setPayShipData = {}, be.shipData = {}, be.fpObj = !1, 
        be.vatFpObj = !1, be.lineFpObj = !1, be.selLaShip = !1, be.selShip = !1, be.selLaShipObj = !1, 
        be.selShipObj = !1, be.selShipIn = !1, Xe = !1, Ie = s, e(0, 0, 1);
    },
    startPay: function(e, i, s, t) {
        ke = t, _e = i, "wechatPay" == e ? c(s, xe, 2, si) : "payUponArrival" == e ? c(s, Ge, Ee, di) : "onlySubmitOrder" == e ? c(s, xe, 2, ti) : "payByFriend" == e && c(s, Re, 2, pi);
    },
    setPayUponArrival: function(e) {
        Le = e, Fe = null, l(Ge, ni);
    },
    cancelPayUponArrival: function(e) {
        Fe = e, Le = null, l(xe, ni);
    },
    increaseProductQuantity: function(i, s) {
        Ie = s, "string" == typeof w && (w = parseInt(w)), "string" == typeof i && (i = parseInt(i)), 
        w = i, e(0, 1, 0);
    },
    decreaseProductQuantity: function(i, s) {
        Ie = s, "string" == typeof w && (w = parseInt(w)), "string" == typeof i && (i = parseInt(i)), 
        w = i, e(0, 1, 0);
    },
    setProductQuantity: function(i, s) {
        0 != i && "" != i && (Ie = s, w = i, e(0, 1, 0));
    },
    resetSkuPrice: function(e, s, t) {
        Ie = t, i(e, 1, 0, s);
    },
    setGift: function(e) {
        Ie = e, i(0, 1, 0);
    },
    refreshOrderInfoAfterSelectAddress: function(e, s) {
        L = e, Ie = s, W = !0, oe = !0, i(0, 2, 0);
    },
    refreshOrderInfoAfterSelectCoupon: function(e) {
        Ie = e, p().then(function(e) {
            r();
        });
    },
    refreshUserAsset: function(e) {
        Ie = e, p().then(function(e) {
            r();
        });
    },
    removeProductOrGift: function(e, i) {
        function s(e) {
            var i = void 0, s = [];
            n.length > 0 ? (n.forEach(function(e) {
                e._suitId ? s.push(e._suitId + ",0," + (e.num || "1") + ",,4,,0") : s.push(e.id + ",0," + e.num + "," + e.id + "," + (e._promo_type || 0) + "," + (e._promo_pid || 0) + ",0");
            }), i = {
                commlist: s.join("$"),
                type: "0",
                locationid: "",
                scene: 1,
                reg: "1"
            }, O.get(Ye.uncheckcmdy, i, {
                success: function(i) {
                    e();
                },
                fail: function(i) {
                    e();
                }
            })) : e();
        }
        function t(e) {
            var i = void 0, s = [];
            p.length > 0 ? (p.forEach(function(e) {
                s.push(e.id + ",0,1," + e.id + ",16," + e.nostockPid + ",0");
            }), i = {
                commlist: s.join("$"),
                type: "1",
                checked: "0",
                locationid: "",
                reg: "1"
            }, O.get(Ye.rmvcmdy, i, {
                success: function(i) {
                    e();
                },
                fail: function(i) {
                    e();
                }
            })) : e();
        }
        var d = [], n = [], p = [], a = Y;
        a = a.filter(function(e) {
            return !e.isJiaJiaGou;
        }), e.forEach(function(e) {
            var i = !1;
            se.forEach(function(s) {
                s.id == e && (d.push(s), i = !0);
            }), i || te.forEach(function(s) {
                s.id == e && (p.push(s), i = !0);
            }), i || a.forEach(function(i) {
                i.mainSku.id == e && (i._suitId && (i.mainSku._suitId = i._suitId), n.push(i.mainSku));
            });
        }), function(e) {
            var i = void 0, s = [];
            d.length > 0 ? (d.forEach(function(e) {
                "0" != e._suitId ? s.push(e.productID + ",0,1,0,4," + e.id + "," + e._suitId) : s.push(e.productID + ",0,1,0,1," + e.id + "," + e._suitId);
            }), i = {
                commlist: s.join("$"),
                type: "5",
                checked: "0",
                locationid: "",
                reg: "1"
            }, O.get(Ye.rmvcmdy, i, {
                success: function(i) {
                    e();
                },
                fail: function(i) {
                    e();
                }
            })) : e();
        }(function() {
            t(function() {
                s(i);
            });
        });
    },
    setCurrPayShip: function(e, i) {
        var s = void 0, t = void 0, d = void 0;
        e.selectShipId, t = "0" == (d = e.shipType) || "3" == d ? "0" : e.venderId, be.setPayShipData[t] = u({
            vender: e,
            shipType: e.shipType,
            selectShipId: e.selectShipId
        }), (s = m(be.setPayShipData[t])).ship = h()[0], s.pick = h()[1], "1" == be.usePcPrice && (s.platprice = 1), 
        O.get(R ? Ye.globalPay_setpayship2 : Ye.setpayship, s, {
            success: function(e) {
                i && i(e);
            },
            fail: function(e) {
                i && i(e);
            }
        });
    },
    chooseShip: function(e, i) {
        var s = "0" == e.shipType || "3" == e.shipType ? "0" : e.venderId;
        be.setPayShipData[s] = u({
            vender: e,
            shipType: e.shipType,
            selectShipId: e.selectShipId
        });
        var t = m(be.setPayShipData[s]);
        t.ship = h()[0], t.pick = h()[1], "1" == be.usePcPrice && (t.platprice = 1), O.get(R ? Ye.globalPay_chooseship : Ye.chooseship, t, {
            success: function(e) {
                i && i(e);
            },
            fail: function(e) {
                i && i(e);
            }
        });
    },
    fetchShipSvc: function(e, i) {
        var s = {
            action: J,
            venderid: e.venderid,
            svcid: e.svcid,
            areaid: e.areaid,
            sceneval: "",
            r: Date.parse(new Date())
        };
        O.get(Ye.vshipsvc, s, {
            success: function(e) {
                i && i(e);
            },
            fail: function(e) {
                i && i(e);
            }
        });
    },
    setShipSvc: function(e, i) {
        var s = {
            action: J,
            svrid: e.svrid,
            venderid: e.venderid,
            reg: "1",
            sceneval: "",
            r: Date.parse(new Date())
        };
        "1" == be.usePcPrice && (s.platprice = 1), O.get(Ye.vshipfee, s, {
            success: function(e) {
                i && i(e);
            },
            fail: function(e) {
                i && i(e);
            }
        });
    },
    handleLaShipService: function(e, i) {
        var s = {
            areaid: e.areaid,
            svcid: e.svcid,
            r: Date.parse(new Date())
        };
        O.get(Ye.itemchargelist, s, {
            success: function(e) {
                i && i(e);
            },
            fail: function(e) {
                i && i(e);
            }
        });
    },
    changeLaShipService: function(e, i) {
        var s = {
            areaid: e.areaid,
            svrid: e.svrid,
            r: Date.parse(new Date())
        };
        O.get(Ye.orderdelivery, s, {
            success: function(e) {
                i && i(e);
            },
            fail: function(e) {
                i && i(e);
            }
        });
    },
    refreshOrderAfterSelectShip: function(e) {
        Ie = e, T.all([ d(), p() ]).then(function(e) {
            r();
        });
    },
    fetchInvoiceList: function(e) {
        var i = {
            action: J,
            r: Math.random()
        };
        O.get(Ye.getinvoicelist, i, {
            success: function(i) {
                F = i, e && e(i);
            },
            fail: function(i) {
                e && e(i);
            }
        });
    },
    saveInvoice: function(e, i) {
        var s = "";
        e.action = J, O.get(Ye.saveinvoice, e, {
            success: function(t) {
                var d = "";
                0 == t.errCode ? (be.selInvoiceType = e.type, "1" == e.type ? (s = "fpObj", "4" == e.title ? d += "个人（普通发票）" : d += e.company + "（普通发票）") : "2" == e.type ? (s = "vatFpObj", 
                d += e.company + "（增值税专用发票）") : "3" == e.type && (s = "lineFpObj", "4" == e.title ? d += "个人（电子普通发票）" : d += e.company + "（电子普通发票）"), 
                e.content && (d += e.contentName), be[s] = e, be[s].hasBookSku = F.hasBookSku, be[s].hasCommonSku = F.hasCommonSku, 
                "2" == e.type && (be.vatFpObj.company = e.company), V.order.invoiceHtml = d, t.html = d, 
                i && i(t)) : i && i(t);
            },
            fail: function(e) {
                i && i(e);
            }
        });
    },
    setCard: function(e, i) {
        e.t = Date.parse(new Date()), e.reg = 1, e.action = J, O.get(Ye.setgiftcard, e, {
            success: function(e) {
                0 == e.errId ? i(null, e) : i(e, e);
            },
            fail: function(e) {
                i(e, e);
            }
        });
    },
    setBalance: function(e, i) {
        e.t = Date.parse(new Date()), e.seq = "", e.reg = 0, e.action = J, "1" == be.usePcPrice && (e.platprice = 1), 
        O.get(Ye.setbalance, e, {
            success: function(e) {
                0 == e.errId ? i(null, e) : i(e, e);
            },
            fail: function(e) {
                i(e, e);
            }
        });
    },
    setJdBean: function(e, i) {
        e.t = Date.parse(new Date()), e.seq = "", e.reg = 0, e.action = J, "1" == be.usePcPrice && (e.platprice = 1), 
        O.get(Ye.setbean, e, {
            success: function(e) {
                0 == e.errId ? i(null, e) : i(e, e);
            },
            fail: function(e) {
                i(e, e);
            }
        });
    },
    getDealId: function() {
        return ge;
    },
    setGbuyAut: function() {
        var e = {
            flag: 1,
            r: Math.random()
        };
        return new T(function(i, s) {
            D.getLoginPromise().then(function(t) {
                O.get(Ye.setgbuyaut, e, {
                    success: function(e) {
                        e && 0 != Object.keys(e).length ? 13 == e.errId ? s({
                            code: code,
                            message: "登录失败或用户未授权"
                        }) : i(e) : s(-1, "抱歉，请求数据出错");
                    },
                    fail: function(e) {
                        var i = e.code, t = e.message;
                        s({
                            code: i,
                            message: t
                        });
                    }
                });
            }, function(e) {
                var i = e.code, t = e.message;
                s({
                    code: i,
                    message: t
                });
            });
        });
    },
    requestPickList: function(e, i) {
        var s = {
            reg: "1",
            paytype: "0",
            pickid: e && e.pickId ? e.pickId : "0",
            regionid: "",
            num: 200,
            addrid: L || 0,
            action: J
        };
        O.get(R ? Ye.globalPay_getpicksitelist : Ye.getpicksitelist, s, {
            success: function(e) {
                i && i(e);
            },
            fail: function(e) {
                i && i(e);
            }
        });
    },
    getOrderDetail: function(e) {
        var i = {
            deal_id: e,
            t: new Date().getTime()
        };
        return new T(function(e, s) {
            D.getLoginPromise().then(function(t) {
                O.get(Ye.orderdetailstate, i, {
                    success: function(i) {
                        i && 0 != Object.keys(i).length ? e(i) : s(-1, "抱歉，请求数据出错");
                    },
                    fail: function(e) {
                        var i = e.code, t = e.message;
                        s({
                            code: i,
                            message: t
                        });
                    }
                });
            }, function(e) {
                var i = e.code, t = e.message;
                s({
                    code: i,
                    message: t
                });
            });
        });
    },
    getMoneyFlowOrderDetail: function(e, i) {
        var s = {
            orderid: e,
            ordertype: i,
            t: new Date().getTime()
        };
        return new T(function(e, i) {
            D.getLoginPromise().then(function(t) {
                O.get(Ye.orderdetailmoneyflow, s, {
                    success: function(s) {
                        s && 0 != Object.keys(s).length ? e(s) : i(-1, "抱歉，请求数据出错");
                    },
                    fail: function(e) {
                        var s = e.code, t = e.message;
                        i({
                            code: s,
                            message: t
                        });
                    }
                });
            }, function(e) {
                var s = e.code, t = e.message;
                i({
                    code: s,
                    message: t
                });
            });
        });
    },
    getGiftEntry: function(e, i, s) {
        var t = {
            odid: e,
            time: Math.round(new Date().getTime() / 1e3),
            pytp: s ? 1 : 4,
            odst: 4,
            cid: i,
            r: Math.random()
        };
        return new T(function(e, i) {
            D.getLoginPromise().then(function(s) {
                O.get(Ye.querywxlborder, t, {
                    success: function(s) {
                        s && 0 != Object.keys(s).length ? e(s) : i(-1, "抱歉，请求数据出错");
                    },
                    fail: function(e) {
                        var s = e.code, t = e.message;
                        i({
                            code: s,
                            message: t
                        });
                    }
                });
            }, function(e) {
                var s = e.code, t = e.message;
                i({
                    code: s,
                    message: t
                });
            });
        });
    },
    setFreightinsure: function(e, i) {
        var s = {
            checkflag: "1" == e ? "1" : "0",
            reg: "1",
            venderid: "0"
        };
        O.get(Ye.freightinsure, s, {
            success: function(e) {
                i && i(e);
            },
            fail: function(e) {
                i && i(e);
            }
        });
    },
    modifyCmdyPromo: function(e, i) {
        var s = V.orderPromotion.selectPromotion[0] ? V.orderPromotion.selectPromotion[0].pid : "", t = "";
        P ? t = P : z && (t = z + ",," + w + "," + z + ",1,0,0");
        var d = t.split(",");
        d[4] = ee, d[5] = s, d[6] = 0, d[7] = "", d[8] = "", d[9] = "", d[10] = "", d[11] = e.chgId;
        var n = {
            commlist: d.join(","),
            type: "0",
            checked: "0",
            scene: "1",
            locationid: "",
            r: Math.random()
        };
        O.get(Ye.modifycmdypromo, n, {
            success: function(e) {
                "0" == e.errId && (ee = e.itemType || ee), i && i(e);
            },
            fail: function(e) {
                i && i(e);
            }
        });
    },
    removeCmdy: function(e, i) {
        var s = e || {};
        s.r = Math.random(), O.get(Ye.rmvcmdy, s, {
            success: function(e) {
                i && i(e);
            },
            fail: function(e) {
                i && i(e);
            }
        });
    },
    SHIPMENT_JD: 65,
    SHIPMENT_JD_3RD: 66,
    SHIPMENT_SOP_3RD: 67,
    SHIPMENT_POP_JD: 68
};