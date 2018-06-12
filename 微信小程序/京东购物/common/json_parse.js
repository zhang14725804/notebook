function r(r) {
    throw {
        name: "SyntaxError",
        message: r + " at position " + p,
        at: p,
        text: v
    };
}

function e(e) {
    return e && e !== d && r("Expected '" + e + "' instead of '" + d + "'"), d = v.charAt(p), 
    p += 1, d;
}

function t() {
    var t, n = "";
    for ("-" === d && (n = "-", e("-")); d >= "0" && d <= "9"; ) n += d, e();
    if ("." === d) for (n += "."; e() && d >= "0" && d <= "9"; ) n += d;
    if ("e" === d || "E" === d) for (n += d, e(), "-" !== d && "+" !== d || (n += d, 
    e()); d >= "0" && d <= "9"; ) n += d, e();
    if (t = +n, isFinite(t)) return t;
    r("作为数字解析时出错", t);
}

function n() {
    for (var r = ""; d && (d <= " " || ":" != d); ) r += d, e();
    return r;
}

function f() {
    var t, n, f, i = "";
    if ("'" === d) for (;e(); ) {
        if ("'" === d) return e(), i;
        if ("\\" === d) if (e(), "u" === d) {
            for (f = 0, n = 0; n < 4 && (t = parseInt(e(), 16), isFinite(t)); n += 1) f = 16 * f + t;
            i += String.fromCharCode(f);
        } else if ("x" === d) {
            var a = parseInt(e() + e(), 16);
            i += String.fromCharCode(a);
        } else {
            if ("string" != typeof h[d]) break;
            i += h[d];
        } else i += d;
    }
    r("Bad exstring");
}

function i() {
    var t, n, f, i = "";
    if ('"' === d) for (;e(); ) {
        if ('"' === d) return e(), i;
        if ("\\" === d) if (e(), "u" === d) {
            for (f = 0, n = 0; n < 4 && (t = parseInt(e(), 16), isFinite(t)); n += 1) f = 16 * f + t;
            i += String.fromCharCode(f);
        } else if ("x" === d) {
            var a = parseInt(e() + e(), 16);
            i += String.fromCharCode(a);
        } else {
            if ("string" != typeof h[d]) break;
            i += h[d];
        } else i += d;
    }
    r("Bad string");
}

function a() {
    for (;d && d <= " "; ) e();
}

function o() {
    switch (d) {
      case "t":
        return e("t"), e("r"), e("u"), e("e"), !0;

      case "f":
        return e("f"), e("a"), e("l"), e("s"), e("e"), !1;

      case "n":
        return e("n"), e("u"), e("l"), e("l"), null;
    }
    r("Unexpected '" + d + "'");
}

function u() {
    var t = [];
    if ("[" === d) {
        if (e("["), a(), "]" === d) return e("]"), t;
        for (;d; ) {
            if (t.push(c()), a(), "]" === d) return e("]"), t;
            e(","), a();
        }
    }
    r("Bad array");
}

function s() {
    var t, f = {};
    if ("{" === d) {
        if (e("{"), a(), "}" === d) return e("}"), f;
        for (;d; ) {
            if (t = '"' !== d ? n() : i(), a(), e(":"), Object.hasOwnProperty.call(f, t) && console.warn("Duplicate key '" + t + "'"), 
            f[t] = c(), a(), "}" === d) return e("}"), f;
            if (e(","), a(), "}" === d) return e("}"), f;
        }
    }
    r("Bad object");
}

function c() {
    switch (a(), d) {
      case "{":
        return s();

      case "[":
        return u();

      case '"':
        return i();

      case "'":
        return f();

      case "-":
        return t();

      default:
        return d >= "0" && d <= "9" ? t() : o();
    }
}

function l() {
    var r;
    if (a(), "{" === d || "[" === d) return r = c();
    for (;d && "(" !== d; ) e();
    if (e(), r = c(), a(), d && ")" === d) for (;d; ) e();
    return r;
}

var p, d, v, h = {
    '"': '"',
    "\\": "\\",
    "/": "/",
    b: "\b",
    f: "\f",
    n: "\n",
    r: "\r",
    t: "\t"
};

exports.JP = function(e) {
    var t;
    return v = e.trim(), p = 0, d = " ", t = l(), a(), d && r("Syntax error"), t;
};