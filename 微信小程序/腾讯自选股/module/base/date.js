(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d);
    "use strict", module.exports = {
        str2Date: function(a, b) {
            b = b || "%Y-%M-%d %h:%m:%s", b = b.replace(/\-/g, "\\-"), b = b.replace(/\|/g, "\\|"), 
            b = b.replace(/\./g, "\\."), b = b.replace(/\+/g, "\\+"), b = b.replace("%Y", "(\\d{4})"), 
            b = b.replace("%M", "(\\d{1,2})"), b = b.replace("%d", "(\\d{1,2})"), b = b.replace("%h", "(\\d{1,2})"), 
            b = b.replace("%m", "(\\d{1,2})"), b = b.replace("%s", "(\\d{1,2})");
            var c = new RegExp("^" + b + "$"), e = c.exec(a), f = (e[1] || 0) - 0, g = (e[2] || 1) - 1, i = (e[3] || 0) - 0, d = (e[4] || 0) - 0, h = (e[5] || 0) - 0, j = (e[6] || 0) - 0;
            return new Date(f, g, i, d, h, j);
        },
        date2Str: function(a, b, c) {
            var e = a.getFullYear(), f = a.getMonth() + 1, g = a.getDate(), d = a.getHours(), h = a.getMinutes(), i = a.getSeconds();
            return c && (f = 10 > f ? "0" + f : f, g = 10 > g ? "0" + g : g, d = 10 > d ? "0" + d : d, 
            h = 10 > h ? "0" + h : h, i = 10 > i ? "0" + i : i), b = b || "%Y-%M-%d %h:%m:%s", 
            b = b.replace(/%Y/g, e).replace(/%M/g, f).replace(/%d/g, g).replace(/%h/g, d).replace(/%m/g, h).replace(/%s/g, i), 
            b = b.replace(/YYYY/g, e).replace(/MM/g, f).replace(/dd/g, g).replace(/hh/g, d).replace(/mm/g, h).replace(/ss/g, i), 
            b;
        },
        dateDiff: function(a, b, c) {
            var d = 0;
            switch (c) {
              case "Y":
                d = a.getFullYear() - b.getFullYear();
                break;

              case "M":
                d = 12 * (a.getFullYear() - b.getFullYear()) + (a.getMonth() - b.getMonth());
                break;

              case "d":
                d = (a - b) / 864e5;
                break;

              case "h":
                d = (a - b) / 36e5;
                break;

              case "m":
                d = (a - b) / 6e4;
                break;

              case "s":
                d = (a - b) / 1e3;
                break;

              default:
                d = a - b;
            }
            return d;
        },
        dateAdd: function(a, b, c) {
            switch (a) {
              case "y":
                b.setFullYear(b.getFullYear() + c);
                break;

              case "q":
                b.setMonth(b.getMonth() + 3 * c);
                break;

              case "n":
                b.setMonth(b.getMonth() + c);
                break;

              case "d":
                b.setDate(b.getDate() + c);
                break;

              case "w":
                b.setDate(b.getDate() + 7 * c);
                break;

              case "h":
                b.setHours(b.getHours() + c);
                break;

              case "m":
                b.setMinutes(b.getMinutes() + c);
                break;

              case "s":
                b.setSeconds(b.getSeconds() + c);
                break;

              case "i":
                b.setMilliseconds(b.getMilliseconds() + c);
                break;

              default:
                b.setMilliseconds(b.getMilliseconds() + c);
            }
            return b;
        },
        leapYear: function(a) {
            var b = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ], c = !1, d = 365;
            return 0 == a.getFullYear() % 4 && 0 != a.getFullYear() % 100 || 0 == a.getFullYear() % 400 ? (b.splice(1, 1, 29), 
            c = !0, d = 366) : (b.splice(1, 1, 28), c = !1, d = 365), {
                isLeapYear: c,
                days: b,
                yearDays: d,
                monthDays: b[a.getMonth()]
            };
        }
    };
})();