/**
 * Created by dongqiangqiang on 2017/9/18.
 */

// var CK = {
//     set: function(key, val, day, domain, path) {
//         var exp = new Date();
//         exp.setDate(exp.getDate() + day);
//         document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(val)
//             + ";expires=" + exp.toGMTString()
//             + ";domain=" + (domain ? domain : window.location.hostname)
//             + ";path=" + (path ? domain : window.location.pathname);
//     },
//     get: function(key) {
//         var name = encodeURIComponent(key) + "=",
//             start = document.cookie.indexOf(name);
//         if (start > -1) {
//             var end = document.cookie.indexOf(";", start);
//             if (end === -1) {
//                 end = document.cookie.length;
//             }
//             return decodeURIComponent(document.cookie.substring(start + name.length, end));
//         } else {
//             return null;
//         }
//     },
//     unset: function(key, domain, path) {
//         this.set(key, "", -1, domain, path);
//     },
//     clear: function(domain, path) {
//         var pattern = /;{0,1}\w+\=/g;
//         var arr = document.cookie.match(pattern);//获取所有键名(带等于号)
//         for(var i = 0; i < arr.length; i++) {
//             this.unset(decodeURIComponent(arr[i].slice(0, arr[i].length - 1)), domain, path);
//         }
//     }
// }


const CookieUtil = {
    get(name) {
        let cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1) {
            let cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    set(name, value, expires, path, domain, secure) {
        let cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
        if (typeof expires === "string") {
            let time = this.getsec(expires);
            let exp = new Date();
            exp.setTime(exp.getTime() + time * 1);
            cookieText += "; expires=" + exp.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },
    //这是有设定过期时间的使用示例：
    //20s是代表20秒
    //h是指小时，如12小时则是：12h
    //d是天数，30天则：30d
    getsec: function (str) {
        let str1 = str.substring(0, str.length - 1) * 1;
        let str2 = str.substring(str.length - 1, str.length);
        if (str2 === "s") {
            return str1 * 1000;
        }
        else if (str2 === "h") {
            return str1 * 60 * 60 * 1000;
        }
        else if (str2 === "d") {
            return str1 * 24 * 60 * 60 * 1000;
        }
    },
    unset(name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure);
    }
};

export default CookieUtil;

