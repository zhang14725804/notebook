function e(e, r) {
    if (!e) return null;
    for (var t = 0, l = e.length; t < l; t++) {
        var i = e[t];
        if (i) {
            var s = a(r, i);
            if (s) return s;
        }
    }
}

function a(e, a) {
    var r = e.split(".");
    if (r && !(r.length <= 0)) {
        r[0] = r[0].substring(1, r[0].length);
        for (var t = a, l = void 0, i = void 0, s = 0, n = r.length; s < n && t; s++) {
            var f, v = r[s], u = v.match(o);
            if (null != u) f = u[1]; else {
                var g = v.match(c);
                f = null != g ? "?" == g[1] && this.index ? this.index : g[1] : v;
            }
            if (0 == s) {
                for (var d = !1, b = 0, h = r.length; b < h; b++) if (f == t.name) {
                    if (d = !0, t, i = t.type, l = t.nodeText) switch (i) {
                      case "jsonArray":
                      case "sku":
                        t = l.data;
                        break;

                      case "image":
                      case "radio":
                      case "text":
                        t = l;
                        break;

                      case "simpleTab":
                        t = l.data;
                        break;

                      case "video":
                      case "hotArea":
                        t = l;
                    } else t = void 0;
                    break;
                }
                if (!d) {
                    t = null;
                    break;
                }
            } else if ("_size_" == f) {
                if (s != r.length - 1 || "[object Array]" != Object.prototype.toString.call(t)) {
                    t = null;
                    break;
                }
                t = t.length;
            } else t = t[f];
            if (!t) break;
        }
        if (l && t) switch (i) {
          case "text":
            1 == n && (t = l.text);
            break;

          case "image":
            1 == n && (t = l.imageUrl);
            break;

          case "radio":
            1 == n ? t = l.data.value : 2 == n && t && t == l.data && (t = l.data.value);
            break;

          case "video":
            t = l;
            break;

          case "hotArea":
            1 == n && (t = l.data);
        }
        return t;
    }
}

function r(e, a) {
    var r;
    if (void 0 == e || null == e) r = a; else if (void 0 == a || null == a) r = void 0; else if ("string" == typeof a) if ("$" == a[0]) {
        var l = t(e, a);
        l && (r = l);
    } else r = a; else r = a;
    return r;
}

function t(e, a) {
    if (!e) return null;
    for (var r = 0, t = e.length; r < t; r++) {
        var i = e[r];
        if (i) {
            var s = l(a, i);
            if (s) return s;
        }
    }
}

function l(e, a) {
    var r = e.split(".");
    if (r && !(r.length <= 0)) {
        if (3 == r.length) return r[2];
        r[0] = r[0].substring(1, r[0].length);
        for (var t = a, l = void 0, i = void 0, s = 0, n = r.length; s < n && t; s++) {
            var f, v = r[s], u = v.match(o);
            if (null != u) f = u[1]; else {
                var g = v.match(c);
                f = null != g ? "?" == g[1] && this.index ? this.index : g[1] : v;
            }
            if (0 == s) {
                for (var d = !1, b = 0, h = r.length; b < h; b++) if (f == t.name) {
                    if (d = !0, t, i = t.type, l = t.nodeText) switch (i) {
                      case "jsonArray":
                      case "sku":
                        t = l.data;
                        break;

                      case "image":
                        t = "http:" + l;
                        break;

                      case "radio":
                      case "text":
                        t = l;
                        break;

                      case "simpleTab":
                        t = l.data;
                        break;

                      case "video":
                      case "hotArea":
                        t = l;
                    } else t = void 0;
                    break;
                }
                if (!d) {
                    t = null;
                    break;
                }
            } else if ("_size_" == f) {
                if (s != r.length - 1 || "[object Array]" != Object.prototype.toString.call(t)) {
                    t = null;
                    break;
                }
                t = t.length;
            } else t = t[f];
            if (!t) break;
        }
        if (l && t) switch (i) {
          case "text":
            1 == n && (t = l.text);
            break;

          case "image":
            1 == n && (t = "http:" + l.imageUrl);
            break;

          case "radio":
            1 == n ? t = l.data.value : 2 == n && t && t == l.data && (t = l.data.value);
            break;

          case "video":
            t = l;
            break;

          case "hotArea":
            1 == n && (t = l.data);
        }
        return t;
    }
}

function i(e, a) {
    if (!e) return null;
    for (var r = 0, t = e.length; r < t; r++) {
        var l = e[r];
        if (l) {
            var i = s(a, l);
            if (i) return i;
        }
    }
}

function s(e, a) {
    var r = e.split(".");
    if (r && !(r.length <= 0)) {
        r[0] = r[0].substring(1, r[0].length);
        for (var t = a, l = void 0, i = void 0, s = 0, n = r.length; s < n && t; s++) {
            var f, v = r[s], u = v.match(o);
            if (null != u) f = u[1]; else {
                var g = v.match(c);
                f = null != g ? "?" == g[1] && this.index ? this.index : g[1] : v;
            }
            if (0 == s) {
                for (var d = !1, b = 0, h = r.length; b < h; b++) if (f == t.name) {
                    if (d = !0, t, i = t.type, l = t.nodeText) switch (i) {
                      case "jsonArray":
                        t = l.data;
                        break;

                      case "sku":
                        t = l.key;
                        break;

                      case "image":
                      case "radio":
                      case "text":
                        t = l;
                        break;

                      case "simpleTab":
                        t = l.data;
                        break;

                      case "video":
                      case "hotArea":
                        t = l;
                    } else t = void 0;
                    break;
                }
                if (!d) {
                    t = null;
                    break;
                }
            } else if ("_size_" == f) {
                if (s != r.length - 1 || "[object Array]" != Object.prototype.toString.call(t)) {
                    t = null;
                    break;
                }
                t = t.length;
            } else t = t[f];
            if (!t) break;
        }
        if (l && t) switch (i) {
          case "text":
            1 == n && (t = l.text);
            break;

          case "image":
            1 == n && (t = l.imageUrl);
            break;

          case "radio":
            1 == n ? t = l.data.value : 2 == n && t && t == l.data && (t = l.data.value);
            break;

          case "video":
            t = l;
            break;

          case "hotArea":
            1 == n && (t = l.data);
        }
        return t;
    }
}

function n(e) {
    var a, r = e.gravity || f;
    switch (Number(r)) {
      case f:
      case g:
      case h:
        a = "left";
        break;

      case v:
      case d:
      case k:
        a = "center";
        break;

      case u:
      case b:
      case y:
        a = "right";
        break;

      default:
        a = "left";
    }
    return a;
}

var o = /^\{(\w+)\}$/, c = /^\[([\d|\?]+)\]$/, f = 1, v = 2, u = 3, g = 4, d = 5, b = 6, h = 7, k = 8, y = 9;

module.exports = {
    execStr: function(a, r) {
        var t;
        if (void 0 == a || null == a) t = r; else if (void 0 == r || null == r) t = void 0; else if ("string" == typeof r) if ("$" == r[0]) {
            var l = e(a, r);
            l && (t = l);
        } else t = r; else t = r;
        return t;
    },
    filterForEach: function(e, a) {
        for (var t = a, l = 0; l < t.length; l++) {
            var i = t[l];
            if ("image" == i.containerType) d = r(e, g = i.urlRefer), i.urlRefer = d; else if ("text" == i.containerType) h = r(e, b = i.valueRefer), 
            i.valueRefer = h; else if ("container" == i.containerType) {
                for (var s = i.children, o = 0; o < s.length; o++) {
                    var c = s[o];
                    if ("image" == c.containerType) d = r(e, g = c.urlRefer), c.urlRefer = d; else if ("text" == c.containerType) h = r(e, b = c.valueRefer), 
                    c.valueRefer = h; else if ("container" == c.containerType) {
                        for (var f = c.children, v = 0; v < f.length; v++) {
                            var u = f[v];
                            if ("image" == u.containerType) {
                                var g = u.urlRefer, d = r(e, g);
                                u.urlRefer = d;
                            } else if ("text" == u.containerType) {
                                var b = u.valueRefer, h = r(e, b);
                                u.valueRefer = h;
                            }
                            if (u.style.gravity && (x = n(p = u.style), p.textAlign = x, u.style = p), u.style.backgroundColor && (p = u.style, 
                            9 == (A = u.style.backgroundColor).length)) {
                                var k = parseInt(A.slice(1, 3), 16), y = "rgba(" + (I = parseInt(A.slice(3, 5), 16)) + "," + (R = parseInt(A.slice(5, 7), 16)) + "," + (C = parseInt(A.slice(7, 9), 16)) + "," + (j = k / 255) + ")";
                                p.backgroundColor = y, console.log("textBGCO"), console.log(y), u.style = p;
                            }
                            f[v] = u;
                        }
                        c.children = f;
                    }
                    if (c.style.gravity && (x = n(p = c.style), p.textAlign = x, c.style = p), c.style.backgroundColor) {
                        var p = c.style;
                        if (9 == (A = c.style.backgroundColor).length) {
                            var k = parseInt(A.slice(1, 3), 16), y = "rgba(" + (I = parseInt(A.slice(3, 5), 16)) + "," + (R = parseInt(A.slice(5, 7), 16)) + "," + (C = parseInt(A.slice(7, 9), 16)) + "," + (j = k / 255) + ")";
                            p.backgroundColor = y, c.style = p;
                        }
                    }
                    s[o] = c;
                }
                i.children = s;
            }
            if (i.style.gravity) {
                var x = n(m = i.style);
                m.textAlign = x, i.style = m;
            }
            if (i.style.backgroundColor) {
                var m = i.style, A = i.style.backgroundColor, T = A.length;
                if (console.log("bgColor len"), console.log(T), 9 == A.length) {
                    var k = parseInt(A.slice(1, 3), 16), I = parseInt(A.slice(3, 5), 16), R = parseInt(A.slice(5, 7), 16), C = parseInt(A.slice(7, 9), 16), j = k / 255, y = "rgba(" + I + "," + R + "," + C + "," + j + ")";
                    m.backgroundColor = y, i.style = m;
                }
            }
            t[l] = i;
        }
        return t;
    },
    execStrForSkuKey: function(e, a) {
        var r;
        if (void 0 == e || null == e) r = a; else if (void 0 == a || null == a) r = void 0; else if ("string" == typeof a) if ("$" == a[0]) {
            var t = i(e, a);
            t && (r = t);
        } else r = a; else r = a;
        return r;
    }
};